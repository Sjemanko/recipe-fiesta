import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

// import { validationResult } from "express-validator";
import { hash } from "bcrypt";
// import ProjectError from "../helper/error";

const prisma = new PrismaClient();

const CreateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const error = new ProjectError("Validation failed.", 422, errors.array());
//     throw error;
//   }
  const email: string = req.body.email;
  const username: string = req.body.username;
  const password: string = req.body.password;

  const hashedPassword = await hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
  });
  res.status(201).json({ message: "User Created", user: user });
};

export default CreateAccount;
