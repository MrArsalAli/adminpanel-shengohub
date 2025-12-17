"use client"
import { useState, useEffect } from "react"
import {
  Plus,
  Search,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  ClockIcon,
  TrendingUp,
  Users,
  FileText,
  BookOpen,
  DollarSign
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa"
import { getAllTeachers } from "@/app/api"

export default function Teachers() {
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTeachers: 0,
    approvedTeachers: 0,
    pendingTeachers: 0,
    rejectedTeachers: 0
  })

  useEffect(() => {
    // Fetch teachers data
    const fetchData = async () => {
      try {
        // Your API call here
        const data = await getAllTeachers()
        setTeachers(data)

        // Calculate stats
        const total = data.length
        const approved = data.filter(t => t?.teacherProfile?.status === 'approved').length
        const pending = data.filter(t => t?.teacherProfile?.status === 'pending').length
        const rejected = data.filter(t => t?.teacherProfile?.status === 'rejected').length

        setStats({
          totalTeachers: total,
          approvedTeachers: approved,
          pendingTeachers: pending,
          rejectedTeachers: rejected
        })
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleViewDetails = (teacher) => {
    setSelectedTeacher(teacher)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-emerald-100 text-emerald-700"
      case "pending": return "bg-amber-100 text-amber-700"
      case "rejected": return "bg-rose-100 text-rose-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case 'rejected': return <XCircle className="h-4 w-4 text-rose-500" />
      default: return <ClockIcon className="h-4 w-4 text-amber-500" />
    }
  }

  const statCards = [
    {
      title: "Total Teachers",
      value: stats.totalTeachers || "0",
      description: "All registered teachers",
      icon: <FaChalkboardTeacher className="h-5 w-5" />,
      color: "bg-blue-500",
      trend: "+5%",
    },
    {
      title: "Approved",
      value: stats.approvedTeachers || "0",
      description: "Verified educators",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-emerald-500",
      trend: "+15%",
    },
    {
      title: "Pending",
      value: stats.pendingTeachers || "0",
      description: "Awaiting approval",
      icon: <ClockIcon className="h-5 w-5" />,
      color: "bg-amber-500",
      trend: "Urgent",
    },
    {
      title: "Rejected",
      value: stats.rejectedTeachers || "0",
      description: "Not approved",
      icon: <XCircle className="h-5 w-5" />,
      color: "bg-rose-500",
      trend: "Review",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header Section - Dashboard style */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Teachers Management</h1>
        <p className="text-white/90">Manage your teaching staff and their profiles</p>
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
            placeholder="Search teachers by name, email, or specialization..."
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Add Teacher
        </Button>
      </div>

      {/* Teachers Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-xl font-bold">All Teachers</CardTitle>
          <CardDescription>{teachers.length} teachers registered</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : teachers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Specialization</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Experience</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rate</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr key={index} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-4 px-4 text-foreground font-medium">
                        <div className="flex items-center gap-3">
                          <img
                            src={teacher.picture}
                            alt={teacher.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span>{teacher.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{teacher.email}</td>
                      <td className="py-4 px-4 text-foreground capitalize">{teacher?.teacherProfile?.specialization}</td>
                      <td className="py-4 px-4 text-foreground">{teacher?.teacherProfile?.experience} years</td>
                      <td className="py-4 px-4 text-foreground">${teacher?.teacherProfile?.rate}/hr</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(teacher?.teacherProfile?.status)}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                              teacher?.teacherProfile?.status
                            )}`}
                          >
                            {teacher?.teacherProfile?.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(teacher)}
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
                <FaChalkboardTeacher className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Teachers Found</h3>
              <p className="text-gray-500">Add your first teacher to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Teacher Details Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={selectedTeacher.picture}
                      alt={selectedTeacher.name}
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-white shadow"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      {getStatusIcon(selectedTeacher?.teacherProfile?.status)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedTeacher.name}</h3>
                    <p className="text-sm text-gray-500">{selectedTeacher.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-gray-100"
                  onClick={() => setSelectedTeacher(null)}
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
                  {/* Status & Basic Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className={`px-4 py-2 rounded-full font-medium text-sm capitalize ${getStatusColor(selectedTeacher.teacherProfile?.status)}`}>
                        {selectedTeacher.teacherProfile?.status}
                      </span>
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold">${selectedTeacher.teacherProfile?.rate}/hr</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <ClockIcon className="w-4 h-4" />
                        <span>{selectedTeacher.teacherProfile?.experience} years exp</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Specialization</p>
                        <p className="font-semibold capitalize">{selectedTeacher.teacherProfile?.specialification}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Qualification</p>
                        <p className="font-semibold">{selectedTeacher.teacherProfile?.qualification}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      About Teacher
                    </h4>
                    <div className="bg-gray-50 rounded-xl p-5">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedTeacher.teacherProfile?.bio || "No bio available"}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Contact Information
                    </h4>
                    <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{selectedTeacher.teacherProfile?.phone || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Documents & Timeline */}
                <div className="space-y-6">
                  {/* Documents */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Documents</h4>
                    {selectedTeacher?.teacherProfile?.documents ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="cursor-pointer">
                              <p className="font-medium text-sm">Teacher Document</p>
                              <p className="text-xs text-gray-500">PDF Document</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 cursor-pointer"
                            onClick={() => {
                              const previewUrl = selectedTeacher.teacherProfile.documents;
                              window.open(previewUrl, "_blank");
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">No documents uploaded</p>
                      </div>
                    )}
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
                          <p className="font-medium text-sm">Account Created</p>
                          <p className="text-xs text-gray-500">
                            {new Date(selectedTeacher.createdAt).toLocaleDateString('en-US', {
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
                          <p className="font-medium text-sm">Last Updated</p>
                          <p className="text-xs text-gray-500">
                            {new Date(selectedTeacher.updatedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-3">Actions</h4>
                    <div className="space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                        Edit Profile
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