import { PrismaClient } from "../generated/prisma/client.js";
import { env } from "../config/env.js"; 

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}