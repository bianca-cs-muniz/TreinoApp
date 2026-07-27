import { Router } from "express";
import Controller from "./workouts.controller";
import Validator from "./workouts.validator";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router
  .route("/")
  .get(Validator.queryParams, Controller.findAll)
  .post(Validator.create, Controller.create);

router
  .route("/:id")
  .get(Validator.pathParams, Controller.readById)
  .put(Validator.pathParams, Validator.update, Controller.update)
  .delete(Validator.pathParams, Controller.delete);

export default router;
