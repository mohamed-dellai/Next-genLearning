"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {QuizQuestion} from "./quizQuestions"
import "./quizSection.css"
import { Nav } from '@/components/nav';

export function QuizComponent(props) {
    const [quizData, setQuizes] = useState([])
    const [answers, setAnswers] = useState([]);
    const [showAnimation, setShowAnimation] = useState(false);
    const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
    const getQuizes = async () => {
        try {
            const quizes = await axios.get(`http://localhost:3000/api/home/getQuizes/${props.chapter}`)
            setQuizes(quizes.data)
            var answerArray=[]
            for(let i=0; i<quizes.data.length; i++){
                answerArray.push(quizes.data[i].answer)
            }
            setAnswers(answerArray);
        }
        catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getQuizes();
    }, [])
    const sendResponse= async (quizId, answer)=>{
        const pyload={
            id: quizId,
            answer: answer
        }
        try{
            const res=await axios.post(`http://localhost:3000/api/home/saveQuizes/`, pyload)
        }
        catch(e){
            console.log(e)
        }
    }
    const handleAnswer = (quizIndex, answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[quizIndex] = answerIndex;
        setAnswers(newAnswers);
        console.log(newAnswers[quizIndex])
        sendResponse(quizData[quizIndex].id,answerIndex)
        
        if (answerIndex === quizData[quizIndex].correctanswer) {
            const quizElement = document.getElementById(`quiz-${quizIndex}`);
            if (quizElement) {
                const rect = quizElement.getBoundingClientRect();
                setAnimationPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            }
            setShowAnimation(true);
            setTimeout(() => setShowAnimation(false), 2000);
        }
    };

    const allAnswered = answers.length > 0 && answers.every(answer => answer !== null);
    const correctAnswers = answers.filter((answer, index) => answer === quizData[index]?.correctanswer).length;

    const handleNextChapter = () => {
        if (props.nextChapter) {
            props.nextChapter(false);
        }
    };

    return (
        <>
            <Nav></Nav>
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-2xl border border-indigo-200 container" id="scrollbar2">
                <h2 className="text-3xl font-bold text-indigo-800 mb-6">Chapter Quiz</h2>
                {quizData.map((quiz, index) => (
                    <div id={`quiz-${index}`} key={index}>
                        <QuizQuestion
                            data={quiz}
                            onAnswer={(answerIndex) => handleAnswer(index, answerIndex)}
                            isAnswered={answers[index] !== null}
                            isCorrect={answers[index] === quiz.correctanswer}
                        />
                    </div>
                ))}
                {allAnswered && (
                    <div className="mt-6 p-4 bg-indigo-100 rounded-lg text-center">
                        <p className="text-xl font-bold text-indigo-800 mb-4">
                            You got {correctAnswers} out of {quizData.length} correct!
                        </p>
                        <button
                            onClick={handleNextChapter}
                            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-full text-lg shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105"
                        >
                            Next Chapter
                        </button>
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
        </>
    );
}