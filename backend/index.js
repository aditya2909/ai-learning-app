import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "../middleware/errorHandler.js";
import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import documentRoutes from "../routes/documentRoutes.js";
import flashcardRoutes from "../routes/flashcardRoutes.js";
import aiRoutes from "../routes/aiRoutes.js";
import quizRoutes from "../routes/quizRoutes.js";
import progressRoutes from "../routes/progressRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

let isConnected = false;

async function initDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("MongoDB connected");
  }
}

await initDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/aiRoutes", aiRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/progress", progressRoutes);

app.get("/", (req, res) => res.send("Server is running"));
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    statusCode: 404,
  });
});

const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => res.send("Server is running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (error) => {
  console.error("Error: ", error.message);
  process.exit(1);
});
