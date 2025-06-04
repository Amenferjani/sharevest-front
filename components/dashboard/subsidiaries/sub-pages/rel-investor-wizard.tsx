"use client"

import React, { useState } from "react"
import { Investor } from "@/types/types"
import { Loader2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type Props = {
    initialData?: Investor
    onComplete: (dto: Investor) => void
    onCancel: () => void
}

const emptyInvestor: Investor = {
    name: '',
    email: '',
    phoneNumber: '',
    investmentInterest: '',
    status: 'active',
}

export default function RelInvestorWizard({
    
    onComplete,
    onCancel,
}: Props) {
    const [step, setStep] = useState(0)
    const [data, setData] = useState<Investor>(emptyInvestor)
    const [isTransitioning, setIsTransitioning] = useState(false)


    const next = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            setStep((s) => Math.min(s + 1, steps.length - 1))
            setIsTransitioning(false)
        }, 300)
    }

    const back = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            setStep((s) => Math.max(s - 1, 0))
            setIsTransitioning(false)
        }, 300)
    }

    const update = <K extends keyof Investor>(key: K, value: Investor[K]) =>
        setData((prev) => ({ ...prev, [key]: value }))

    const handleSubmit = () => onComplete(data)

    const steps = [
        // Step 1: Basic Info
        <div key="basic" className={`space-y-4 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
            <h3 className="text-xl font-semibold mb-6 text-white/90">Investor Information</h3>
            <div className="space-y-4">
                <div>
                    <label className="text-white/80 text-sm mb-2 block">Full Name</label>
                    <Input required value={data.name || ""} onChange={(e) => update("name", e.target.value)} />
                </div>
                <div>
                    <label className="text-white/80 text-sm mb-2 block">Email</label>
                    <Input id="email"
                        type="email"
                        placeholder="name@example.com" required value={data.email || ""} onChange={(e) => update("email", e.target.value)} />
                </div>
                <div>
                    <label className="text-white/80 text-sm mb-2 block">Phone Number</label>
                    <Input required value={data.phoneNumber || ""} onChange={(e) => update("phoneNumber", e.target.value)} />
                </div>
            </div>
        </div>,

        // Step 2: Interest & Status
        <div key="status" className={`space-y-4 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
            <h3 className="text-xl font-semibold mb-6 text-white/90">Investment Details</h3>
            <div className="space-y-4">
                <div>
                    <label className="text-white/80 text-sm mb-2 block">Investment Interest</label>
                    <Textarea
                        value={data.investmentInterest || ""}
                        onChange={(e) => update("investmentInterest", e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-white/80 text-sm mb-2 block">Status</label>
                    <Select
                        value={data.status || "active"}
                        onValueChange={(val) => update("status", val as "active" | "inactive")}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>,
    ]

    const isFormValid = data.name && data.email && data.phoneNumber

    return (
        <Card className="bg-white/5 border-0 shadow-lg backdrop-blur-sm">
            <CardHeader className="border-b border-white/10">
                <CardTitle className="text-2xl">Investor Setup Wizard</CardTitle>
                <div className="flex gap-1 mt-4">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i === step ? "bg-emerald-900" : i < step ? "bg-white/20" : "bg-white/5"
                                }`}
                        />
                    ))}
                </div>
            </CardHeader>

            <CardContent className="p-6">{steps[step]}</CardContent>

            <CardFooter className="flex justify-between border-t border-white/10 p-6">
                <div className="flex gap-3">
                    {step > 0 && (
                        <Button
                            variant="outline"
                            onClick={back}
                            disabled={isTransitioning}
                            className="min-w-[100px] hover:bg-white/10"
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={isTransitioning}
                        className="min-w-[100px] hover:bg-white/10"
                    >
                        Cancel
                    </Button>
                </div>
                <Button
                    onClick={step < steps.length - 1 ? next : handleSubmit}
                    disabled={isTransitioning || (!isFormValid)}
                    className="min-w-[100px] bg-emerald-900 hover:bg-emerald-800"
                >
                    {isTransitioning ? <Loader2 className="w-4 h-4 animate-spin" /> : step < steps.length - 1 ? "Next" : "Complete"}
                </Button>
            </CardFooter>
        </Card>
    )
}
