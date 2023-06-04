import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcrypt";
import ProjectError from "../helper/error";
import { LoginUserData, SignupUserData } from "../common/types";
import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password }: SignupUserData = req.body;
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

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: LoginUserData = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new ProjectError(`Invalid Email!`, 401);
    }
    const validationResult = await compare(password, user.password);
    if (validationResult) {
      const accessToken: string = sign(
        { id: user.id, username: user.username },
        process.env.SECRET!
      );
      return res.status(200).json({ accessToken: accessToken });
    } else {
      throw new ProjectError(`Invalid Password!`, 401);
    }
  } catch (err) {
    return next(err);
  }
};
