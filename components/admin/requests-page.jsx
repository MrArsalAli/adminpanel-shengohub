"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, Eye } from "lucide-react"
import { getAllTeachersRequest } from "@/app/api"

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
      // await acceptTeacherRequest(requestId);
      console.log("Accepted request:", requestId)
      // Refresh requests list
    } catch (error) {
      console.error("Error accepting request:", error)
    }
  }

  const handleReject = async (requestId) => {
    try {
      // Reject request API call
      // await rejectTeacherRequest(requestId);
      console.log("Rejected request:", requestId)
      // Refresh requests list
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Teacher Requests</h1>
        <p className="text-muted-foreground mt-2">Manage teacher registration requests</p>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
          <CardDescription>{requests.length} requests awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Teacher Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Specialization</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Experience</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Request Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{request.teacher?.name}</td>
                    <td className="py-4 px-4 text-muted-foreground capitalize">{request.teacher?.teacherProfile?.specialization}</td>
                    <td className="py-4 px-4 text-muted-foreground">{request.teacher?.teacherProfile?.experience} years</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(request)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white gap-1"
                          onClick={() => handleAccept(request._id)}
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-1"
                          onClick={() => handleReject(request._id)}
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Teacher Request Details</h3>
              <Button
                variant="ghost"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </Button>
            </div>

            <div className="space-y-6">
              {/* Teacher Basic Info */}
              <div className="flex items-center gap-4">
                <img
                  src={selectedRequest.teacher?.picture}
                  alt={selectedRequest.teacher?.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xl font-semibold">{selectedRequest.teacher?.name}</h4>
                  <p className="text-muted-foreground">{selectedRequest.teacher?.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Applied on {new Date(selectedRequest.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Professional Details */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Specialization</label>
                  <p className="capitalize">{selectedRequest.teacher?.teacherProfile?.specialization}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Experience</label>
                  <p>{selectedRequest.teacher?.teacherProfile?.experience} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Qualification</label>
                  <p>{selectedRequest.teacher?.teacherProfile?.qualification}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rate</label>
                  <p>${selectedRequest.teacher?.teacherProfile?.rate}/hr</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p>{selectedRequest.teacher?.teacherProfile?.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Bio</label>
                <p className="text-sm mt-2 p-3 border rounded bg-gray-50">
                  {selectedRequest.teacher?.teacherProfile?.bio}
                </p>
              </div>

              {/* Application Message */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Application Message</label>
                <p className="text-sm mt-2 p-3 border rounded bg-blue-50">
                  {selectedRequest.message}
                </p>
              </div>

              {/* Documents */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Documents</label>
                <div className="space-y-2">
                  {selectedRequest.teacher?.teacherProfile?.documents?.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Document {index + 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(doc, '_blank')}
                      >
                        View Document
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white gap-2 flex-1"
                  onClick={() => {
                    handleAccept(selectedRequest._id)
                    setSelectedRequest(null)
                  }}
                >
                  <Check className="w-4 h-4" />
                  Accept Request
                </Button>
                <Button
                  variant="destructive"
                  className="gap-2 flex-1"
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
      )}
    </div>
  )
}