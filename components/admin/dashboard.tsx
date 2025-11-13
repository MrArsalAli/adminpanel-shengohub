"use client"

import { Users, BookOpen, DollarSign, FileCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { title: "Total Teachers", value: "248", icon: Users, color: "text-blue-600" },
  { title: "Total Students", value: "1,842", icon: Users, color: "text-green-600" },
  { title: "Active Courses", value: "42", icon: BookOpen, color: "text-purple-600" },
  { title: "Pending Requests", value: "13", icon: FileCheck, color: "text-orange-600" },
  { title: "Total Earnings", value: "$24,580", icon: DollarSign, color: "text-primary" },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Administrator</h1>
        <p className="text-muted-foreground">Here's what's happening with your LMS today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  {stat.title}
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Student Enrollment Trend</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-secondary rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        {/* Support Box */}
        <Card className="bg-gradient-to-br from-primary to-primary/80">
          <CardHeader>
            <CardTitle className="text-white">Need Help?</CardTitle>
            <CardDescription className="text-white/80">Contact Support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-white/90">Email Support</p>
              <p className="text-white font-medium">support@learnsphere.com</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-white/90">Phone</p>
              <p className="text-white font-medium">1-800-LEARN-123</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-white/90">Chat Hours</p>
              <p className="text-white font-medium">9 AM - 6 PM EST</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New student enrolled", time: "2 hours ago", icon: "👤" },
              { action: "Teacher request approved", time: "4 hours ago", icon: "✓" },
              { action: "Course published", time: "1 day ago", icon: "📚" },
              { action: "Payment received", time: "2 days ago", icon: "💰" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <p className="text-sm text-foreground">{item.action}</p>
                </div>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
