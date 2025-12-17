"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, Eye, TrendingUp, Users, Clock, FileText, AlertCircle, CheckCircle, XCircle, ClockIcon, BookOpen } from "lucide-react"
import { getAllTeachersRequest } from "@/app/api"
import { FaChalkboardTeacher } from "react-icons/fa"

export default function RequestsPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  useEffect(() => {
    const fetchAllRequests = async () => {
      setLoading(true);
      try {
        const data = await getAllTeachersRequest();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching Requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRequests();
  }, [])

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
  }

  const handleAccept = async (requestId) => {
    try {
      // Accept request API call
      console.log("Accepted request:", requestId)
    } catch (error) {
      console.error("Error accepting request:", error)
    }
  }

  const handleReject = async (requestId) => {
    try {
      // Reject request API call
      console.log("Rejected request:", requestId)
    } catch (error) {
      console.error("Error rejecting request:", error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "approved":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case 'rejected': return <XCircle className="h-4 w-4 text-rose-500" />
      case 'pending': return <ClockIcon className="h-4 w-4 text-amber-500" />
      default: return <ClockIcon className="h-4 w-4 text-gray-500" />
    }
  }

  // Calculate stats
  const pendingRequests = requests.filter(r => r.status === "pending").length
  const approvedRequests = requests.filter(r => r.status === "approved").length
  const rejectedRequests = requests.filter(r => r.status === "rejected").length
  const todayRequests = requests.filter(r => {
    const today = new Date()
    const requestDate = new Date(r.createdAt)
    return requestDate.toDateString() === today.toDateString()
  }).length

  const statCards = [
    {
      title: "Total Requests",
      value: requests.length || "0",
      description: "All teacher requests",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-blue-500",
      trend: "+12%",
    },
    {
      title: "Pending",
      value: pendingRequests || "0",
      description: "Awaiting approval",
      icon: <Clock className="h-5 w-5" />,
      color: "bg-amber-500",
      trend: "Review",
    },
    {
      title: "Approved",
      value: approvedRequests || "0",
      description: "Accepted requests",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-emerald-500",
      trend: "+15%",
    },
    {
      title: "Rejected",
      value: rejectedRequests || "0",
      description: "Declined requests",
      icon: <XCircle className="h-5 w-5" />,
      color: "bg-rose-500",
      trend: "-3%",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header Section - Dashboard style */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Teacher Requests Management</h1>
        <p className="text-white/90">Review and approve teacher registration requests</p>
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

      {/* Requests Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-xl font-bold">Pending Requests</CardTitle>
          <CardDescription>{pendingRequests} requests awaiting approval</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : requests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Teacher</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Specialization</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Experience</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Request Date</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, index) => (
                    <tr key={index} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      {/* Teacher Info with Image */}
                      <td className="py-4 px-4 text-foreground font-medium">
                        <div className="flex items-center gap-3">
                          {request?.requester?.picture ? (
                            <img
                              src={request.requester.picture}
                              alt={request.requester.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <Users className="w-4 h-4 text-gray-500" />
                            </div>
                          )}
                          <div>
                            <span className="block">{request?.requester?.name || "N/A"}</span>
                            <span className="text-xs text-muted-foreground">{request?.requester?.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Specialization */}
                      <td className="py-4 px-4 text-muted-foreground capitalize">
                        {request?.requester?.teacherProfile?.specialization || "Not specified"}
                      </td>

                      {/* Experience */}
                      <td className="py-4 px-4 text-foreground font-medium">
                        {request?.requester?.teacherProfile?.experience || "0"} years
                      </td>

                      {/* Request Date */}
                      <td className="py-4 px-4 text-muted-foreground">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(request)}
                            className="hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {request.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                                onClick={() => handleAccept(request._id)}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="gap-1"
                                onClick={() => handleReject(request._id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
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
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Requests Found</h3>
              <p className="text-gray-500">All teacher requests have been processed.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Request Details Modal - Modern Design */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {selectedRequest?.requester?.picture ? (
                      <img
                        src={selectedRequest.requester.picture}
                        alt={selectedRequest.requester.name}
                        className="w-12 h-12 rounded-full object-cover ring-4 ring-white shadow"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center ring-4 ring-white shadow">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1">
                      {getStatusIcon(selectedRequest?.status)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedRequest?.requester?.name || "Unknown Teacher"}</h3>
                    <p className="text-sm text-gray-500">{selectedRequest?.requester?.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-gray-100"
                  onClick={() => setSelectedRequest(null)}
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
                  {/* Status & Application Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className={`px-4 py-2 rounded-full font-medium text-sm capitalize ${getStatusColor(selectedRequest?.status)}`}>
                        {selectedRequest?.status}
                      </span>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">
                          Applied {new Date(selectedRequest?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Specialization</p>
                        <p className="font-semibold capitalize">{selectedRequest?.requester?.teacherProfile?.specialization || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Experience</p>
                        <p className="font-semibold">{selectedRequest?.requester?.teacherProfile?.experience || "0"} years</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Qualification</p>
                        <p className="font-semibold">{selectedRequest?.requester?.teacherProfile?.qualification || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Rate</p>
                        <p className="font-semibold">${selectedRequest?.requester?.teacherProfile?.rate || "0"}/hr</p>
                      </div>
                    </div>
                  </div>

                  {/* Application Message */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Application Message
                    </h4>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedRequest?.message || "No message provided"}
                      </p>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      About Teacher
                    </h4>
                    <div className="bg-gray-50 rounded-xl p-5">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedRequest?.requester?.teacherProfile?.bio || "No bio provided"}
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
                          <p className="font-medium">{selectedRequest?.requester?.teacherProfile?.phone || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{selectedRequest?.requester?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Documents & Actions */}
                <div className="space-y-6">
                  {/* Documents - FIXED FOR SINGLE STRING */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Documents</h4>
                    {selectedRequest?.requester?.teacherProfile?.documents ? (
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
                              const previewUrl = selectedRequest.requester.teacherProfile.documents;
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

                  {/* Timeline - FIXED FOR REQUEST DATA */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Application Timeline</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Application Submitted</p>
                          <p className="text-xs text-gray-500">
                            {new Date(selectedRequest?.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      {selectedRequest?.requester?.createdAt && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Account Created</p>
                            <p className="text-xs text-gray-500">
                              {new Date(selectedRequest.requester.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Review Actions */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Review Actions</h4>
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                        <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-3">
                          Review all documents before making a decision
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Button
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                          onClick={() => {
                            handleAccept(selectedRequest._id)
                            setSelectedRequest(null)
                          }}
                        >
                          <Check className="w-4 h-4" />
                          Approve Request
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-full gap-2"
                          onClick={() => {
                            handleReject(selectedRequest._id)
                            setSelectedRequest(null)
                          }}
                        >
                          <X className="w-4 h-4" />
                          Reject Request
                        </Button>
                      </div>
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