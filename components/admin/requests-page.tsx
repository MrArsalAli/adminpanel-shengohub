"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

const requests = [
  {
    id: 1,
    name: "Professor Adams",
    type: "Teacher Request",
    email: "prof.adams@email.com",
    date: "2024-03-15",
    status: "Pending",
  },
  {
    id: 2,
    name: "Lisa Chen",
    type: "Student Request",
    email: "lisa.chen@email.com",
    date: "2024-03-14",
    status: "Pending",
  },
  {
    id: 3,
    name: "Mark Foster",
    type: "Teacher Request",
    email: "mark.foster@email.com",
    date: "2024-03-13",
    status: "Pending",
  },
]

export default function RequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Requests</h1>
        <p className="text-muted-foreground mt-2">Manage teacher and student requests</p>
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
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{request.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{request.type}</td>
                    <td className="py-4 px-4 text-muted-foreground">{request.email}</td>
                    <td className="py-4 px-4 text-muted-foreground">{request.date}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        {request.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-1">
                        <Check className="w-4 h-4" />
                        Accept
                      </Button>
                      <Button size="sm" variant="destructive" className="gap-1">
                        <X className="w-4 h-4" />
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
