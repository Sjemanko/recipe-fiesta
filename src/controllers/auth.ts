import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";
import ProjectError from "../helper/error";

const prisma = new PrismaClient();

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;
  const username: string = req.body.username;
  const password: string = req.body.password;
  const hashedPassword = await hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });
    return res.status(201).json({
      message: "User Created!",
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        const error = new ProjectError(
          `User with this ${err.meta?.target} already exists!`,
          400
        );
        return next(error);
      }
    }
  }
};
