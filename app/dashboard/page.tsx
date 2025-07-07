"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, BarChart3, CheckCircle, TrendingUp, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function Dashboard() {
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

  // Sample data for the cluster exam chart
  const clusterChartData = [
    { day: "-30d", attempts: 0, score: 0 },
    { day: "-24d", attempts: 2, score: 65 },
    { day: "-19d", attempts: 1, score: 58 },
    { day: "-14d", attempts: 3, score: 72 },
    { day: "-9d", attempts: 0, score: 0 },
    { day: "-4d", attempts: 1, score: 68 },
    { day: "Today", attempts: 8, score: 75 },
  ]

  // Sample data for the roleplay chart
  const roleplayChartData = [
    { day: "-30d", roleplays: 0, score: 0 },
    { day: "-24d", roleplays: 1, score: 78 },
    { day: "-19d", roleplays: 2, score: 82 },
    { day: "-14d", roleplays: 1, score: 75 },
    { day: "-9d", roleplays: 3, score: 85 },
    { day: "-4d", roleplays: 2, score: 88 },
    { day: "Today", roleplays: 4, score: 91 },
  ]

  const maxClusterAttempts = Math.max(...clusterChartData.map((d) => d.attempts))
  const maxRoleplayAttempts = Math.max(...roleplayChartData.map((d) => d.roleplays))

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
            className={`transition-colors font-medium ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
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
            href="/"
            className={`transition-colors ${
              isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
            }`}
          >
            Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
            AI Feedback & Scoring
          </h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
            Get instant AI-powered feedback on your DECA preparation
          </p>
        </div>

        <Card
          className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm`}
        >
          <CardContent className="p-6">
            <Tabs defaultValue="cluster" className="w-full">
              <TabsList className={`grid w-full grid-cols-3 ${isDarkMode ? "bg-slate-700/50" : "bg-slate-200/50"}`}>
                <TabsTrigger value="cluster" className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Cluster Exam Analyzer
                </TabsTrigger>
                <TabsTrigger value="roleplay" className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  Roleplay Feedback
                </TabsTrigger>
                <TabsTrigger value="written" className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  Written Event Review
                </TabsTrigger>
              </TabsList>

              {/* Cluster Exam Analyzer Tab */}
              <TabsContent value="cluster" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-2xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      Cluster Exam Analyzer
                    </h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                      Upload your completed test or select answers to receive an AI score and explanation.
                    </p>
                  </div>

                  {/* Practice Activity Chart */}
                  <Card
                    className={`${isDarkMode ? "bg-slate-700/50 border-slate-600" : "bg-slate-100/50 border-slate-300"} shadow-lg`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <BarChart3 className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                          <h4 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                            Cluster Exams
                          </h4>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-green-500 font-medium text-sm">+100% this month</span>
                        </div>
                      </div>

                      {/* Chart */}
                      <div className="mb-6">
                        <div className="flex items-end justify-between h-32 px-2">
                          {clusterChartData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 flex-1">
                              <div className="flex items-end h-24 w-full justify-center">
                                {data.attempts > 0 && (
                                  <div
                                    className={`w-8 rounded-t transition-all duration-300 ${
                                      data.day === "Today"
                                        ? "bg-blue-500 shadow-lg shadow-blue-500/30"
                                        : isDarkMode
                                          ? "bg-slate-500"
                                          : "bg-slate-400"
                                    }`}
                                    style={{
                                      height: `${(data.attempts / maxClusterAttempts) * 100}%`,
                                      minHeight: data.attempts > 0 ? "8px" : "0px",
                                    }}
                                  />
                                )}
                              </div>
                              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                                {data.day}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Statistics */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Total Attempts</p>
                          <p className={`text-2xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>15</p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Total Accuracy</p>
                          <p className={`text-2xl font-bold ${isDarkMode ? "text-orange-400" : "text-orange-600"}`}>
                            27%
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Total Correct</p>
                          <p className={`text-2xl font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>4</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">{/* left / right columns can go here */}</div>

                  {/* Tip of the Day */}
                  <div
                    className={`p-4 rounded-lg ${isDarkMode ? "bg-blue-900/30 border border-blue-700/50" : "bg-blue-100/50 border border-blue-300"}`}
                  >
                    <h5
                      className={`font-medium mb-2 flex items-center gap-2 ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}
                    >
                      💡 Tip of the Day
                    </h5>
                    <p className={`text-sm ${isDarkMode ? "text-blue-200" : "text-blue-600"}`}>
                      Focus more on finance terminology questions. Consider reviewing key financial ratios and
                      accounting principles.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Roleplay Feedback Tab */}
              <TabsContent value="roleplay" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-2xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      Roleplay AI Feedback
                    </h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                      Hey [First Name], great to see you!
                      <br />
                      Let's check your progress and see how you can level up your roleplay performance today.
                    </p>
                  </div>

                  {/* Roleplay Activity Chart */}
                  <Card
                    className={`${isDarkMode ? "bg-slate-700/50 border-slate-600" : "bg-slate-100/50 border-slate-300"} shadow-lg`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <MessageSquare className={`w-5 h-5 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                          <h4 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                            Roleplay Practice
                          </h4>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="text-2xl">🔥</span>
                            <span className="text-orange-500 font-medium text-sm">5 Day Streak</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-green-500 font-medium text-sm">+85% this month</span>
                          </div>
                        </div>
                      </div>

                      {/* Chart */}
                      <div className="mb-6">
                        <div className="flex items-end justify-between h-32 px-2">
                          {roleplayChartData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 flex-1">
                              <div className="flex items-end h-24 w-full justify-center">
                                {data.roleplays > 0 && (
                                  <div
                                    className={`w-8 rounded-t transition-all duration-300 ${
                                      data.day === "Today"
                                        ? "bg-purple-500 shadow-lg shadow-purple-500/30"
                                        : isDarkMode
                                          ? "bg-slate-500"
                                          : "bg-slate-400"
                                    }`}
                                    style={{
                                      height: `${(data.roleplays / maxRoleplayAttempts) * 100}%`,
                                      minHeight: data.roleplays > 0 ? "8px" : "0px",
                                    }}
                                  />
                                )}
                              </div>
                              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                                {data.day}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Statistics */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                            Total Roleplays
                          </p>
                          <p className={`text-2xl font-bold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                            13
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Average Score</p>
                          <p className={`text-2xl font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                            84%
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Best Score</p>
                          <p className={`text-2xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>91%</p>
                        </div>
                      </div>

                      {/* Top Areas to Improve */}
                      <div className="mt-6">
                        <h5 className={`font-medium mb-3 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                          Top Areas to Improve
                        </h5>
                        <ul className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            Problem-Solving Approach (72% avg)
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            Communication Clarity (78% avg)
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Closing Techniques (81% avg)
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Written Event Review Tab */}
              <TabsContent value="written" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-2xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      Written Event Review
                    </h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                      Track your written project progress and get suggestions on how to improve it before competition.
                    </p>
                  </div>

                  {/* Written Event Progress Chart */}
                  <Card
                    className={`${isDarkMode ? "bg-slate-700/50 border-slate-600" : "bg-slate-100/50 border-slate-300"} shadow-lg`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`w-5 h-5 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                          <h4 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                            Written Event Progress
                          </h4>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-green-500 font-medium text-sm">60% Complete</span>
                        </div>
                      </div>

                      {/* Progress Milestones */}
                      <div className="mb-8">
                        <div className="space-y-4">
                          {/* Executive Summary */}
                          <div className="flex items-center gap-4">
                            <div className="w-24 text-sm font-medium text-right">
                              <span className={isDarkMode ? "text-gray-300" : "text-slate-600"}>Executive Summary</span>
                            </div>
                            <div className="flex-1 bg-slate-600 rounded-full h-3 relative overflow-hidden">
                              <div
                                className="bg-green-500 h-full rounded-full transition-all duration-300"
                                style={{ width: "100%" }}
                              ></div>
                            </div>
                            <div className="w-12 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                          </div>

                          {/* Market Research */}
                          <div className="flex items-center gap-4">
                            <div className="w-24 text-sm font-medium text-right">
                              <span className={isDarkMode ? "text-gray-300" : "text-slate-600"}>Market Research</span>
                            </div>
                            <div className="flex-1 bg-slate-600 rounded-full h-3 relative overflow-hidden">
                              <div
                                className="bg-yellow-500 h-full rounded-full transition-all duration-300"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                            <div className="w-12 text-sm">
                              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>45%</span>
                            </div>
                          </div>

                          {/* Marketing Plan */}
                          <div className="flex items-center gap-4">
                            <div className="w-24 text-sm font-medium text-right">
                              <span className={isDarkMode ? "text-gray-300" : "text-slate-600"}>Marketing Plan</span>
                            </div>
                            <div className="flex-1 bg-slate-600 rounded-full h-3 relative overflow-hidden">
                              <div
                                className="bg-green-500 h-full rounded-full transition-all duration-300"
                                style={{ width: "100%" }}
                              ></div>
                            </div>
                            <div className="w-12 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                          </div>

                          {/* Financials */}
                          <div className="flex items-center gap-4">
                            <div className="w-24 text-sm font-medium text-right">
                              <span className={isDarkMode ? "text-gray-300" : "text-slate-600"}>Financials</span>
                            </div>
                            <div className="flex-1 bg-slate-600 rounded-full h-3 relative overflow-hidden">
                              <div
                                className="bg-yellow-500 h-full rounded-full transition-all duration-300"
                                style={{ width: "30%" }}
                              ></div>
                            </div>
                            <div className="w-12 text-sm">
                              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>30%</span>
                            </div>
                          </div>

                          {/* Visuals/Appendix */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-24 text-sm font-medium text-right">
                              <span className={isDarkMode ? "text-gray-300" : "text-slate-600"}>Visuals/Appendix</span>
                            </div>
                            <div className="flex-1 bg-slate-600 rounded-full h-3 relative overflow-hidden">
                              <div
                                className="bg-slate-500 h-full rounded-full transition-all duration-300"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                            <div className="w-12 text-sm">
                              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>0%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Statistics */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>📊 Completion</p>
                          <p className={`text-lg font-bold ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}>
                            You're 60% done!
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>📎 Last Upload</p>
                          <p className={`text-lg font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                            Oct 10, 2025
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>📝 Status</p>
                          <p className={`text-lg font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                            On Track
                          </p>
                        </div>
                      </div>

                      {/* Feedback Notes */}
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-slate-600/50" : "bg-white/50"}`}>
                        <h5 className={`font-medium mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                          📝 Feedback Notes
                        </h5>
                        <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                          Needs more depth in Market Research section. Consider adding competitor analysis and target
                          demographic data. Executive Summary and Marketing Plan look strong!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
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
