import express from "express";
import {
  chat,
  explainConcept,
  generateFlashcard,
  generateQuiz,
  generateSummary,
  getChatHistory,
} from "../controllers/aiController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/chat", chat);
router.post("/explain-concept", explainConcept);
router.post("/generate-flashcards", generateFlashcard);
router.post("/generate-quiz", generateQuiz);
router.post("/generate-summary", generateSummary);
router.get("/chat-history/:documentId", getChatHistory);

export default router;
