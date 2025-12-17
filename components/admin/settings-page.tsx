"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, Bell, Shield, Database, Users, Palette, Globe, Mail, Phone, Clock, Lock, Upload, Download, Eye, EyeOff, Server, Cpu } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    platformName: "LearnSphere",
    supportEmail: "support@learnsphere.com",
    supportPhone: "1-800-LEARN-123",
    timezone: "EST",
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      smsAlerts: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90
    }
  })

  const [showPassword, setShowPassword] = useState(false)

  const settingsSections = [
    {
      title: "General Settings",
      description: "Platform configuration and basic info",
      icon: <Globe className="h-5 w-5" />,
      color: "bg-blue-500",
      available: true
    },
    {
      title: "Notifications",
      description: "Email and alert preferences",
      icon: <Bell className="h-5 w-5" />,
      color: "bg-purple-500",
      available: true
    },
    {
      title: "Security",
      description: "Password policies and permissions",
      icon: <Shield className="h-5 w-5" />,
      color: "bg-red-500",
      available: true
    },
    {
      title: "Data Management",
      description: "Backup and data retention",
      icon: <Database className="h-5 w-5" />,
      color: "bg-green-500",
      available: true
    },
    {
      title: "User Roles",
      description: "Admin roles and permissions",
      icon: <Users className="h-5 w-5" />,
      color: "bg-orange-500",
      available: true
    },
    {
      title: "System Status",
      description: "Platform health and monitoring",
      icon: <Server className="h-5 w-5" />,
      color: "bg-indigo-500",
      available: false
    },
  ]

  const handleSave = () => {
    alert("Settings saved successfully!")
  }

  const handleReset = () => {
    setSettings({
      platformName: "LearnSphere",
      supportEmail: "support@learnsphere.com",
      supportPhone: "1-800-LEARN-123",
      timezone: "EST",
      notifications: {
        emailNotifications: true,
        pushNotifications: false,
        smsAlerts: false
      },
      security: {
        twoFactorAuth: true,
        sessionTimeout: 30,
        passwordExpiry: 90
      }
    })
    alert("Settings reset to defaults!")
  }

  return (
    <div className="space-y-6">
      {/* Header Section - Dashboard style */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">System Settings</h1>
        <p className="text-white/90">Configure platform preferences and security options</p>
      </div>

      {/* Settings Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Settings</p>
                <p className="text-2xl font-bold mt-2">5</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500 text-white">
                <Shield className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Security Features</p>
                <p className="text-2xl font-bold mt-2">3</p>
              </div>
              <div className="p-3 rounded-full bg-green-500 text-white">
                <Lock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Users Configured</p>
                <p className="text-2xl font-bold mt-2">4</p>
              </div>
              <div className="p-3 rounded-full bg-purple-500 text-white">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Last Updated</p>
                <p className="text-lg font-bold mt-2">Just now</p>
              </div>
              <div className="p-3 rounded-full bg-orange-500 text-white">
                <Save className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section, index) => (
          <Card
            key={index}
            className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${!section.available ? 'opacity-70' : ''}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${section.color} text-white`}>
                  {section.icon}
                </div>
                {!section.available && (
                  <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <CardTitle className="text-lg font-bold mt-4">{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className={`w-full ${section.available ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300 text-gray-600 hover:bg-gray-400'}`}
                disabled={!section.available}
              >
                {section.available ? 'Configure' : 'Not Available'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Information Card */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Platform Information</CardTitle>
              <CardDescription>Basic platform configuration and settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  Platform Name
                </label>
                <input
                  type="text"
                  value={settings.platformName}
                  onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  Support Phone
                </label>
                <input
                  type="tel"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="CST">CST (Central Standard Time)</option>
                  <option value="MST">MST (Mountain Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Card */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-100">
                <Bell className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Notifications</CardTitle>
                <CardDescription>Email and alert preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive email alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Browser notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.pushNotifications}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, pushNotifications: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Security</CardTitle>
                <CardDescription>Password and authentication settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Require 2FA for admin login</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, twoFactorAuth: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">Session Timeout</p>
                <span className="text-sm font-medium text-gray-700">{settings.security.sessionTimeout} minutes</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={settings.security.sessionTimeout}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 min</span>
                <span>120 min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-gray-300 hover:bg-gray-50"
          >
            Reset to Defaults
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            onClick={handleSave}
          >
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Last saved: Just now
        </div>
      </div>
    </div>
  )
}