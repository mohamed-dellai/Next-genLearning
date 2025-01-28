"use client"
import React, { useEffect, useState } from "react"
import { Nav } from "@/components/nav"
import axios from "axios"

export function ChapterDisplay(props) {
  const [chapterData, setChapter] = useState([])

  var getChapterContent = async () => {
    try {
      const result = await axios.get(`/api/home/getChapter?num=${props.chapter}&course=${props.course}`)
      setChapter(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getChapterContent()
  }, [props.chapter, props.course])

  const handleQuizNavigation = () => {
    props.quiz(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
          <div className="p-8">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-indigo-800 font-sans tracking-tight">
              {chapterData.title}
            </h2>
            <div className="flex flex-col lg:flex-row items-start gap-8 mb-12">
              <div className="flex-1 order-2 lg:order-1">
                <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner">
                  <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-sans">
                    {chapterData.content}
                  </p>
                </div>
              </div>
              <div className="flex-1 order-1 lg:order-2">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
                  <img
                    src={chapterData.image || "/placeholder.svg"}
                    alt={`Illustration for ${chapterData.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handleQuizNavigation}
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full text-lg sm:text-xl shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105"
              >
                Test Your Knowledge
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

