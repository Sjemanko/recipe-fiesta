import { configureEnv } from "./config/prisma";
configureEnv();
import express, { Request, Response, NextFunction, Application as ExpressApplication } from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth";
import ApiError from "./helper/error";
import { API_PATHS } from "./common/apiPaths";

const app: ExpressApplication = express();
const PORT: number = parseInt(process.env.PORT!, 10) || 3000;

app.use(bodyParser.json());
app.use(API_PATHS.ACCOUNT.ACCOUNT, authRouter);

app.use(
  (error: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message;
    const data = error.data;
    return res.status(status).json({ message, data });
  }
);

app.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT ${PORT}`);
});
