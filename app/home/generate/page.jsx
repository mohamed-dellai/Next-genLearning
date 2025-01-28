"use client"

import { useState } from "react"
import { Nav } from "../../../components/nav"
import axios from "axios"
import { useRouter } from 'next/navigation';

import "./page.css"

export default function Generate() {
  const [settings, setSettings] = useState({
    title: "",
    description: "",
    sectionCount: 5,
  })
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)

    try {
      const response = await axios.post("../api/home/generate", settings)
      console.log("Course generated successfully:", response.data)
      setIsSuccess(true)

      router.push(`/home/reading/${response.data.result}`);
    } catch (error) {
      console.error("Error generating course:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-white shadow-md rounded-lg overflow-hidden fade-in">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Course Customization</h2>
            <p className="mt-1 text-sm text-gray-600">Set up your course parameters</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="transition-all duration-300 ease-in-out transform hover:scale-105">
                <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">
                  Course Title
                </label>
                <input
                  id="courseTitle"
                  type="text"
                  value={settings.title}
                  onChange={(e) => updateSetting("title", e.target.value)}
                  placeholder="Enter course title"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
                />
              </div>
              <div className="transition-all duration-300 ease-in-out transform hover:scale-105">
                <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">
                  Course Description
                </label>
                <textarea
                  id="courseDescription"
                  value={settings.description}
                  onChange={(e) => updateSetting("description", e.target.value)}
                  placeholder="Enter course description"
                  required
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
                />
              </div>
              <div className="transition-all duration-300 ease-in-out transform hover:scale-105">
                <label htmlFor="sectionCount" className="block text-sm font-medium text-gray-700">
                  Number of Sections
                </label>
                <input
                  id="sectionCount"
                  type="number"
                  value={settings.sectionCount}
                  onChange={(e) => updateSetting("sectionCount", Number.parseInt(e.target.value) || 5)}
                  min={3}
                  max={10}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner mr-2"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  "Generate Course"
                )}
              </button>
            </form>
            {isSuccess && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md fade-in">
                Course generated successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}