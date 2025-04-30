import { pgTable, text, serial, integer, boolean, timestamp, pgEnum, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Type Enum
export const userTypeEnum = pgEnum('user_type', [
  'insured',
  'insured_espanol',
  'agent',
  'general_agent',
  'sales_rep'
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  accountCode: text("account_code").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  userType: userTypeEnum("user_type").notNull(),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  accountCode: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  userType: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Login schema
export const loginSchema = z.object({
  accountCode: z.string().min(1, "Account code is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginData = z.infer<typeof loginSchema>;

// Contact form schema
export const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string(),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Site statistics tables
export const siteVisits = pgTable("site_visits", {
  id: serial("id").primaryKey(),
  date: date("date").notNull().defaultNow(),
  count: integer("count").notNull().default(0),
  uniqueVisitors: integer("unique_visitors").notNull().default(0),
});

export const activeUsers = pgTable("active_users", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  count: integer("count").notNull().default(0),
});

export const totalStatistics = pgTable("total_statistics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  value: integer("value").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Types for statistics
export type SiteVisit = typeof siteVisits.$inferSelect;
export type ActiveUser = typeof activeUsers.$inferSelect;
export type TotalStatistic = typeof totalStatistics.$inferSelect;

// Insert schemas
export const insertSiteVisitSchema = createInsertSchema(siteVisits);
export const insertActiveUserSchema = createInsertSchema(activeUsers);
export const insertTotalStatisticSchema = createInsertSchema(totalStatistics);

export type InsertSiteVisit = z.infer<typeof insertSiteVisitSchema>;
export type InsertActiveUser = z.infer<typeof insertActiveUserSchema>;
export type InsertTotalStatistic = z.infer<typeof insertTotalStatisticSchema>;

// Statistics response schema
export const statisticsSchema = z.object({
  totalVisits: z.number(),
  activeUsers: z.number(),
  registeredUsers: z.number(),
});

export type StatisticsData = z.infer<typeof statisticsSchema>;
