import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

// CORS_ORIGIN aceita uma lista separada por vírgula (ex: dev local + site em produção).
const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Não permitido pelo CORS"));
    },
  })
);
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

export default app;
