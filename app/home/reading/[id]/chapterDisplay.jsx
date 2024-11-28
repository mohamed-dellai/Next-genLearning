"use client"
import React, { useEffect, useState } from 'react';
import { Nav } from '@/components/nav';
import axios from 'axios';
export function ChapterDisplay(props) {

  const [chapterData,setChapter]=useState([]
  )

  var getChapterContent=async()=>{
    try{
      let result = await axios.get(`/api/home/getChapter?num=${props.chapter}&course=${props.course}`);
      setChapter(result.data)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getChapterContent()
  })
  const handleQuizNavigation = () => {
    props.quiz(true)
  };

  return (
    <>
    <Nav></Nav>
    <div className="max-w-5xl  mx-auto p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-2xl border border-indigo-200" style={{marginTop: "50px"}}>
      <h2 className="text-5xl font-extrabold text-center mb-8 text-indigo-800 font-sans tracking-tight">
        {chapterData.title}
      </h2>
      <div className="flex flex-col lg:flex-row items-start gap-12 mb-10">
        <div className="flex-1 order-2 lg:order-1">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-lg text-gray-800 leading-relaxed font-sans first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-indigo-600">
              {chapterData.content}
            </p>
          </div>
        </div>
        <div className="flex-1 order-1 lg:order-2">
          <img
            src={chapterData.image}
            alt={`Illustration for ${chapterData.title}`}
            className="w-full h-auto rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 object-cover aspect-video"
          />
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={handleQuizNavigation}
          className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full text-lg shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105"
        >
          Test Your Knowledge
        </button>
      </div>
    </div>
    </>
  );
}