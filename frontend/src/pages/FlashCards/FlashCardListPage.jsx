import React, { useState, useEffect } from "react";
import flashcardService from "../../services/flashcardService";
import PageHeader from "../../components/common/PageHeader";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import FlashcardSetCard from "../../components/flashcards/FlashcardSetCard";
import toast from "react-hot-toast";

const FlashCardListPage = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      try {
        const response = await flashcardService.getAllFlashcardsSets();
        console.log("fetchFlashcardSets___", response);
        setFlashcardSets(response || []);
      } catch (error) {
        toast.error("Failed to fetch flashcard sets.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcardSets();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Spinner />;
    }

    if (flashcardSets.length === 0) {
      return (
        <EmptyState
          title={"No Flashcard Sets Found"}
          description={
            "You haven't generated any falshcards yet. Go to a document to create your first card set."
          }
        />
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {flashcardSets.map((flashcardSet) => (
          <FlashcardSetCard
            key={flashcardSet._id}
            flashcardSet={flashcardSet}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <PageHeader title={"All Flashcard Sets"} />
      {renderContent()}
    </div>
  );
};

export default FlashCardListPage;
