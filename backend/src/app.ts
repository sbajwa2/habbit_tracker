import express from "express";
import cors from "cors";
import habitRoutes from "./routes/habitRoutes";
import reminderRoutes from "./routes/reminderRoutes";

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGINS ??
  "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());
app.use("/api/habits", habitRoutes);
app.use("/api/reminders", reminderRoutes);

app.get("/", (_req, res) => {
  res.send("Backend is running successfully!");
});

export default app;