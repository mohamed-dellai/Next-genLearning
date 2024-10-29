"use client"

import { useState } from "react"
import {Nav} from '../../../components/nav'
export default function Generate() {
  const [settings, setSettings] = useState({
    title: "",
    description: "",
    difficulty: "beginner",
    sectionCount: 5,
  })

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Course settings:", settings)
  }

  return (
    <>
    <Nav/>
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Course Customization</h2>
          <p className="mt-1 text-sm text-gray-600">Set up your course parameters</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">Course Title</label>
              <input
                id="courseTitle"
                type="text"
                value={settings.title}
                onChange={(e) => updateSetting("title", e.target.value)}
                placeholder="Enter course title"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">Course Description</label>
              <textarea
                id="courseDescription"
                value={settings.description}
                onChange={(e) => updateSetting("description", e.target.value)}
                placeholder="Enter course description"
                required
                rows={4}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
              <input
                id="difficulty"
                type="text"
                value={settings.difficulty}
                onChange={(e) => updateSetting("difficulty", e.target.value)}
                placeholder="Enter difficulty (beginner, intermediate, advanced)"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="sectionCount" className="block text-sm font-medium text-gray-700">Number of Sections</label>
              <input
                id="sectionCount"
                type="number"
                value={settings.sectionCount}
                onChange={(e) => updateSetting("sectionCount", parseInt(e.target.value) || 5)}
                min={3}
                max={10}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </form>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
          <button
            onClick={handleSubmit}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate Course
          </button>
        </div>
      </div>
    </div>
    </>
  )
}