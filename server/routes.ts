import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";
import nodemailer from "nodemailer";
import { setupAuth } from "./auth";
import { db } from "./db";
import { eq } from "drizzle-orm";
import * as schema from "@shared/schema";
import { aiLoginHandler } from "./ai-login-assistant";
import { currencyHandler } from "./currency";
import crypto from "crypto";
import { promisify } from "util";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const contactData = contactSchema.parse(req.body);
      
      // In a production environment, you'd send an email here
      // For demo purposes, we'll simulate this
      console.log("Contact form submission:", contactData);
      
      // Send a success response
      res.status(200).json({ 
        success: true, 
        message: "Contact form submission received successfully" 
      });
      
    } catch (error) {
      console.error("Error processing contact form submission:", error);
      res.status(400).json({
        success: false,
        message: "Invalid form data"
      });
    }
  });

  // Site statistics middleware to track visits
  app.use(async (req, res, next) => {
    // Only count page views from browsers, not API calls or static assets
    const isPageView = req.method === 'GET' && 
                      !req.path.startsWith('/api/') && 
                      !req.path.includes('.') &&
                      req.headers['user-agent'] && 
                      !req.headers['user-agent'].includes('bot');
    
    if (isPageView) {
      // Get the IP address
      const ip = req.headers['x-forwarded-for'] || 
                 req.connection.remoteAddress || 
                 'unknown';
                 
      // Record the visit
      await storage.recordVisit(String(ip));
      
      // Record active user
      await storage.recordActiveUser();
    }
    
    next();
  });
  
  // Real statistics API endpoint
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStatistics();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching site statistics:", error);
      res.status(500).json({ 
        error: "Failed to retrieve statistics" 
      });
    }
  });

  // Integration point with existing system API
  // This would be updated to connect to the actual FMBRL.asp backend
  app.post("/api/external/legacy", async (req, res) => {
    try {
      // This would be replaced with actual external API call logic
      // to integrate with the existing FMBRL system
      res.json({ 
        success: true, 
        message: "Legacy system integration point" 
      });
    } catch (error) {
      console.error("Error connecting to legacy system:", error);
      res.status(500).json({
        success: false,
        message: "Error connecting to legacy system"
      });
    }
  });
  
  // AI-powered login assistant endpoint
  app.post("/api/ai-login", aiLoginHandler);
  
  // Currency exchange rate endpoint
  app.get("/api/currency", currencyHandler);
  
  // In-memory token storage (replace with Redis or database in production)
  // Format: { token: { credentials: { accountCode, password, portalType }, expiresAt: timestamp } }
  const tokenStore: Record<string, { 
    credentials: { accountCode: string, password: string, portalType: string },
    expiresAt: number 
  }> = {};
  
  // Encryption key and initialization vector for token encryption
  // In production, these would be stored securely and rotated regularly
  const encryptionKey = crypto.randomBytes(32); // 256-bit key
  const encryptionIv = crypto.randomBytes(16);  // 128-bit IV for AES
  
  // Helper function to encrypt data
  const encrypt = (data: string): string => {
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, encryptionIv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  };
  
  // Helper function to decrypt data
  const decrypt = (data: string): string => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, encryptionIv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  };
  
  // Token generation endpoint
  app.post("/api/portal-token", (req, res) => {
    try {
      const { accountCode, password, portalType } = req.body;
      
      if (!accountCode || !password || !portalType) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required credentials" 
        });
      }
      
      // Generate a random token
      const tokenValue = crypto.randomBytes(32).toString('hex');
      
      // Store credentials with expiration (5 minutes)
      const expiresAt = Date.now() + (5 * 60 * 1000);
      tokenStore[tokenValue] = {
        credentials: { accountCode, password, portalType },
        expiresAt
      };
      
      // Schedule token cleanup
      setTimeout(() => {
        delete tokenStore[tokenValue];
      }, 5 * 60 * 1000);
      
      // Return the token
      res.status(200).json({ 
        success: true,
        token: tokenValue,
        expiresAt
      });
      
    } catch (error) {
      console.error("Error generating portal token:", error);
      res.status(500).json({
        success: false,
        message: "Failed to generate token"
      });
    }
  });
  
  // Token validation endpoint
  app.get("/api/validate-token/:token", (req, res) => {
    try {
      const { token } = req.params;
      
      // Check if token exists and is not expired
      const tokenData = tokenStore[token];
      if (!tokenData || tokenData.expiresAt < Date.now()) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token"
        });
      }
      
      // Return the credentials
      res.status(200).json({
        success: true,
        credentials: tokenData.credentials
      });
      
      // Remove the token after use (one-time use)
      delete tokenStore[token];
      
    } catch (error) {
      console.error("Error validating token:", error);
      res.status(500).json({
        success: false,
        message: "Failed to validate token"
      });
    }
  });
  
  // Portal redirect endpoint
  app.get("/portal-redirect/:portalType", (req, res) => {
    try {
      const { portalType } = req.params;
      const { token } = req.query;
      
      // Define portal URLs
      const portalUrls: Record<string, string> = {
        'Insured': 'https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp',
        'Insured Español': 'https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp',
        'Agent': 'https://www.fmweb3.com/FMBRL/FMAgentLogin.asp',
        'General Agent': 'https://www.fmweb3.com/FMBRL/FMGALogin.asp',
        'Sales Rep': 'https://www.fmweb3.com/FMBRL/FMSalesRepLogin.asp'
      };
      
      const portalUrl = portalUrls[portalType] || portalUrls['Insured'];
      
      // Redirect to portal with token
      res.redirect(`${portalUrl}?token=${token}`);
      
    } catch (error) {
      console.error("Error redirecting to portal:", error);
      res.status(500).send("Error redirecting to portal. Please try again.");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
