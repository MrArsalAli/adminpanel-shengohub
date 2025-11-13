"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, Bell, Shield, Database, Users, Palette } from "lucide-react"

export default function SettingsPage() {
  const settingsSections = [
    { title: "General Settings", description: "Platform name and basic configuration", icon: Palette },
    { title: "Notifications", description: "Email and alert preferences", icon: Bell },
    { title: "Security", description: "Password policies and user permissions", icon: Shield },
    { title: "Data Management", description: "Backup and data retention settings", icon: Database },
    { title: "User Roles", description: "Manage admin roles and permissions", icon: Users },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Configure system preferences and options</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {settingsSections.map((section, index) => {
          const Icon = section.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-primary" />
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {/* Platform Info */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Platform Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Platform Name</label>
              <input
                type="text"
                value="LearnSphere"
                className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Support Email</label>
              <input
                type="email"
                value="support@learnsphere.com"
                className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Support Phone</label>
              <input
                type="tel"
                value="1-800-LEARN-123"
                className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Timezone</label>
              <select className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>EST (Eastern Standard Time)</option>
                <option>CST (Central Standard Time)</option>
                <option>MST (Mountain Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
