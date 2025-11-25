import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, MoreHorizontal, Eye, Plus } from "lucide-react";
import { getAllTeachers } from "@/app/api";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    const fetchAllTeachers = async () => {
      setLoading(true);
      try {
        const data = await getAllTeachers();
        setTeachers(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTeachers();
  }, []);

  const handleViewDetails = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleViewDocument = (documentUrl) => {
    setSelectedDocument(documentUrl);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teachers</h1>
          <p className="text-muted-foreground mt-2">Manage your teaching staff</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Add Teacher
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
                placeholder="Search teachers..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Teachers</CardTitle>
          <CardDescription>{teachers.length} teachers</CardDescription>
        </CardHeader>
        <CardContent>
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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          teacher?.teacherProfile?.status
                        )}`}
                      >
                        {teacher?.teacherProfile?.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(teacher)}
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

      {/* Document Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 h-5/6 max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Document Preview</h3>
              <Button
                variant="ghost"
                onClick={() => setSelectedDocument(null)}
              >
                Close
              </Button>
            </div>
            <div className="h-full">
              <iframe
                src={selectedDocument}
                className="w-full h-full border rounded"
                title="Document Preview"
              />
            </div>
          </div>
        </div>
      )}

      {/* Teacher Details Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Teacher Details</h3>
              <Button
                variant="ghost"
                onClick={() => setSelectedTeacher(null)}
              >
                Close
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedTeacher.picture}
                  alt={selectedTeacher.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold">{selectedTeacher.name}</h4>
                  <p className="text-muted-foreground">{selectedTeacher.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Specialization</label>
                  <p className="capitalize">{selectedTeacher.teacherProfile?.specialization}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Experience</label>
                  <p>{selectedTeacher.teacherProfile?.experience} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Qualification</label>
                  <p>{selectedTeacher.teacherProfile?.qualification}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rate</label>
                  <p>${selectedTeacher.teacherProfile?.rate}/hr</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p>{selectedTeacher.teacherProfile?.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                      selectedTeacher.teacherProfile?.status
                    )}`}
                  >
                    {selectedTeacher.teacherProfile?.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Bio</label>
                <p className="text-sm mt-1">{selectedTeacher.teacherProfile?.bio}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Document
                </label>

                {selectedTeacher.teacherProfile?.documents ? (
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm text-gray-600">Teacher Document</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(selectedTeacher.teacherProfile.documents, '_blank')}
                    >
                      View Document
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No document uploaded</p>
                )}
              </div>


              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-muted-foreground">Joined</label>
                  <p>{new Date(selectedTeacher.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="font-medium text-muted-foreground">Last Updated</label>
                  <p>{new Date(selectedTeacher.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}