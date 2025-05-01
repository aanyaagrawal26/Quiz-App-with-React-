import { useState } from "react";
import { quizQuestions } from "./quizData";
import "./App.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleAnswerSubmit = () => {
    const correct = quizQuestions[currentQuestion].correctAnswer;
    if (selectedAnswer === correct) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct answer: ${correct}`);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
        setFeedback("");
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowScore(false);
    setFeedback("");
  };

  return (
    <div className="quiz-container">
      <div className="quiz-title">💡 Java Quiz App</div>
      {showScore ? (
        <div className="result">
          <h2>🎉 Quiz Completed!</h2>
          <p>Your Score: {score} / {quizQuestions.length}</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <h2>{quizQuestions[currentQuestion].question}</h2>
          {quizQuestions[currentQuestion].options.map(option => (
            <button
              key={option}
              className={`option-btn ${selectedAnswer === option ? "selected" : ""}`}
              onClick={() => setSelectedAnswer(option)}
            >
              {option}
            </button>
          ))}
          <button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>Submit</button>
          {feedback && <p className="feedback">{feedback}</p>}
          <p className="question-count">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
