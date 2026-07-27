import { Router } from "express";
import UsuariosRoutes from "../modules/usuarios/usuarios.routes";
import AuthRoutes from "../modules/auth/auth.routes";
import WorkoutsRoutes from "../modules/workouts/workouts.routes";
import ExercisesRoutes from "../modules/exercises/exercises.routes";
import SessionsRoutes from "../modules/sessions/sessions.routes";

const router = Router();

router.use(AuthRoutes);
router.use("/workouts", WorkoutsRoutes);
router.use(SessionsRoutes);
router.use("/exercises", ExercisesRoutes);
router.use("/usuarios", UsuariosRoutes);

export default router;
