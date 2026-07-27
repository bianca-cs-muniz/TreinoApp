import { Router } from "express";
import Controller from "./usuarios.controller";
import Validator from "./usuarios.validator";
import { authMiddleware } from "@middlewares/authMiddleware";
import { createAuthRateLimit } from "@middlewares/rateLimitMiddleware";

const router = Router();

// Cadastro público (self-service) — mesmo comportamento do antigo POST /auth/register.
router.route("/").post(createAuthRateLimit(), Validator.create, Controller.create);

// Sem GET (listar/ler por id): usuário só edita/apaga a própria conta.
router
  .route("/:id")
  .put(authMiddleware, Validator.pathParams, Validator.update, Controller.update)
  .delete(authMiddleware, Validator.pathParams, Controller.delete);

export default router;
