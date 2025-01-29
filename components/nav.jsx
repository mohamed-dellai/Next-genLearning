"use client"

import { Avatar } from "@material-tailwind/react"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import usePointsStore from "../app/globalState/global"

export function Nav() {
  const points = usePointsStore((state) => state.points)
  const addPoints = usePointsStore((state) => state.addPoints)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const getPoints = async () => {
      try {
        const p = await axios.get("http://localhost:3000/api/home/getPoints")
        addPoints(p.data.points)
      } catch (err) {
        console.log(err)
      }
    }
    getPoints()
  }, [addPoints])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Learnorama</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/home" icon={<HomeIcon />}>
              Home
            </NavLink>
            <NavLink href="/home/generate" icon={<PlusIcon />}>
              Make new course
            </NavLink>
            <NavLink href="/home/giftsection" icon={<GiftIcon />}>
              Gifts
            </NavLink>
            <NavLink href="/home/parent" icon={<UserIcon />}>
              Parents section
            </NavLink>
            <button className="ring-offset-background focus-visible:ring-ring hover:bg-primary/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Points: {points}
            </button>
            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="/home" icon={<HomeIcon />}>
              Home
            </NavLink>
            <NavLink href="/home/generate" icon={<PlusIcon />}>
              Make new course
            </NavLink>
            <NavLink href="/home/giftsection" icon={<GiftIcon />}>
              Gifts
            </NavLink>
            <NavLink href="#" icon={<UserIcon />}>
              Parents section
            </NavLink>
            <div className="flex items-center justify-between">
              <button className="ring-offset-background focus-visible:ring-ring hover:bg-primary/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Points: {points}
              </button>
              <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function NavLink({ href, children, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md"
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 1024 1024"
      fill="currentColor"
      className="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M216.8 952c-37.6 0-68-30.4-68-68V553.6h48.8v329.6c0 10.4 8.8 19.2 19.2 19.2h568c10.4 0 19.2-8.8 19.2-19.2V564.8h48.8v319.2c0 37.6-30.4 68-68 68h-568z" />
      <path d="M151.2 556v327.2c0 36 29.6 65.6 65.6 65.6h568c36 0 65.6-28.8 65.6-65.6V567.2h-44v316.8c0 12-9.6 21.6-21.6 21.6h-568c-12 0-21.6-9.6-21.6-21.6v-328h-44z" />
      <path d="M498.4 302.4h48.8v627.2h-48.8z" />
      <path d="M544 927.2V304.8h-44v622.4H544z" />
      <path d="M172.8 569.6c-61.6 0-111.2-50.4-111.2-111.2V280.8h766.4c61.6 0 111.2 50.4 111.2 111.2v176.8H172.8z m-62.4-112c0 35.2 28 63.2 63.2 63.2h718.4v-128c0-35.2-28-63.2-63.2-63.2H110.4v128z" />
      <path d="M85.6 327.2h742.4c36 0 65.6 29.6 65.6 65.6v152.8l21.6-21.6H172.8c-36 0-65.6-29.6-65.6-65.6V304.8l-21.6 22.4z m0-44H64v174.4c0 60 48.8 108.8 108.8 108.8h764V392.8c0-60-48.8-108.8-108.8-108.8H85.6v-0.8z" />
      <path d="M432.8 329.6V215.2h179.2v113.6H432.8z m131.2-48.8V264H480.8v16.8h83.2z" />
      <path d="M456.8 261.6h131.2L566.4 240v65.6l21.6-21.6H456.8l21.6 21.6V240l-21.6 21.6z m0-44h-21.6v109.6H609.6V218.4H456.8v-0.8z" />
      <path d="M260.8 320.8c-2.4-3.2-6.4-8-12-15.2-9.6-12.8-18.4-25.6-25.6-37.6-9.6-14.4-16.8-28.8-23.2-41.6-20.8-44-22.4-76-4.8-99.2 40-53.6 112.8-96.8 161.6-96.8 24 0 50.4 20 92.8 71.2 8 9.6 16 20 24.8 31.2 13.6 19.2 29.6 40.8 45.6 64 5.6 8 10.4 15.2 14.4 21.6 2.4 4 6.4 10.4 6.4 10.4l-40.8 26.4s-4-6.4-6.4-9.6c-3.2-6.4-8-13.6-13.6-21.6-16-22.4-31.2-44-45.6-62.4-8-10.4-16-20.8-23.2-29.6-29.6-36-51.2-53.6-55.2-53.6-32.8 0-92.8 37.6-122.4 77.6-4 5.6-2.4 22.4 10.4 49.6 5.6 11.2 12 23.2 20 36 7.2 11.2 15.2 23.2 24 34.4 4.8 6.4 8.8 11.2 10.4 13.6l1.6 1.6-37.6 30.4-1.6-0.8z" />
      <path d="M505.6 228l36.8 24c0.8-1.6 2.4-4 4.8-8 4-6.4 8.8-13.6 14.4-20.8 14.4-21.6 30.4-43.2 45.6-63.2 8-10.4 16-20.8 24-29.6 28-33.6 52-54.4 57.6-54.4 34.4 0 93.6 37.6 124.8 78.4 4.8 6.4 2.4 25.6-10.4 52-5.6 11.2-12 24-20 36.8-7.2 12-16 24-24 34.4-4.8 6.4-8.8 11.2-10.4 13.6l33.6 28c2.4-3.2 6.4-8 12-15.2 8.8-12 17.6-24.8 25.6-37.6 8.8-14.4 16.8-28 23.2-41.6 18.4-40 23.2-72.8 5.6-96.8-40-50.4-112-96-161.6-96-24.8 0-52.8 24.8-91.2 70.4-8 9.6-16 20-24.8 31.2-16 20.8-31.2 42.4-46.4 64.8-5.6 8-10.4 15.2-14.4 21.6-2.4 3.2-4 6.4-4.8 8z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

