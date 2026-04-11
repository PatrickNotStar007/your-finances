import { PrismaClient } from "@prisma/client/extension";
import { PrismaPg } from "@prisma/adapter-pg";
import { ENV } from "../config/env";

const adapter = new PrismaPg({
  connectionString: ENV.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });
