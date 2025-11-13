"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    { title: "Student Performance Report", description: "Overview of student progress and grades", icon: "📊" },
    { title: "Revenue Analytics", description: "Detailed financial performance metrics", icon: "💹" },
    { title: "Course Completion Report", description: "Course completion rates and trends", icon: "✓" },
    { title: "Teacher Activity Report", description: "Teaching hours and course management data", icon: "👨‍🏫" },
    { title: "Platform Usage Analytics", description: "User engagement and platform statistics", icon: "📈" },
    { title: "Enrollment Trends", description: "Historical enrollment data and forecasts", icon: "📝" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-2">Generate and view analytics reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow hover:border-primary/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="text-3xl">{report.icon}</div>
              </div>
              <CardTitle className="mt-4">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full gap-2">
                <Download className="w-4 h-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
