"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { QuizQuestion } from "./quizQuestions"
import { Nav } from "@/components/nav"

export function QuizComponent(props) {
  const [quizData, setQuizes] = useState([])
  const [answers, setAnswers] = useState([])
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 })

  const getQuizes = async () => {
    try {
      const quizes = await axios.get(`http://localhost:3000/api/home/getQuizes/${props.chapter}`)
      setQuizes(quizes.data)
      var answerArray = []
      for (let i = 0; i < quizes.data.length; i++) {
        answerArray.push(quizes.data[i].answer)
      }
      setAnswers(answerArray)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getQuizes()
  }, [props.chapter]) // Added props.chapter to the dependency array

  const sendResponse = async (quizId, answer) => {
    const pyload = {
      id: quizId,
      answer: answer,
    }
    try {
      const res = await axios.post(`http://localhost:3000/api/home/saveQuizes/`, pyload)
    } catch (e) {
      console.log(e)
    }
  }

  const handleAnswer = (quizIndex, answerIndex) => {
    const newAnswers = [...answers]
    newAnswers[quizIndex] = answerIndex
    setAnswers(newAnswers)
    console.log(newAnswers[quizIndex])
    sendResponse(quizData[quizIndex].id, answerIndex)

    if (answerIndex === quizData[quizIndex].correctanswer) {
      const quizElement = document.getElementById(`quiz-${quizIndex}`)
      if (quizElement) {
        const rect = quizElement.getBoundingClientRect()
        setAnimationPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }
      setShowAnimation(true)
      setTimeout(() => setShowAnimation(false), 2000)
    }
  }

  const allAnswered = answers.length > 0 && answers.every((answer) => answer !== null)
  const correctAnswers = answers.filter((answer, index) => answer === quizData[index]?.correctanswer).length

  const handleNextChapter = () => {
    if (props.nextChapter) {
      props.nextChapter(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
          <div className="p-8">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-800 font-sans tracking-tight">
              Chapter Quiz
            </h2>
            <div className="space-y-8">
              {quizData.map((quiz, index) => (
                <div id={`quiz-${index}`} key={index} className="bg-indigo-50 p-6 rounded-2xl shadow-inner">
                  <QuizQuestion
                    data={quiz}
                    onAnswer={(answerIndex) => handleAnswer(index, answerIndex)}
                    isAnswered={answers[index] !== null}
                    isCorrect={answers[index] === quiz.correctanswer}
                  />
                </div>
              ))}
            </div>
            {allAnswered && (
              <div className="mt-8 p-6 bg-indigo-100 rounded-2xl text-center">
                <p className="text-2xl font-bold text-indigo-800 mb-4">
                  You got {correctAnswers} out of {quizData.length} correct!
                </p>
                <button
                  onClick={handleNextChapter}
                  className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full text-lg shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105"
                >
                  Next Chapter
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      {showAnimation && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${animationPosition.x}px`,
            top: `${animationPosition.y}px`,
            transform: "translate(-50%, -50%)",
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
  )
}

