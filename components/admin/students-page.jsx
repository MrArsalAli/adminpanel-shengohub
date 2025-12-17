"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, MoreHorizontal, Eye, TrendingUp, CheckCircle, XCircle, ClockIcon, Users, BookOpen, UserCheck, UserX, Clock } from "lucide-react"
import { getAllStudents } from "@/app/api"
import { FaUserGraduate } from "react-icons/fa"

export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    const fetchAllStudents = async () => {
      setLoading(true);
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllStudents();
  }, []);

  const handleViewDetails = (student) => {
    setSelectedStudent(student)
  }

  const getStatus = (lastLogin) => {
    if (!lastLogin) return "Inactive"
    const lastLoginDate = new Date(lastLogin)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return lastLoginDate >= thirtyDaysAgo ? "Active" : "Inactive"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-emerald-100 text-emerald-700"
      case "Inactive": return "bg-gray-100 text-gray-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case 'Inactive': return <ClockIcon className="h-4 w-4 text-gray-500" />
      default: return <ClockIcon className="h-4 w-4 text-gray-500" />
    }
  }

  // Calculate stats
  const activeStudents = students.filter(s => getStatus(s.studentProfile?.lastLogin) === "Active").length
  const inactiveStudents = students.filter(s => getStatus(s.studentProfile?.lastLogin) === "Inactive").length
  const totalCourses = students.reduce((total, student) => total + (student.enrolledCourses?.length || 0), 0)
  const avgCoursesPerStudent = students.length > 0 ? (totalCourses / students.length).toFixed(1) : 0

  const statCards = [
    {
      title: "Total Students",
      value: students.length || "0",
      description: "All enrolled students",
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-500",
      trend: "+12%",
    },
    {
      title: "Active Students",
      value: activeStudents || "0",
      description: "Logged in last 30 days",
      icon: <UserCheck className="h-5 w-5" />,
      color: "bg-emerald-500",
      trend: "+8%",
    },
    {
      title: "Inactive Students",
      value: inactiveStudents || "0",
      description: "Not active recently",
      icon: <UserX className="h-5 w-5" />,
      color: "bg-rose-500",
      trend: "-3%",
    },
    {
      title: "Avg Courses",
      value: avgCoursesPerStudent || "0",
      description: "Courses per student",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-purple-500",
      trend: "+5%",
    },
  ]

  const getCoursesCount = (student) => {
    return student.enrolledCourses?.length || 0
  }

  return (
    <div className="space-y-6">
      {/* Header Section - Dashboard style */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Students Management</h1>
        <p className="text-white/90">Manage enrolled students and their progress</p>
      </div>

      {/* Stats Cards - Dashboard style 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <CardTitle className="text-lg font-bold mt-4">{stat.title}</CardTitle>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-foreground">
                  {loading ? "..." : stat.value}
                </div>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Bar with Search */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students by name, email, or course..."
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Add Student
        </Button>
      </div>

      {/* Students Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-xl font-bold">All Students</CardTitle>
          <CardDescription>{students.length} students enrolled</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Courses</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Join Date</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-4 px-4 text-foreground font-medium">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.picture}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span>{student.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{student.email}</td>
                      <td className="py-4 px-4 text-foreground font-medium">
                        {getCoursesCount(student)}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {new Date(student.studentProfile?.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(getStatus(student.studentProfile?.lastLogin))}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              getStatus(student.studentProfile?.lastLogin)
                            )}`}
                          >
                            {getStatus(student.studentProfile?.lastLogin)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(student)}
                            className="hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-50">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaUserGraduate className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Students Found</h3>
              <p className="text-gray-500">Add your first student to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={selectedStudent.picture}
                      alt={selectedStudent.name}
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-white shadow"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      {getStatusIcon(getStatus(selectedStudent.studentProfile?.lastLogin))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h3>
                    <p className="text-sm text-gray-500">{selectedStudent.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-gray-100"
                  onClick={() => setSelectedStudent(null)}
                >
                  ✕
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Status & Enrollment */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className={`px-4 py-2 rounded-full font-medium text-sm ${getStatusColor(getStatus(selectedStudent.studentProfile?.lastLogin))}`}>
                        {getStatus(selectedStudent.studentProfile?.lastLogin)}
                      </span>
                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-semibold">{getCoursesCount(selectedStudent)} courses</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <ClockIcon className="w-4 h-4" />
                        <span>{selectedStudent.role || "Student"}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Last Login</p>
                        <p className="font-semibold">
                          {selectedStudent.studentProfile?.lastLogin
                            ? new Date(selectedStudent.studentProfile.lastLogin).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                            : "Never"
                          }
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Student Since</p>
                        <p className="font-semibold">
                          {new Date(selectedStudent.studentProfile?.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enrollment Summary */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      Enrollment Summary
                    </h4>
                    <div className="bg-gray-50 rounded-xl p-5">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <p className="text-2xl font-bold text-gray-900">{getCoursesCount(selectedStudent)}</p>
                          <p className="text-sm text-gray-500">Total Courses</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <p className="text-2xl font-bold text-gray-900">0</p>
                          <p className="text-sm text-gray-500">Completed</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <p className="text-2xl font-bold text-gray-900">0</p>
                          <p className="text-sm text-gray-500">In Progress</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <p className="text-2xl font-bold text-gray-900">0</p>
                          <p className="text-sm text-gray-500">Certificates</p>
                        </div>
                      </div>

                      {getCoursesCount(selectedStudent) > 0 ? (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-700">
                            Currently enrolled in <span className="font-semibold">{getCoursesCount(selectedStudent)}</span> course{getCoursesCount(selectedStudent) > 1 ? 's' : ''}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-4 text-center py-4">
                          <p className="text-gray-500">Not enrolled in any courses yet</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      Recent Activity
                    </h4>
                    <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Last Course Access</p>
                          <p className="text-xs text-gray-500">
                            {selectedStudent.studentProfile?.lastLogin
                              ? new Date(selectedStudent.studentProfile.lastLogin).toLocaleDateString()
                              : "No recent activity"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Timeline & Actions */}
                <div className="space-y-6">
                  {/* Account Info */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Account Information</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Account ID</p>
                        <p className="font-mono text-sm bg-gray-50 p-2 rounded">{selectedStudent._id?.slice(-8) || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email Verified</p>
                        <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Timeline</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Joined Platform</p>
                          <p className="text-xs text-gray-500">
                            {new Date(selectedStudent.studentProfile?.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <ClockIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Profile Updated</p>
                          <p className="text-xs text-gray-500">
                            {new Date(selectedStudent.studentProfile?.updatedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      {selectedStudent.studentProfile?.lastLogin && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Last Active</p>
                            <p className="text-xs text-gray-500">
                              {new Date(selectedStudent.studentProfile.lastLogin).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
                        View Progress
                      </Button>
                      <Button variant="ghost" className="w-full text-gray-600 hover:bg-gray-100">
                        Reset Password
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}