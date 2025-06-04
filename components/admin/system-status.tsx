import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface SystemMetric {
  name: string
  status: "operational" | "degraded" | "outage"
  performance: number
}

const metrics: SystemMetric[] = [
  {
    name: "API Services",
    status: "operational",
    performance: 98,
  },
  {
    name: "Database Cluster",
    status: "operational",
    performance: 95,
  },
  {
    name: "Authentication",
    status: "operational",
    performance: 99,
  },
  {
    name: "Payment Processing",
    status: "degraded",
    performance: 85,
  },
  {
    name: "File Storage",
    status: "operational",
    performance: 97,
  },
]

export default function SystemStatus() {
  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{metric.name}</span>
            <div className="flex items-center">
              {metric.status === "operational" && <CheckCircle className="h-4 w-4 text-emerald-500 mr-1" />}
              {metric.status === "degraded" && <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />}
              {metric.status === "outage" && <XCircle className="h-4 w-4 text-red-500 mr-1" />}
              <span
                className={`text-xs font-medium ${
                  metric.status === "operational"
                    ? "text-emerald-500"
                    : metric.status === "degraded"
                      ? "text-amber-500"
                      : "text-red-500"
                }`}
              >
                {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
              </span>
            </div>
          </div>
          <Progress value={metric.performance} className="h-2" />
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Performance</span>
            <span>{metric.performance}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}
