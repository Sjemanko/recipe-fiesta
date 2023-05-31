import express from "express";
import createAccount from "../controllers/auth";

const router = express();

router.post("/", createAccount);


export default router;
