"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function ChapterDisplay(numChapter=1,course=1) {

  const [chapterData,setChapter]=useState(
    {
      title: "The Quantum Paradox",
      content: "In the year 2150, 15-year-old Zara found herself at the center of a mind-bending mystery. The quantum computers that powered their city had started to malfunction, causing reality itself to glitch. As she delved deeper into the problem, Zara discovered an intricate web of time loops and parallel universes. With her knowledge of advanced physics and her quick thinking, she raced against time to prevent the collapse of multiple realities. Little did she know, the solution would challenge everything she thought she knew about the nature of existence itself.",
      image: "https://picsum.photos/seed/quantum/600/400"
    }
  )
  var getChapterContent=async()=>{
    try{
      let result = await axios.get(`/api/home/getChapter?num=${1}&course=${1}`);
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
    console.log("Navigating to quiz section");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-2xl border border-indigo-200">
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
  );
}