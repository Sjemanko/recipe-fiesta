import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const testFunc = async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany();
  return res.status(200).json({ message: "teste", body: allUsers});
};

export default testFunc;
