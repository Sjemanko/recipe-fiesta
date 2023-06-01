import express, { Request, Response, NextFunction, Application } from "express";
import * as dotenv from "dotenv";
import bodyParser, { BodyParser } from "body-parser";
import authRouter from "./routes/auth";
import ProjectError from "./helper/error";

dotenv.config();


const app: Application = express();
const PORT: number = parseInt(process.env.PORT!, 10) || 3000;

app.use(bodyParser.json());

app.use("/account", authRouter);

// error middleware

app.use((error: ProjectError, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data});
})

app.listen(PORT, (): void => {
  console.log(`SERVER IS LISTENING ON PORT ${PORT}`);
});
