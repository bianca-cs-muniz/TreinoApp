import { Router } from "express";
import Controller from "./sessions.controller";
import Validator from "./sessions.validator";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/workouts/:workoutId/sessions", authMiddleware, Controller.start);
router.get("/sessions", authMiddleware, Controller.listFinished);
router.get("/sessions/active", authMiddleware, Controller.findActive);
router.patch(
  "/sessions/:sessionId/set-logs/:setLogId",
  authMiddleware,
  Validator.updateSetLog,
  Controller.updateSetLog
);
router.patch("/sessions/:sessionId/finish", authMiddleware, Validator.finish, Controller.finish);

export default router;
