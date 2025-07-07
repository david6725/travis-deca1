"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface Event {
  id: string
  title: string
  time: string
  description?: string
  type: "meeting" | "deadline" | "announcement" | "officer"
  date: string
}

export default function EventsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [viewMode, setViewMode] = useState<"month" | "week">("month")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    description: "",
    type: "meeting" as Event["type"],
  })

  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Chapter Meeting",
      time: "3:30 PM",
      description: "Monthly chapter meeting in Room 204",
      type: "meeting",
      date: "2025-01-15",
    },
    {
      id: "2",
      title: "State Competition Registration",
      time: "11:59 PM",
      description: "Deadline for state competition registration",
      type: "deadline",
      date: "2025-01-20",
    },
    {
      id: "3",
      title: "Officer Training",
      time: "4:00 PM",
      description: "Leadership training for chapter officers",
      type: "officer",
      date: "2025-01-22",
    },
    {
      id: "4",
      title: "Fundraiser Announcement",
      time: "12:00 PM",
      description: "Details about upcoming fundraising event",
      type: "announcement",
      date: "2025-01-25",
    },
  ])

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

  const getEventIcon = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return "🗓️"
      case "deadline":
        return "📍"
      case "announcement":
        return "📣"
      case "officer":
        return "🎓"
      default:
        return "📅"
    }
  }

  const getEventColor = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return isDarkMode ? "bg-blue-600/20 border-blue-500/30" : "bg-blue-100 border-blue-300"
      case "deadline":
        return isDarkMode ? "bg-red-600/20 border-red-500/30" : "bg-red-100 border-red-300"
      case "announcement":
        return isDarkMode ? "bg-purple-600/20 border-purple-500/30" : "bg-purple-100 border-purple-300"
      case "officer":
        return isDarkMode ? "bg-green-600/20 border-green-500/30" : "bg-green-100 border-green-300"
      default:
        return isDarkMode ? "bg-slate-600/20 border-slate-500/30" : "bg-slate-100 border-slate-300"
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateString)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === "next" ? 1 : -1), 1))
  }

  const handleAddEvent = () => {
    if (newEvent.title && selectedDate) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        time: newEvent.time,
        description: newEvent.description,
        type: newEvent.type,
        date: selectedDate.toISOString().split("T")[0],
      }
      setEvents([...events, event])
      setNewEvent({ title: "", time: "", description: "", type: "meeting" })
      setIsAddEventOpen(false)
      setSelectedDate(null)
    }
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const today = new Date()
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const isToday = date.toDateString() === today.toDateString()
      const dayEvents = getEventsForDate(date)

      days.push(
        <div
          key={day}
          className={`h-32 p-2 border transition-all duration-200 cursor-pointer hover:shadow-lg ${
            isDarkMode
              ? "border-slate-700 hover:border-slate-600 hover:bg-slate-700/30"
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          } ${isToday ? (isDarkMode ? "bg-blue-900/30 border-blue-500" : "bg-blue-50 border-blue-300") : ""}`}
          onClick={() => {
            setSelectedDate(date)
            setIsAddEventOpen(true)
          }}
        >
          <div className="flex justify-between items-start mb-1">
            <span
              className={`text-sm font-medium ${
                isToday
                  ? isDarkMode
                    ? "text-blue-300"
                    : "text-blue-600"
                  : isDarkMode
                    ? "text-white"
                    : "text-slate-800"
              }`}
            >
              {day}
            </span>
            {isToday && <div className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-blue-400" : "bg-blue-500"}`}></div>}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div key={event.id} className={`text-xs p-1 rounded border ${getEventColor(event.type)} truncate`}>
                <span className="mr-1">{getEventIcon(event.type)}</span>
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>,
      )
    }

    return days
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

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
            className={`transition-colors font-medium ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
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
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>Upcoming Events</h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
            Stay up to date with Travis DECA chapter meetings, competitions, and important deadlines.
          </p>
        </div>

        {/* Top Bar */}
        <Card
          className={`mb-6 ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm`}
        >
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => navigateMonth("prev")}
                    variant="ghost"
                    size="sm"
                    className={`${isDarkMode ? "text-gray-300 hover:bg-slate-700" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <Button
                    onClick={() => navigateMonth("next")}
                    variant="ghost"
                    size="sm"
                    className={`${isDarkMode ? "text-gray-300 hover:bg-slate-700" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* View-mode selector */}
                <Select value={viewMode} onValueChange={(value: "month" | "week") => setViewMode(value)}>
                  <SelectTrigger
                    className={`${
                      isDarkMode
                        ? "bg-slate-700/50 border-slate-600 text-white"
                        : "bg-white/70 border-slate-300 text-slate-800"
                    }`}
                  >
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month view</SelectItem>
                    <SelectItem value="week">Week view</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className={`${
                        isDarkMode
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-700 hover:bg-blue-800 text-white"
                      }`}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={`${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"}`}
                    aria-describedby="add-event-description"
                  >
                    <DialogHeader>
                      <DialogTitle className={`${isDarkMode ? "text-white" : "text-slate-800"}`}>
                        Add New Event
                      </DialogTitle>
                      <DialogDescription
                        id="add-event-description"
                        className={`${isDarkMode ? "text-gray-300" : "text-slate-600"}`}
                      >
                        Create a new event for the Travis DECA calendar. Fill in the details below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}
                        >
                          Event Title
                        </label>
                        <Input
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                          placeholder="Enter event title"
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}
                        >
                          Time
                        </label>
                        <Input
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                          placeholder="e.g., 3:30 PM"
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}
                        >
                          Event Type
                        </label>
                        <Select
                          value={newEvent.type}
                          onValueChange={(value: Event["type"]) => setNewEvent({ ...newEvent, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="meeting">Chapter Meeting</SelectItem>
                            <SelectItem value="deadline">Competition Deadline</SelectItem>
                            <SelectItem value="announcement">Announcement</SelectItem>
                            <SelectItem value="officer">Officer Reminder</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}
                        >
                          Description (Optional)
                        </label>
                        <Textarea
                          value={newEvent.description}
                          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                          placeholder="Enter event description"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddEventOpen(false)}
                          className={`${isDarkMode ? "border-slate-600 text-gray-300 hover:bg-slate-700" : "border-slate-300 text-slate-600 hover:bg-slate-100"}`}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleAddEvent}
                          className={`${
                            isDarkMode
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-blue-700 hover:bg-blue-800 text-white"
                          }`}
                        >
                          Add Event
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card
          className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-300"} backdrop-blur-sm shadow-lg`}
        >
          <CardContent className="p-6">
            {viewMode === "month" && (
              <>
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-0 mb-4">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className={`p-3 text-center font-medium ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-0 border rounded-lg overflow-hidden">{renderCalendarGrid()}</div>
              </>
            )}
            {viewMode === "week" && (
              <div className={`text-center py-12 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                Week view coming soon...
              </div>
            )}
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
