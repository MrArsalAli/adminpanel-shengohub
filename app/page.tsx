"use client"

import { useState } from "react"
import Sidebar from "@/components/admin/sidebar"
import TopBar from "@/components/admin/top-bar"
import Dashboard from "@/components/admin/dashboard"
import TeachersPage from "@/components/admin/teachers-page"
import StudentsPage from "@/components/admin/students-page"
import RequestsPage from "@/components/admin/requests-page"
// import CoursesPage from "@/components/admin/courses-page"
import PaymentsPage from "@/components/admin/payments-page"
import ReportsPage from "@/components/admin/reports-page"
import SettingsPage from "@/components/admin/settings-page"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "teachers":
        return <TeachersPage />
      case "students":
        return <StudentsPage />
      case "requests":
        return <RequestsPage />
      // case "courses":
      //   return <CoursesPage />
      case "payments":
        return <PaymentsPage />
      case "reports":
        return <ReportsPage />
      case "settings":
        return <SettingsPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
