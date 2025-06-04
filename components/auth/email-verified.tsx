"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, X } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "../ui/alert"

export function EmailVerifiedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Email Verified!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert className={`border-zinc-800  text-green-800`}>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="flex items-center justify-between">
                            <span className="font-medium">Email verified successfully! Your account is now active.</span>
                            
                        </AlertDescription>
                    </Alert>

                    <div className="text-center text-sm text-gray-600">
                        <p>Your email address has been successfully verified. You can now access all features of your account.</p>
                    </div>

                    <div className="flex flex-col gap-2 pt-4">
                        <Link href="/login" className="w-full">
                            <Button className="w-full">Continue</Button>
                        </Link>
                        
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
