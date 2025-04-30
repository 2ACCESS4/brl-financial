import { 
  users, type User, type InsertUser,
  siteVisits, type SiteVisit,
  activeUsers, type ActiveUser,
  totalStatistics, type TotalStatistic,
  type StatisticsData
} from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { eq, sql, desc, and, count } from "drizzle-orm";
import { pool } from "./db";
import { db } from "./db";
import { Store } from "express-session";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByAccountCode(accountCode: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateLastLogin(id: number): Promise<void>;
  
  // Statistics methods
  recordVisit(ipAddress: string): Promise<void>;
  recordActiveUser(): Promise<void>;
  getTotalVisits(): Promise<number>;
  getActiveUsers(): Promise<number>;
  getTotalRegisteredUsers(): Promise<number>;
  getStatistics(): Promise<StatisticsData>;
  
  // Session store
  sessionStore: Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: Store;
  private ipCache: Set<string> = new Set(); // Cache IP addresses for the day
  private activeUserInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
    
    // Initialize stat tracking
    this.initializeStatisticsTracking();
  }

  private async initializeStatisticsTracking() {
    try {
      // Check if we need to initialize the total_statistics table
      const stats = await db.select().from(totalStatistics);
      
      // If empty, initialize with default values
      if (stats.length === 0) {
        await db.insert(totalStatistics).values([
          { name: 'total_visits', value: 0 },
          { name: 'registered_users', value: 0 }
        ]);
      }
      
      // Clear active users on startup and start tracking
      await db.delete(activeUsers);
      await this.recordActiveUser();
      
      // Start an interval to update active users
      this.activeUserInterval = setInterval(async () => {
        // Remove users active more than 15 minutes ago
        const fifteenMinutesAgo = new Date();
        fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15);
        
        await db.delete(activeUsers).where(
          sql`${activeUsers.timestamp} < ${fifteenMinutesAgo}`
        );
      }, 5 * 60 * 1000); // Check every 5 minutes
      
      // Clear IP cache at midnight each day
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const msUntilMidnight = midnight.getTime() - Date.now();
      
      setTimeout(() => {
        this.ipCache.clear();
        // Set a new timeout for the next day
        setInterval(() => {
          this.ipCache.clear();
        }, 24 * 60 * 60 * 1000);
      }, msUntilMidnight);
      
    } catch (error) {
      console.error('Failed to initialize statistics tracking:', error);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByAccountCode(accountCode: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.accountCode, accountCode));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    
    // Increment registered users count
    await this.incrementTotalStatistic('registered_users');
    
    return user;
  }

  async updateLastLogin(id: number): Promise<void> {
    await db
      .update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, id));
  }
  
  // Statistics methods
  async recordVisit(ipAddress: string): Promise<void> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString().split('T')[0]; // format as YYYY-MM-DD
      
      // Check if we've already seen this IP today
      const isNewVisitor = !this.ipCache.has(ipAddress);
      
      // Record the visit
      const [existingVisit] = await db
        .select()
        .from(siteVisits)
        .where(sql`${siteVisits.date}::text = ${todayStr}`);
      
      if (existingVisit) {
        // Update existing record
        await db
          .update(siteVisits)
          .set({ 
            count: existingVisit.count + 1,
            uniqueVisitors: isNewVisitor 
              ? existingVisit.uniqueVisitors + 1 
              : existingVisit.uniqueVisitors
          })
          .where(eq(siteVisits.id, existingVisit.id));
      } else {
        // Create new record for today
        await db
          .insert(siteVisits)
          .values({
            date: todayStr as any, // Cast to prevent type issues
            count: 1,
            uniqueVisitors: isNewVisitor ? 1 : 0
          });
      }
      
      // Add IP to cache if it's a new visitor
      if (isNewVisitor) {
        this.ipCache.add(ipAddress);
        // Increment total visits
        await this.incrementTotalStatistic('total_visits');
      }
    } catch (error) {
      console.error('Error recording visit:', error);
    }
  }
  
  async recordActiveUser(): Promise<void> {
    try {
      // Record a new active user
      await db.insert(activeUsers).values({
        timestamp: new Date(),
        count: 1
      });
    } catch (error) {
      console.error('Error recording active user:', error);
    }
  }
  
  private async incrementTotalStatistic(name: string, increment: number = 1): Promise<void> {
    try {
      await db
        .update(totalStatistics)
        .set({ 
          value: sql`${totalStatistics.value} + ${increment}`,
          updatedAt: new Date()
        })
        .where(eq(totalStatistics.name, name));
    } catch (error) {
      console.error(`Error incrementing statistic ${name}:`, error);
    }
  }
  
  async getTotalVisits(): Promise<number> {
    try {
      const [stat] = await db
        .select()
        .from(totalStatistics)
        .where(eq(totalStatistics.name, 'total_visits'));
      
      return stat?.value || 0;
    } catch (error) {
      console.error('Error getting total visits:', error);
      return 0;
    }
  }
  
  async getActiveUsers(): Promise<number> {
    try {
      const result = await db
        .select({ count: count() })
        .from(activeUsers);
      
      return result[0]?.count || 0;
    } catch (error) {
      console.error('Error getting active users:', error);
      return 0;
    }
  }
  
  async getTotalRegisteredUsers(): Promise<number> {
    try {
      const [stat] = await db
        .select()
        .from(totalStatistics)
        .where(eq(totalStatistics.name, 'registered_users'));
      
      return stat?.value || 0;
    } catch (error) {
      console.error('Error getting registered users:', error);
      return 0;
    }
  }
  
  async getStatistics(): Promise<StatisticsData> {
    const [totalVisits, activeUsers, registeredUsers] = await Promise.all([
      this.getTotalVisits(),
      this.getActiveUsers(),
      this.getTotalRegisteredUsers()
    ]);
    
    return {
      totalVisits,
      activeUsers,
      registeredUsers
    };
  }
}

export const storage = new DatabaseStorage();
