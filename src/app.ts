import express, { Application } from "express";

import * as dotenv from "dotenv";

import authRouter from "./routes/auth";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT!, 10) || 3000;

app.use(authRouter);

app.listen(PORT, (): void => {
  console.log(`SERVER IS LISTENING ON PORT ${PORT}`);
});
