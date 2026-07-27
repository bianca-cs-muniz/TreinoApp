import { Router } from "express";
import Controller from "./auth.controller";
import Validator from "./auth.validator";
import { createAuthRateLimit } from "@middlewares/rateLimitMiddleware";

const router = Router();

router.route("/login").post(createAuthRateLimit(), Validator.login, Controller.login);

export default router;
