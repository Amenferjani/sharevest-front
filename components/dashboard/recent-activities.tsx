"use client"

import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"

interface Activity {
  id: string
  type: "deposit" | "withdrawal" | "allocation" | "dividend"
  description: string
  amount?: string
  date: string // real ISO date
  status: "completed" | "pending" | "failed"
}

const activities: Activity[] = [
  {
    id: "1",
    type: "deposit",
    description: "Deposit to AssetVest",
    amount: "+$50,000.00",
    date: "2025-04-17T09:00:00Z",
    status: "completed",
  },
  {
    id: "2",
    type: "allocation",
    description: "Reallocation from HedgeVest to RiskVest",
    amount: "$25,000.00",
    date: "2025-04-16T15:00:00Z",
    status: "completed",
  },
  {
    id: "3",
    type: "dividend",
    description: "Dividend payment from QuantumVest",
    amount: "+$1,250.00",
    date: "2025-04-15T12:00:00Z",
    status: "completed",
  },
  {
    id: "4",
    type: "withdrawal",
    description: "Withdrawal request",
    amount: "-$10,000.00",
    date: "2025-04-14T11:00:00Z",
    status: "pending",
  },
  {
    id: "5",
    type: "allocation",
    description: "New investment in PrivateVest",
    amount: "$75,000.00",
    date: "2025-04-13T08:00:00Z",
    status: "completed",
  },
]

activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4 py-2">
          <div
            className={`p-2 rounded-full ${
              activity.type === "deposit" || activity.type === "dividend"
                ? "bg-emerald-100 text-emerald-600"
                : activity.type === "withdrawal"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {activity.type === "deposit" || activity.type === "dividend" ? (
              <ArrowDownLeft className="h-4 w-4" />
            ) : activity.type === "withdrawal" ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <Clock className="h-4 w-4" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{activity.description}</p>
              {activity.amount && (
                <span
                  className={`text-sm font-medium ${
                    activity.type === "deposit" || activity.type === "dividend"
                      ? "text-emerald-600"
                      : activity.type === "withdrawal"
                      ? "text-red-600"
                      : "text-gray-900"
                  }`}
                >
                  {activity.amount}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{new Date(activity.date).toLocaleString()}</span>
              <span
                className={`px-2 py-0.5 rounded-full ${
                  activity.status === "completed"
                    ? "bg-emerald-100 text-emerald-800"
                    : activity.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {activity.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
