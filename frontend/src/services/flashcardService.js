import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const getAllFlashcardsSets = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.FLASHCARD.GET_ALL_FLASHCARDS_SETS,
    );

    console.log("API response:", response);

    return response.data.data; // return only flashcard array
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch all flashcards" };
  }
};

const getFlashcardForDocument = async (documentId) => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.FLASHCARD.GET_FLASHCARDS_FOR_DOC(documentId),
    );
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to generate flashcards" };
  }
};

const reviewFlashcard = async (cardId, cardIndex) => {
  try {
    const response = await axiosInstance.post(
      API_PATHS.FLASHCARD.REVIEW_FLASHCARD(cardId),
      { cardIndex },
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to generate flashcards" };
  }
};

const toggleStar = async (cardId) => {
  try {
    const response = await axiosInstance.put(
      API_PATHS.FLASHCARD.TOGGLE_STAR(cardId),
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to generate flashcards" };
  }
};

const deleteFlashcardSet = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_PATHS.FLASHCARD.DELETE_FLASHCARD_SET(id),
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to generate flashcards" };
  }
};

const flashcardService = {
  getAllFlashcardsSets,
  getFlashcardForDocument,
  reviewFlashcard,
  toggleStar,
  deleteFlashcardSet,
};

export default flashcardService;
