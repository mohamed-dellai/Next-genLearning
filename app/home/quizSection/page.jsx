"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {QuizQuestion} from "./quizQuestions"
export default function QuizComponent(chapterId=1) {
    const [quizes,setQuizes]=useState([])
    const quizData = [
        {
          question: "What causes the reality glitches in Zara's city?",
          options: [
            "Malfunctioning quantum computers",
            "A virus in the city's mainframe",
            "Alien interference",
            "Natural time distortions"
          ],
          correctAnswer: 0
        },
        {
          question: "What skill does Zara use to tackle the problem?",
          options: [
            "Advanced robotics",
            "Time travel",
            "Knowledge of advanced physics",
            "Telepathy"
          ],
          correctAnswer: 2
        },
        {
          question: "What does Zara discover while investigating the problem?",
          options: [
            "A secret government conspiracy",
            "An intricate web of time loops and parallel universes",
            "An ancient alien artifact",
            "A glitch in her own memory"
          ],
          correctAnswer: 1
        }
      ];
     
  const [answers, setAnswers] = useState(new Array(quizData.length).fill(null));
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  const getQuizes= async ()=>{
    try{
        const quizes=await axios.get(`http://localhost:3000/api/home/getQuizes/5`)
        setQuizes(quizes.data)
    }
    catch(e){
        console.log(e)
    }
    return;
  }
  useEffect(()=>getQuizes,[])
  const handleAnswer = (quizIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[quizIndex] = answerIndex;
    setAnswers(newAnswers);

    if (answerIndex === quizData[quizIndex].correctAnswer) {
      const quizElement = document.getElementById(`quiz-${quizIndex}`);
      if (quizElement) {
        const rect = quizElement.getBoundingClientRect();
        setAnimationPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 2000);
    }
  };

  const allAnswered = answers.every(answer => answer !== null);
  const correctAnswers = answers.filter((answer, index) => answer === quizData[index].correctAnswer).length;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-2xl border border-indigo-200">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6">Chapter Quiz</h2>
      {quizData.map((quiz, index) => (
        <div id={`quiz-${index}`} key={index}>
          <QuizQuestion
            data={quiz}
            onAnswer={(answerIndex) => handleAnswer(index, answerIndex)}
            isAnswered={answers[index] !== null}
            isCorrect={answers[index] === quiz.correctAnswer}
          />
        </div>
      ))}
      {allAnswered && (
        <div className="mt-6 p-4 bg-indigo-100 rounded-lg text-center">
          <p className="text-xl font-bold text-indigo-800">
            You got {correctAnswers} out of {quizData.length} correct!
          </p>

        </div>
      )}
      {showAnimation && (
        <div 
          className="fixed pointer-events-none z-50"
          style={{ 
            left: `${animationPosition.x}px`, 
            top: `${animationPosition.y}px`, 
            transform: 'translate(-50%, -50%)' 
          }}
        >
          <div className="flex items-center justify-center">
            <div className="text-4xl animate-ping">✨</div>
            <div className="text-4xl animate-bounce ml-2">🎉</div>
            <div className="text-4xl animate-ping ml-2">✨</div>
          </div>
        </div>
      )}
    </div>
  );
}