"use client"

import { XCircle, ArrowLeft, RefreshCw, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useState } from "react"


export function EmailVerificationFailedPage() {
    const [isRetrying, setIsRetrying] = useState(false)
    const [retrySuccess, setRetrySuccess] = useState(false)

    const handleRetryVerification = async () => {
        setIsRetrying(true)
        try {
            // Simulate API call to resend verification email
            await new Promise((resolve) => setTimeout(resolve, 2000))
            setRetrySuccess(true)
        } catch (error) {
            console.error("Failed to resend verification email:", error)
        } finally {
            setIsRetrying(false)
        }
    }


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                {/* Main Error Card */}
                <Card className="border-zinc-800">
                    <CardHeader className="text-center pb-4">
                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <XCircle className="h-8 w-8 text-red-600" />
                        </div>
                        <CardTitle className="text-xl text-red-800">Email Verification Failed</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <h3 className="font-medium mb-2">Common Issues:</h3>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Verification link may have expired (valid for 1 hour)</li>
                                <li>• Check your spam/junk folder for the email</li>
                                <li>• Make sure you're using the latest verification email</li>
                                <li>• Try copying and pasting the link directly</li>
                            </ul>

                            <div className="grid grid-cols-1 gap-3">
                                <Link href="/login">
                                    <Button variant="outline" className="w-full">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Go Back
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Help Text */}
                        <div className="text-center pt-4 border-t">
                            <p className="text-sm text-muted-foreground">
                                Still having trouble?{" "}
                                <Link href="/support" className="text-red-600 hover:text-red-700 font-medium">
                                    Contact Support
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
