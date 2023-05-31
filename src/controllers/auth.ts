import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";
import ProjectError from "../helper/error";

const prisma = new PrismaClient();

const CreateAccount = async (
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
    res.status(201).json({ message: "User Created", user: user });
  } catch (err) {
    if(err instanceof Prisma.PrismaClientKnownRequestError) {
      if(err.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    res.status(400).json({message: "nie wejdziesz makaroniarzu bez kraka"})
  }
};

export default CreateAccount;
