import { Router } from "express";
import testFunc from "../controllers/auth";

const router = Router();

router.get("/", testFunc);

export default router;
