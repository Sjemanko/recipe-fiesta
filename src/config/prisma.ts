import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

export const configureEnv = () => dotenv.config();
export const prisma = new PrismaClient();
