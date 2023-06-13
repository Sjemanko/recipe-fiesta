import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import ApiError from "../helper/error";
import jwt from "jsonwebtoken";
import { HTTP_CODES } from "../common/httpCodes";
import { prisma } from "../config/prisma";

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password }: SignupUserData = req.body;
  const hashedPassword = await bcrypt.hash(password, process.env.SALT!);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    return res.status(HTTP_CODES.SUCCESS.CREATED).json({
      message: "User Created!",
      id: user.id,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        const error = new ApiError(
          `User with this ${err.meta?.target} already exists!`,
          HTTP_CODES.FAILED.BAD_REQUEST
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
        email,
      },
    });
    if (!user) {
      throw new ApiError(`Invalid Email!`, HTTP_CODES.FAILED.UNAUTHROZIED);
    }
    const validationResult = await bcrypt.compare(password, user.password);
    if (validationResult) {
      const accessToken: string = jwt.sign(
        { id: user.id, username: user.username },
        process.env.SECRET!
      );
      return res.status(200).json({ accessToken: accessToken });
    } else {
      throw new ApiError(`Invalid Password!`, HTTP_CODES.FAILED.UNAUTHROZIED);
    }
  } catch (err) {
    return next(err);
  }
};
