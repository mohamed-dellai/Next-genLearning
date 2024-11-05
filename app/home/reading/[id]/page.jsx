"use client";

import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ChapterDisplay} from './chapterDisplay'
import {QuizComponent} from './quizSection/Quiz'

export default function ReadingFlow() {
    const router = useRouter();
    const { id } = useParams(); 
    const [currentChapter, setCurrentChapter] = useState(null);
    const[currentQuiz, setCurrentQuiz]= useState(null)
    const [showQuiz,setShow]=useState(false)

    function goToquiz(bool){
        setShow(bool)
    }

    const getAllChapters = async () => {
        try {
            const result = await axios.get(`/api/home/getAllChaptersId/${id}`);
            console.log(result.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (id) {
            getAllChapters();
        }
    }, [id]);
   
    return (
        <>

        </>
    );
}
