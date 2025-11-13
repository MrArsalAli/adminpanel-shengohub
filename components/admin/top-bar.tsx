"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface TopBarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function TopBar({ sidebarOpen, setSidebarOpen }: TopBarProps) {
  return (
    <div className="border-b border-border bg-white px-6 py-4 flex items-center justify-between">
      <div className="hidden md:block">
        <h2 className="text-xl font-semibold text-foreground">Admin Dashboard</h2>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <Button variant="ghost" size="icon" className="text-foreground">
          <Bell className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">John Admin</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-primary text-primary-foreground">JA</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}
