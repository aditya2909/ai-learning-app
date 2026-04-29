import express from "express";
import {
  getAllFlashCards,
  getFlashCards,
  toggleStarFlashcard,
  reviewFlashCard,
  deleteFlashCard,
} from "../controllers/flashcardController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllFlashCards);
router.get("/:documentId", getFlashCards);
router.put("/:cardId/star", toggleStarFlashcard);
router.post("/:cardId/review", reviewFlashCard);
router.delete("/:id", deleteFlashCard);

export default router;
