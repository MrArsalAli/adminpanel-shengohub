"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, BarChart3, Users, DollarSign, BookOpen, Calendar, FileText, ChevronDown } from "lucide-react"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(null)

  const reports = [
    {
      title: "User Analytics Report",
      description: "User registration trends and active users",
      icon: <Users className="h-8 w-8" />,
      color: "bg-blue-500",
      metrics: ["Total Users", "New Registrations", "Active Users", "User Growth"],
      available: true
    },
    {
      title: "Student Performance",
      description: "Student progress, grades, and completion rates",
      icon: <BookOpen className="h-8 w-8" />,
      color: "bg-green-500",
      metrics: ["Enrollment Rate", "Completion %", "Avg Grades", "Progress"],
      available: true
    },
    {
      title: "Teacher Activity",
      description: "Teaching hours, courses, and ratings",
      icon: <Users className="h-8 w-8" />,
      color: "bg-purple-500",
      metrics: ["Active Teachers", "Courses Taught", "Avg Rating", "Hours"],
      available: true
    },
    {
      title: "Platform Analytics",
      description: "Platform usage and engagement statistics",
      icon: <BarChart3 className="h-8 w-8" />,
      color: "bg-orange-500",
      metrics: ["Page Views", "Session Time", "Bounce Rate", "Engagement"],
      available: false
    },
    {
      title: "Enrollment Trends",
      description: "Historical enrollment data and forecasts",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "bg-indigo-500",
      metrics: ["Monthly Growth", "Course Popularity", "Forecast", "Trends"],
      available: false
    },
    {
      title: "Revenue Analytics",
      description: "Financial performance and earnings",
      icon: <DollarSign className="h-8 w-8" />,
      color: "bg-emerald-500",
      metrics: ["Total Revenue", "Monthly Earnings", "Teacher Payouts", "Growth"],
      available: false
    },
  ]

  const handleGenerateReport = (report) => {
    if (report.available) {
      alert(`Generating ${report.title}...\n\nNote: This feature requires backend API implementation.`)
    } else {
      alert(`⚠️ ${report.title} is not available yet.\nThis feature requires additional backend development.`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section - Dashboard style */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
        <p className="text-white/90">Generate insights and performance reports</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Available Reports</p>
                <p className="text-2xl font-bold mt-2">3</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500 text-white">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Data Points</p>
                <p className="text-2xl font-bold mt-2">12+</p>
              </div>
              <div className="p-3 rounded-full bg-green-500 text-white">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Export Formats</p>
                <p className="text-2xl font-bold mt-2">3</p>
              </div>
              <div className="p-3 rounded-full bg-purple-500 text-white">
                <Download className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Last Updated</p>
                <p className="text-lg font-bold mt-2">Today</p>
              </div>
              <div className="p-3 rounded-full bg-orange-500 text-white">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <Card
            key={index}
            className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${!report.available ? 'opacity-70' : ''}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${report.color} text-white`}>
                  {report.icon}
                </div>
                {!report.available && (
                  <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <CardTitle className="text-lg font-bold mt-4">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Metrics Included:</p>
                  <div className="flex flex-wrap gap-2">
                    {report.metrics.map((metric, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  className={`w-full gap-2 ${report.available ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300 text-gray-600 hover:bg-gray-400'}`}
                  disabled={!report.available}
                  onClick={() => handleGenerateReport(report)}
                >
                  <Download className="w-4 h-4" />
                  {report.available ? 'Generate Report' : 'Not Available'}
                </Button>

                {!report.available && (
                  <p className="text-xs text-center text-gray-500 mt-2">
                    Requires backend API implementation
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Information Card */}
      <Card className="border border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-blue-800 mb-2">⚠️ Reports Feature Status</h4>
              <p className="text-sm text-blue-700 mb-3">
                Currently, only basic user/teacher/student data is available. For detailed analytics and reports,
                additional backend APIs need to be implemented to track:
              </p>
              <ul className="text-sm text-blue-600 space-y-1 list-disc pl-5">
                <li>Time-based analytics (daily/weekly/monthly trends)</li>
                <li>Financial/revenue tracking</li>
                <li>User engagement metrics</li>
                <li>Platform usage statistics</li>
                <li>Export functionality (CSV, PDF, Excel)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}