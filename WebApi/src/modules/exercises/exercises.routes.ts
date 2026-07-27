import { Router } from "express";
import Controller from "./exercises.controller";
import Validator from "./exercises.validator";

const router = Router();

router.get("/search", Validator.search, Controller.search);
router.get("/:id", Controller.getById);

export default router;
