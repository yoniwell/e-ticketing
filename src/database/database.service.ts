import { prisma } from "./prisma.js";
import { logger } from "../config/logger.js";

export class DatabaseService {
  static async connect() {
    try {
      await prisma.$connect();

      logger.info("Database connected successfully.");
    } catch (error) {
      logger.fatal(error, "Failed to connect to database.");

      process.exit(1);
    }
  }

  static async disconnect() {
    await prisma.$disconnect();

    logger.info("Database disconnected.");
  }
}