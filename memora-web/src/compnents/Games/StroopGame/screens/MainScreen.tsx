/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/GameScreen.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../../../redux/store";
import { QuestionCard } from "../components/QuestionCard";
import PauseScreen from "./PauseScreen";
import { GameHUD } from "../components/GameHUD";

import {
  restartGame,
  recordAnswer,
  advanceLevel,
  forceEndGame,
  endGame,
  resumeGame,
} from "../../../../redux/slices/games-slice/stroop";

import { IStroopQuestion } from "../../../../types/game/stroopTypes";

export const MainScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    config,
    gameState,
    metrics,
    totalScore,
    isPaused,
    totalPausedDuration,
    gameEnded,
  } = useSelector((state: RootState) => state.stroop);

  const questions = React.useMemo(() => config?.questions || [], [config?.questions]);
  const currentIndex = gameState?.currentIndex ?? 0;
  const currentQuestion = questions[currentIndex];
  const level = gameState?.level ?? 1;

  const [levelStartTime, setLevelStartTime] = useState(Date.now());

  // Set initial or updated question
  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      setLevelStartTime(Date.now());
    }
  }, [questions, currentIndex]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!currentQuestion || isPaused || gameEnded) return;

      if (e.key === "ArrowLeft") {
        handleAnswer(true); // user chose 'Correct'
      } else if (e.key === "ArrowRight") {
        handleAnswer(false); // user chose 'Wrong'
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentQuestion, isPaused, gameEnded]);


  const handleResume = () => dispatch(resumeGame());
  const handleRestart = () => dispatch(restartGame());
  const handleQuitGame = () => {
    dispatch(forceEndGame());
    navigate("/dashboard/games");
  };

  const handleAnswer = (userSelectedAnswer: boolean) => {
    const actualCorrect = currentQuestion?.isCorrect ?? false;
    const isUserCorrect = userSelectedAnswer === actualCorrect;

    const timeTaken = Date.now() - levelStartTime;
    const bonus = level % 10 === 0 ? 10 : 0;

    dispatch(recordAnswer({ correct: isUserCorrect, bonus }));
    dispatch(advanceLevel());

    const delay = Math.max(300, 1000 - level * 30);
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setLevelStartTime(Date.now());
      } else {
        dispatch(endGame());
      }
    }, delay);
  };


  const accuracy = metrics?.accuracy ?? 0;
  const attempts = metrics?.attempts ?? 0;

  if (gameEnded) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">Game Over</h1>
        <p className="mt-4 text-lg">Final Score: {totalScore}</p>
        <p>Accuracy: {accuracy}%</p>
        <p>Total Questions Answered: {attempts}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-md text-center w-full h-full relative">
      {isPaused && (
        <PauseScreen
          onResume={handleResume}
          onRestart={handleRestart}
          onExit={handleQuitGame}
        />
      )}

      {config && (
        <GameHUD
          gameTitle={config.title ?? "stroop"}
          totalScore={totalScore}
          totalPausedDuration={totalPausedDuration ?? 0}
        />
      )}

      <div className="mt-8">
        {currentQuestion && (
          <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
        )}
      </div>
    </div>
  );
};
