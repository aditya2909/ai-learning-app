import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import NotFoundPage from "./pages/NotFound";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DocuemntsPage from "./pages/Documents/DocumentListPage";
import DocumentDetailsPage from "./pages/Documents/DocumentDetailsPage";
import FlashCardPage from "./pages/FlashCards/FlashCardPage";
import FlashCardListPage from "./pages/FlashCards/FlashCardListPage";
import QuizTakePage from "./pages/Quizzes/QuizTakePage";
import QuizResultPage from "./pages/Quizzes/QuizResultPage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/documents" element={<DocuemntsPage />} />
          <Route path="/documents/:id" element={<DocumentDetailsPage />} />
          <Route path="/flashcards" element={<FlashCardListPage />} />
          <Route
            path="/document/:id/flashcards"
            element={<FlashCardListPage />}
          />
          <Route path="/quizzes/:quizid" element={<QuizTakePage />} />
          <Route path="/quizzes/:quizid/results" element={<QuizResultPage />} />
          <Route path="/documents/:documentid/flashcards" element={<FlashCardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
