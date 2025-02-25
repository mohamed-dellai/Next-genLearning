"use client";

import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChapterDisplay } from './chapterDisplay';
import { QuizComponent } from './quizSection/Quiz';

export default function ReadingFlow() {
    const { id } = useParams(); 
    const [currentChapter, setCurrentChapter] = useState(0);
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [showQuiz, setShow] = useState(false);
    const [chapterId, setChapterId] = useState([]);
    const [quizId, setQuizId] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(true);

    function goToQuiz(bool) {
        setShow(bool);
    }

    function nextChapter() {
        if (currentChapter + 1 < chapterId.length) {
            setCurrentChapter(prev => prev + 1);
            setCurrentQuiz(prev => prev + 1);
            setShow(false);
        } else {
            setIsCompleted(true);
        }
    }

    const getAllChapters = async () => {
        try {
            const result = await axios.get(`/api/home/getAllChaptersId/${id}`);
            const chapterIds = [...new Set(result.data.map(item => item.chapter_id))];
            const quizIds = result.data.map(item => item.quiz_id);
            setQuizId(quizIds);
            setChapterId(chapterIds);
            console.log(result.data)
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getAllChapters();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
                <p className="mt-4 text-2xl font-semibold text-indigo-800">Loading...</p>
            </div>
        );
    }

    if (isCompleted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
                <h1 className="text-5xl font-bold text-indigo-800 mb-6">Congratulations!</h1>
                <p className="text-2xl text-gray-700 mb-10">You've completed all chapters and quizzes.</p>
                <div className="text-8xl mb-10">🎉</div>
                <button 
                    onClick={() => window.location.href = '/'} 
                    className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full text-xl shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-10">
            {!showQuiz ? 
                <ChapterDisplay quiz={goToQuiz} chapter={chapterId[currentChapter]} course={id} /> : 
                <QuizComponent chapter={chapterId[currentChapter]} nextChapter={nextChapter} />
            }
        </div>
    );
}