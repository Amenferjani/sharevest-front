"use client"

import { useMemo } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, AlertTriangle, Shield } from "lucide-react"

interface SuggestedProfileChangeProps {
  data: string 
}

export default function SuggestedProfileChange({
    data: suggestionMessage
}: SuggestedProfileChangeProps) {
  // derive booleans from the passed-in message:
  const isAdjustmentNeeded = suggestionMessage.startsWith("Consider adjusting")
  const isAppropriate = suggestionMessage.startsWith("Your risk profile seems appropriate")
  const suggestedRiskType = isAdjustmentNeeded
    ? suggestionMessage.includes("High")
      ? "High"
      : "Low"
    : null

  if (!suggestionMessage) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">Suggested Profile Change</CardTitle>
          <CardDescription className="text-zinc-400">
            Recommendations based on your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-zinc-100">Suggested Profile Change</CardTitle>

      </CardHeader>
      <CardContent className="space-y-6">
        {/* Message box */}
        <div
          className={`flex items-start gap-4 p-4 rounded-lg ${
            isAppropriate
              ? "bg-green-900 border border-green-700"
              : "bg-amber-900 border border-amber-700"
          }`}
        >
          {isAppropriate ? (
            <Shield className="h-6 w-6 text-green-400" />
          ) : (
            <AlertTriangle className="h-6 w-6 text-amber-400" />
          )}
          <div className="bg-transparent">
            <h3
              className={`text-lg font-semibold ${
                isAppropriate ? "text-green-200" : "text-amber-200"
              }`}
            >
              {isAppropriate ? "Profile Status: Optimal" : "Adjustment Recommended"}
            </h3>
            <p className="mt-1 text-zinc-300">{suggestionMessage}</p>
          </div>
        </div>

        {/* Recommended action */}
        {isAdjustmentNeeded && suggestedRiskType && (
          <div className="bg-indigo-900 border border-indigo-700 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-indigo-200">Recommended Action</h4>
            <p className="mt-1 text-zinc-300">
              Switch to <span className="font-semibold text-indigo-100">{suggestedRiskType}</span>{" "}
              risk profile to better align with your portfolio.
            </p>
          </div>
        )}

        {/* CTA */}
        <Button
          className={`w-full ${
            isAppropriate
              ? "bg-zinc-800 hover:bg-zinc-700"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
          variant="default"
          disabled={isAppropriate}
        >
          {isAppropriate ? "No Changes Needed" : "Apply Suggested Profile"}
        </Button>
      </CardContent>
    </Card>
  )
}
