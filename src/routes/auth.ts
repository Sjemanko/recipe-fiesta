import express from "express";
import { postLogin, postSignup } from "../controllers/auth";
import {
  validate,
  authValidationRules,
} from "../helper/validation/authValidation";

const router = express();

router.post("/create", authValidationRules(), validate, postSignup);
router.post("/login", postLogin);

export default router;
