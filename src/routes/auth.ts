import express from "express";
import { createAccount } from "../controllers/auth";
import {
  validate,
  signupValidationRules,
} from "../helper/validation/authValidation";

const router = express();

router.post("/create", signupValidationRules(), validate, createAccount);

export default router;
