"use client"
import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  BookOpen,
  DollarSign,
  CheckCircle,
  XCircle,
  ClockIcon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats } from "@/app/api";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserCheck,
  FaUserTimes,
  FaFileContract,
  FaHourglassHalf
} from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data || {});
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers || "0",
      description: "Registered users",
      icon: <Users className="h-5 w-5" />,
      color: "bg-purple-500",
      trend: "+12%",
    },
    {
      title: "Total Students",
      value: stats.totalStudents || "0",
      description: "Active learners",
      icon: <FaUserGraduate className="h-5 w-5" />,
      color: "bg-green-500",
      trend: "+8%",
    },
    {
      title: "Total Teachers",
      value: stats.totalTeachers || "0",
      description: "Verified educators",
      icon: <FaChalkboardTeacher className="h-5 w-5" />,
      color: "bg-blue-500",
      trend: "+5%",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests || "0",
      description: "Awaiting approval",
      icon: <FaHourglassHalf className="h-5 w-5" />,
      color: "bg-orange-500",
      trend: "Urgent",
    },
    {
      title: "Approved Teachers",
      value: stats.approvedTeachers || "0",
      description: "Active educators",
      icon: <FaUserCheck className="h-5 w-5" />,
      color: "bg-emerald-500",
      trend: "+15%",
    },
    {
      title: "Rejected Teachers",
      value: stats.rejectedTeachers || "0",
      description: "Not approved",
      icon: <FaUserTimes className="h-5 w-5" />,
      color: "bg-rose-500",
      trend: "Review",
    },
  ];

  const requestStats = [
    {
      title: "Total Requests",
      value: stats.totalRequests || "0",
      icon: <FileText className="h-5 w-5" />,
      color: "text-indigo-600",
    },
    {
      title: "Student Requests",
      value: stats.studentRequests || "0",
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-cyan-600",
    },
    {
      title: "Teacher Requests",
      value: stats.teacherRequests || "0",
      icon: <FaChalkboardTeacher className="h-5 w-5" />,
      color: "text-amber-600",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <ClockIcon className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome, Administrator</h1>
        <p className="text-white/90">Here's your platform overview and key metrics</p>
      </div>

      {/* Main Stats Cards - 2x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Request Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {requestStats.map((stat, index) => (
          <Card key={index} className="border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                {stat.icon}
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity - Professional */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
          <CardDescription>Latest teacher approval requests and actions</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : stats.recentActivity?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-full ${activity.role === "teacher" ? "bg-blue-100" : "bg-green-100"}`}>
                    {activity.role === "teacher" ?
                      <FaChalkboardTeacher className="h-5 w-5 text-blue-600" /> :
                      <FaUserGraduate className="h-5 w-5 text-green-600" />
                    }
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">{activity.name || "Unknown User"}</h4>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(activity.status)}
                        <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${activity.status === "approved" ? "bg-green-100 text-green-700" :
                            activity.status === "rejected" ? "bg-red-100 text-red-700" :
                              "bg-yellow-100 text-yellow-700"
                          }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {activity.role} • {activity.email}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      "{activity.message}"
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(activity.time).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Recent Activity</h3>
              <p className="text-gray-500">When users make requests, they'll appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}