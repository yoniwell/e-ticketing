import { config } from 'dotenv';
import { z } from 'zod';

// Load environment variables
config();

// Define the expected environment variables
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z.coerce.number().default(3000),

  DATABASE_URL: z.string().min(1),

  JWT_SECRET: z.string().min(10),
});

// Validate the environment variables
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables');
  console.error(parsed.error.format());
  process.exit(1);
}

// Export validated values
export const env = parsed.data;
