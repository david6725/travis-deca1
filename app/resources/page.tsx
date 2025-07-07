"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  Video,
  BookOpen,
  Users,
  TrendingUp,
  DollarSign,
  Building,
  Plane,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function ResourcesPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
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

  const rubrics = [
    { name: "Roleplay Evaluation Rubric", type: "PDF" },
    { name: "Written Event Rubric", type: "PDF" },
    { name: "Presentation Grading Rubric", type: "PDF" },
    { name: "Team Decision Making Rubric", type: "PDF" },
    { name: "Case Study Analysis Rubric", type: "PDF" },
  ]

  const performanceIndicators = [
    { cluster: "Marketing", icon: TrendingUp, color: "text-pink-400" },
    { cluster: "Finance", icon: DollarSign, color: "text-green-400" },
    { cluster: "Business Management", icon: Building, color: "text-blue-400" },
    { cluster: "Hospitality & Tourism", icon: Plane, color: "text-purple-400" },
  ]

  const howToGuides = [
    { title: "Roleplay Tips", description: "Master your roleplay performance", type: "PDF" },
    { title: "Winning Written Event Format", description: "Structure your written projects", type: "PDF" },
    { title: "Top Presentation Strategies", description: "Deliver compelling presentations", type: "PDF" },
    { title: "Networking at Conferences", description: "Build professional connections", type: "PDF" },
    { title: "Time Management for DECA", description: "Balance competition prep", type: "PDF" },
    { title: "Research Techniques", description: "Find reliable business data", type: "PDF" },
  ]

  const videos = [
    {
      title: "DECA Roleplay Best Practices",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "8:45",
      description: "Learn from state champions",
    },
    {
      title: "Written Event Success Stories",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "12:30",
      description: "Top-scoring project breakdowns",
    },
    {
      title: "Presentation Skills Masterclass",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "15:20",
      description: "Professional presentation techniques",
    },
  ]

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
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                isDarkMode ? "text-gray-300 hover:text-white" : "text-slate-600 hover:text-slate-800"
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
            href="/resources"
            className={`transition-colors font-medium ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
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
            Resources
          </h1>
          <p className={`text-xl ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
            Everything you need to excel in DECA competitions
          </p>
        </div>

        <div className="space-y-16">
          {/* 1. Official DECA Rubrics */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <FileText className={`w-8 h-8 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
              <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                📂 Official DECA Rubrics
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rubrics.map((rubric, index) => (
                <Card
                  key={index}
                  className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                          {rubric.name}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{rubric.type}</p>
                      </div>
                      <Button
                        size="sm"
                        className={`${
                          isDarkMode
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-blue-700 hover:bg-blue-800 text-white"
                        }`}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 2. Performance Indicators Library */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className={`w-8 h-8 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
              <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                🧠 Performance Indicators by Cluster
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceIndicators.map((cluster, index) => (
                <Card
                  key={index}
                  className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  <CardContent className="p-6 text-center">
                    <cluster.icon className={`w-12 h-12 mx-auto mb-4 ${cluster.color}`} />
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      {cluster.cluster}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>View indicators</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 3. How-To Guides */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Users className={`w-8 h-8 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
              <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                📘 How to Succeed at DECA
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {howToGuides.map((guide, index) => (
                <Card
                  key={index}
                  className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <FileText className={`w-6 h-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                      <span
                        className={`text-xs px-2 py-1 rounded ${isDarkMode ? "bg-slate-700 text-gray-300" : "bg-slate-200 text-slate-600"}`}
                      >
                        {guide.type}
                      </span>
                    </div>
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      {guide.title}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{guide.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 4. Officer-Recommended Videos */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Video className={`w-8 h-8 ${isDarkMode ? "text-red-400" : "text-red-600"}`} />
              <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>🎥 Watch & Learn</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card
                  key={index}
                  className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        width={320}
                        height={180}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                          <Video className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                        {video.title}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                        {video.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 5. External Resources */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <ExternalLink className={`w-8 h-8 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`} />
              <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>📎 Helpful Links</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* DECA.org */}
              <Card
                className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer`}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Image src="/deca-logo-new.png" alt="DECA Logo" width={32} height={32} className="w-8 h-8" />
                  </div>
                  <h3 className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}>DECA.org</h3>
                </CardContent>
              </Card>

              {/* Travis DECA Instagram */}
              <Card
                className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer`}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center">
                    <Image src="/instagram-logo-new.png" alt="Instagram" width={48} height={48} className="w-12 h-12" />
                  </div>
                  <h3 className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}>Instagram</h3>
                </CardContent>
              </Card>

              {/* Remind */}
              <Card
                className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer`}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center">
                    <Image src="/remind-logo-new.png" alt="Remind" width={48} height={48} className="w-12 h-12" />
                  </div>
                  <h3 className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}>Remind</h3>
                </CardContent>
              </Card>

              {/* Schoology */}
              <Card
                className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer`}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center">
                    <Image src="/schoology-logo-new.png" alt="Schoology" width={48} height={48} className="w-12 h-12" />
                  </div>
                  <h3 className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}>Schoology</h3>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
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
