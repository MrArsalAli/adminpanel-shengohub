"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, MoreHorizontal, Eye } from "lucide-react"
import { getAllStudents } from "@/app/api"

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
    const lastLoginDate = new Date(lastLogin)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return lastLoginDate >= thirtyDaysAgo ? "Active" : "Inactive"
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground mt-2">Manage enrolled students</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Add Student
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>{students.length} students</CardDescription>
        </CardHeader>
        <CardContent>
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
                    <td className="py-4 px-4 text-muted-foreground">
                      {new Date(student.studentProfile?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatus(student.studentProfile?.lastLogin) === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {getStatus(student.studentProfile?.lastLogin)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(student)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
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

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Student Details</h3>
              <Button
                variant="ghost"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedStudent.picture}
                  alt={selectedStudent.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold">{selectedStudent.name}</h4>
                  <p className="text-muted-foreground">{selectedStudent.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="capitalize">{selectedStudent.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Enrolled Courses</label>
                  <p>{getCoursesCount(selectedStudent)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatus(selectedStudent.studentProfile?.lastLogin) === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {getStatus(selectedStudent.studentProfile?.lastLogin)}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Login</label>
                  <p>{new Date(selectedStudent.studentProfile?.lastLogin).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-muted-foreground">Joined Date</label>
                  <p>{new Date(selectedStudent.studentProfile?.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="font-medium text-muted-foreground">Last Updated</label>
                  <p>{new Date(selectedStudent.studentProfile?.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Agar enrolled courses ki detailed list chahiye to yahan add kar sakte hain */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Enrollment Details</label>
                <div className="p-3 border rounded bg-gray-50">
                  <p className="text-sm text-muted-foreground">
                    {getCoursesCount(selectedStudent) > 0
                      ? `Enrolled in ${getCoursesCount(selectedStudent)} courses`
                      : "Not enrolled in any courses yet"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}