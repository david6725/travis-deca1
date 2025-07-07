"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function RoleplayPracticePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedCluster, setSelectedCluster] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [userResponse, setUserResponse] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 500)
  }

  const clusters = [
    "Business Management & Administration",
    "Entrepreneurship",
    "Finance",
    "Hospitality & Tourism",
    "Marketing",
    "Personal Financial Literacy",
  ]

  const events = [
    "Marketing Communications Series",
    "Entrepreneurship Series",
    "Financial Consulting",
    "Hotel and Lodging Management Series",
    "Professional Selling",
  ]

  const difficulties = ["Easy", "Medium", "Hard"]

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-b from-blue-900 via-blue-800 to-blue-400"
          : "bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300"
      } relative overflow-hidden`}
    >
      {/* Enhanced Starfield Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Small glowing stars */}
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${isDarkMode ? "bg-white shadow-white/50" : "bg-white/80"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              boxShadow: isDarkMode ? `0 0 ${Math.random() * 4 + 2}px rgba(255, 255, 255, 0.8)` : "none",
              animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 5}s infinite alternate`,
              opacity: Math.random() * 0.8 + 0.4,
            }}
          />
        ))}
        {/* Medium glowing stars */}
        {[...Array(80)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className={`absolute rounded-full ${isDarkMode ? "bg-blue-100 shadow-blue-200/60" : "bg-blue-300"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              boxShadow: isDarkMode ? `0 0 ${Math.random() * 6 + 3}px rgba(147, 197, 253, 0.7)` : "none",
              animation: `pulse ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 4}s infinite alternate`,
              opacity: 0.7,
            }}
          />
        ))}
        {/* Large bright stars */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`large-${i}`}
            className={`absolute rounded-full ${isDarkMode ? "bg-blue-50 shadow-blue-100/80" : "bg-blue-400"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 3}px`,
              height: `${Math.random() * 2 + 3}px`,
              boxShadow: isDarkMode ? `0 0 ${Math.random() * 8 + 4}px rgba(248, 250, 252, 0.9)` : "none",
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 5}s infinite alternate`,
              opacity: 0.9,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav
        className={`flex items-center justify-between px-6 py-4 backdrop-blur-sm relative z-10 ${
          isDarkMode ? "bg-slate-900/50" : "bg-white/30"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-12 h-12">
            <Image
              src="/deca-logo.png"
              alt="DECA Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <span className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-slate-800"}`}>Travis DECA</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/dashboard"
            className={`transition-colors ${
              isDarkMode ? "text-gray-300 hover:text-white" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Dashboard
          </Link>
          <div
            className="relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
            ref={dropdownRef}
          >
            <button
              className={`flex items-center gap-1 transition-colors cursor-pointer font-medium ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setIsDropdownOpen(!isDropdownOpen)
                }
              }}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <span>Practice</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 mt-2 w-48 transition-all duration-300 z-[100] ${
                isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <div
                className={`rounded-lg shadow-lg border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"} py-2`}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href="/practice"
                  className={`block px-4 py-2 text-sm transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-slate-700"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsDropdownOpen(false)
                  }}
                >
                  Cluster Exams
                </Link>
                <Link
                  href="/practice/roleplay"
                  className={`block px-4 py-2 text-sm transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-slate-700"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsDropdownOpen(false)
                  }}
                >
                  Roleplay Practice
                </Link>
                <Link
                  href="/practice/written"
                  className={`block px-4 py-2 text-sm transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-slate-700"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsDropdownOpen(false)
                  }}
                >
                  Written Event Practice
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="/events"
            className={`transition-colors ${
              isDarkMode ? "text-gray-300 hover:text-white" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Upcoming Events
          </Link>
          <Link
            href="/about"
            className={`transition-colors ${
              isDarkMode ? "text-gray-300 hover:text-white" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            About
          </Link>
          <Link
            href="#"
            className={`transition-colors ${
              isDarkMode ? "text-gray-300 hover:text-white" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Resources
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="#"
            className={`transition-colors ${
              isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
            }`}
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
            Welcome to Travis DECA Roleplay Practice
          </h1>
          <p className={`text-xl ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
            Practice your roleplay skills with AI-powered scenarios
          </p>
        </div>

        <Card
          className={`max-w-2xl mx-auto ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm shadow-lg`}
        >
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Career Cluster Dropdown */}
              <div className="space-y-3">
                <label className={`block text-lg font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  Select a Career Cluster
                </label>
                <Select value={selectedCluster} onValueChange={setSelectedCluster}>
                  <SelectTrigger
                    className={`w-full h-12 ${
                      isDarkMode
                        ? "bg-slate-700/50 border-slate-600 text-white"
                        : "bg-white/70 border-slate-300 text-slate-800"
                    }`}
                  >
                    <SelectValue placeholder="Choose your career cluster" />
                  </SelectTrigger>
                  <SelectContent>
                    {clusters.map((cluster) => (
                      <SelectItem key={cluster} value={cluster}>
                        {cluster}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Event Dropdown */}
              <div className="space-y-3">
                <label className={`block text-lg font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  Select Your Event
                </label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger
                    className={`w-full h-12 ${
                      isDarkMode
                        ? "bg-slate-700/50 border-slate-600 text-white"
                        : "bg-white/70 border-slate-300 text-slate-800"
                    }`}
                  >
                    <SelectValue placeholder="Choose your DECA event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event} value={event}>
                        {event}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty Dropdown */}
              <div className="space-y-3">
                <label className={`block text-lg font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  Select Difficulty
                </label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger
                    className={`w-full h-12 ${
                      isDarkMode
                        ? "bg-slate-700/50 border-slate-600 text-white"
                        : "bg-white/70 border-slate-300 text-slate-800"
                    }`}
                  >
                    <SelectValue placeholder="Choose difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Practice Button */}
              <div className="pt-4">
                <Button
                  className={`w-full h-12 text-lg font-semibold rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-600/25"
                      : "bg-blue-700 hover:bg-blue-800 text-white shadow-lg hover:shadow-blue-700/25"
                  }`}
                >
                  Start Practice
                </Button>
              </div>

              {/* Prompt Placeholder */}
              <div className="space-y-3">
                <div
                  className={`p-6 rounded-lg border min-h-[120px] flex items-center justify-center ${
                    isDarkMode ? "bg-slate-700/50 border-slate-600" : "bg-slate-100/50 border-slate-300"
                  }`}
                >
                  <p className={`text-lg text-center ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                    Your roleplay prompt will appear here.
                  </p>
                </div>
              </div>

              {/* Response Input */}
              <div className="space-y-3">
                <label className={`block text-lg font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  Type your response here...
                </label>
                <Textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Enter your roleplay response..."
                  className={`min-h-[150px] ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                      : "bg-white/70 border-slate-300 text-slate-800"
                  }`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          className="w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isDarkMode ? "bg-yellow-400 text-slate-800" : "bg-slate-800 text-yellow-400"
            }`}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </div>
        </button>
      </div>
    </div>
  )
}
