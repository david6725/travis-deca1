"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Mail, Instagram, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function AboutPage() {
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
    }, 200)
  }

  const officers = [
    { name: "Jordan Reyes", role: "President", description: "Leads meetings and manages chapter direction" },
    { name: "Ava Thompson", role: "Vice President", description: "Coordinates internal officer roles" },
    { name: "Liam Chen", role: "VP of Marketing", description: "Handles social media and event promotions" },
    { name: "Maya Johnson", role: "Junior VP", description: "Supports officers and learns operations" },
    {
      name: "Carlos Nguyen",
      role: "VP of Membership & Finance",
      description: "Tracks members and manages fundraising",
    },
    { name: "Ella Patel", role: "VP of Role-Play", description: "Helps students prep with mock events" },
    { name: "Ryan Gomez", role: "VP of Written Events", description: "Oversees written projects and editing" },
    { name: "Grace Lee", role: "VP of Virtual Events", description: "Coordinates online competitions" },
    { name: "Ethan Brooks", role: "VP of Chapter Campaigns", description: "Manages DECA campaign submissions" },
  ]

  const committeeMembers = ["Sarah D.", "Jason M.", "Rachel L.", "Isaiah C.", "Sofia T.", "Emily V.", "Marcus J."]

  const features = [
    { icon: "🎭", title: "AI Roleplay Practice", description: "Interactive roleplay scenarios with AI feedback" },
    { icon: "🧠", title: "Cluster Exam Generator", description: "Customizable practice tests for all clusters" },
    { icon: "📝", title: "Written Event Upload & Tracking", description: "Upload and track your written projects" },
    { icon: "📅", title: "Calendar & Reminders", description: "Stay organized with event scheduling" },
    {
      icon: "📚",
      title: "Rubrics & Performance Indicator Library",
      description: "Access comprehensive DECA resources",
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
            <div
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                isDarkMode ? "text-gray-300 hover:text-white" : "text-slate-600 hover:text-slate-800"
              }`}
            >
              <span>Practice</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            {/* Fixed Dropdown Menu */}
            <div
              className={`absolute top-full left-0 mt-2 w-48 transition-all duration-300 z-50 ${
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
                  onClick={() => setIsDropdownOpen(false)}
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
                  onClick={() => setIsDropdownOpen(false)}
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
                  onClick={() => setIsDropdownOpen(false)}
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
            className={`transition-colors font-medium ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6">
              <Image
                src="/deca-logo.png"
                alt="Travis DECA Logo"
                width={96}
                height={96}
                className="w-full h-full object-contain"
              />
            </div>
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${
                isDarkMode ? "from-blue-400 via-purple-400 to-blue-300" : "from-blue-600 via-purple-600 to-blue-500"
              } bg-clip-text text-transparent`}
            >
              About Travis DECA
            </h1>
            <p className={`text-xl md:text-2xl ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
              Empowering future leaders through innovation, preparation, and performance.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <Card
          className={`mb-16 ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm shadow-lg`}
        >
          <CardContent className="p-8 text-center">
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-slate-800"}`}>Our Mission</h2>
            <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
              Travis DECA prepares emerging leaders in marketing, finance, hospitality, and business management. Through
              competitive experiences, workshops, and chapter events, we build confidence and real-world readiness for
              our students to excel in their future careers.
            </p>
          </CardContent>
        </Card>

        {/* Sponsor Section */}
        <Card
          className={`mb-16 ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm shadow-lg`}
        >
          <CardContent className="p-8">
            <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              Our Sponsor: Mrs. O'Neil
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className={`text-6xl font-bold ${isDarkMode ? "text-white" : "text-white"}`}>MO</span>
              </div>
              <div className="flex-1">
                <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                  Mrs. O'Neil is the heart of Travis DECA. With over 10 years of service, she has helped grow our
                  chapter into one of the most competitive and supportive DECA teams in the district. From organizing
                  travel and fundraising to mentoring every student, her dedication is unmatched. We are incredibly
                  thankful for her leadership and love.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Officer Team */}
        <Card
          className={`mb-16 ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm shadow-lg`}
        >
          <CardContent className="p-8">
            <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              Meet the 2024–25 Officer Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {officers.map((officer, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600 hover:bg-slate-700/70"
                      : "bg-white/70 border-slate-300 hover:bg-white/90"
                  }`}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white font-bold text-lg">
                      {officer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3
                    className={`text-lg font-semibold text-center mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}
                  >
                    {officer.name}
                  </h3>
                  <p
                    className={`text-sm font-medium text-center mb-3 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                  >
                    {officer.role}
                  </p>
                  <p className={`text-sm text-center ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                    {officer.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Committee Members */}
        <Card
          className={`mb-16 ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm shadow-lg`}
        >
          <CardContent className="p-8">
            <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              Student Committee
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {committeeMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mb-3 mx-auto">
                    <span className="text-white font-bold">
                      {member
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-slate-800"}`}>{member}</h3>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Committee Member</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Features */}
        <Card
          className={`mb-16 ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm shadow-lg`}
        >
          <CardContent className="p-8">
            <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              What This App Offers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600 hover:bg-slate-700/70"
                      : "bg-white/70 border-slate-300 hover:bg-white/90"
                  }`}
                >
                  <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                  <h3
                    className={`text-lg font-semibold text-center mb-3 ${isDarkMode ? "text-white" : "text-slate-800"}`}
                  >
                    {feature.title}
                  </h3>
                  <p className={`text-sm text-center ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Media & Contact */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Follow Us */}
          <Card
            className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm shadow-lg`}
          >
            <CardContent className="p-8 text-center">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                Stay Connected
              </h2>
              <div className="flex justify-center gap-6">
                <Button
                  variant="outline"
                  size="lg"
                  className={`${
                    isDarkMode
                      ? "border-slate-600 text-gray-300 hover:bg-slate-700"
                      : "border-slate-300 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={`${
                    isDarkMode
                      ? "border-slate-600 text-gray-300 hover:bg-slate-700"
                      : "border-slate-300 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Remind
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Developer */}
          <Card
            className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm shadow-lg`}
          >
            <CardContent className="p-8">
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                Contact the Developer
              </h2>
              <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                This app was built by a Travis DECA student to help our chapter thrive. Contact me with questions,
                suggestions, or to report bugs.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                    yourname@example.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>@yourhandle</span>
                </div>
              </div>
              <p className={`text-sm mt-4 font-medium ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                Built with ❤️ for Travis DECA.
              </p>
            </CardContent>
          </Card>
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
