"use client"

import React, { useState } from 'react'
import { RiskProfile } from '@/types/types'

import { Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'

type Props = {
    initialData?: RiskProfile
    onComplete: (dto: RiskProfile) => void
    onCancel: () => void
}

const defaultEmptyProfile: RiskProfile = {
    riskType: 'medium',
    score: 0,
    investmentGoals: [],
    timeHorizon: 'medium-term',
    financialSituation: {
        income: 0,
        netWorth: 0,
        investmentExperience: '',
    },
    preferences: {
        assetClasses: [],
        ethicalInvesting: false,
    },
    liquidityNeeds: 0,
    debtLevel: 0,
    taxStatus: 'single',
    description: '',
}

export default function RiskWizard({
    initialData = defaultEmptyProfile,
    onComplete,
    onCancel,
}: Props) {
    const [step, setStep] = useState(0)
    const [data, setData] = useState<RiskProfile>(initialData)
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

    const update = <K extends keyof RiskProfile>(key: K, value: any) =>
        setData((d) => ({ ...d, [key]: value } as any))

    const handleSubmit = () => onComplete(data)

    const steps = [
        // Financial Situation
        <div
        key="financial"
        className={`space-y-4 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        >
        <h3 className="text-xl font-semibold mb-6 text-white/90">
            Financial Situation
        </h3>
        <div className="space-y-4">
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Annual Income
            </label>
            <Input
            className=" border-zinc-800 text-white"
                type="number"
                min={0}
                value={data.financialSituation.income}
                onChange={(e) =>
                setData((d) => ({
                    ...d,
                    financialSituation: {
                    ...d.financialSituation,
                    income: +e.target.value,
                    },
                }))
                }
            />
            </div>
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Net Worth
            </label>
            <Input
            className=" border-zinc-800 text-white"
                type="number"
                min={0}
                value={data.financialSituation.netWorth}
                onChange={(e) =>
                setData((d) => ({
                    ...d,
                    financialSituation: {
                    ...d.financialSituation,
                    netWorth: +e.target.value,
                    },
                }))
                }
            />
            </div>
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Investment Experience
            </label>
            <Select
            value={data.financialSituation.investmentExperience}
            onValueChange={(val) =>
                setData(d => ({
                ...d,
                financialSituation: {
                    ...d.financialSituation,
                    investmentExperience: val,
                },
                }))
            }
            >
            <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
            </Select>

            </div>
        </div>
        </div>,

        // Investment Preferences & Horizon
        <div
        key="preferences"
        className={`space-y-4 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        >
        <h3 className="text-xl font-semibold mb-6 text-white/90">
            Preferences & Horizon
        </h3>
        <div className="space-y-4">
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Time Horizon
            </label>
            <Select
            value={data.timeHorizon}
            onValueChange={val => update('timeHorizon', val)}
            >
            <SelectTrigger>
                <SelectValue placeholder="Select time horizon" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="short-term">Short-term</SelectItem>
                <SelectItem value="medium-term">Medium-term</SelectItem>
                <SelectItem value="long-term">Long-term</SelectItem>
            </SelectContent>
            </Select>

            </div>
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Asset Classes
            </label>
            <Input
            className=" border-zinc-800 text-white"
                type="text"
                placeholder="Enter asset classes, separated by commas"
                value={data.preferences.assetClasses.join(',')}
                onChange={(e) =>
                setData((d) => ({
                    ...d,
                    preferences: {
                    ...d.preferences,
                    assetClasses: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    },
                }))
                }
            />
            </div>
            <div className="flex items-center space-x-3">
            <Checkbox
                checked={data.preferences.ethicalInvesting}
                onCheckedChange={(checked) =>
                setData((d) => ({
                    ...d,
                    preferences: {
                    ...d.preferences,
                    ethicalInvesting: !!checked,
                    },
                }))
                }
            />
            <label className="text-sm font-medium text-white/80">
                Ethical Investing
            </label>
            </div>
        </div>
        </div>,

        // Risk Type, Score & Goals
        <div
        key="risk-details"
        className={`space-y-4 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        >
        <h3 className="text-xl font-semibold mb-6 text-white/90">
            Risk Profile & Goals
        </h3>
        <div className="space-y-4">
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Risk Type
            </label>
            <Select
                value={data.riskType}
                onValueChange={val => update('riskType', val)}
                >
                <SelectTrigger>
                    <SelectValue placeholder="Select risk type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                </SelectContent>
                </Select>

            </div>
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Preliminary Score (0–100)
            </label>
            <Input
            className=" border-zinc-800 text-white"
                type="number"
                min={0}
                max={100}
                value={data.score}
                onChange={(e) => update('score', +e.target.value)}
            />
            </div>
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Investment Goals
            </label>
            <Input
            className=" border-zinc-800 text-white"
                type="text"
                placeholder="Enter goals, separated by commas"
                value={data.investmentGoals.join(',')}
                onChange={(e) =>
                update(
                    'investmentGoals',
                    e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
                }
            />
            </div>
        </div>
        </div>,

        // Liquidity, Debt, Tax & Notes
        <div
        key="liquidity"
        className={`space-y-4 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        >
        <h3 className="text-xl font-semibold mb-6 text-white/90">
            Liquidity, Debt & Tax
        </h3>
        <div className="space-y-4">
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Liquidity Needs (%)
            </label>
            <Input
            className=" border-zinc-800 text-white"
                type="number"
                min={0}
                max={100}
                value={data.liquidityNeeds}
                onChange={(e) => update('liquidityNeeds', +e.target.value)}
            />
            </div>
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Debt Level (%)
            </label>
            <Input
            className=" border-zinc-800 text-white"
                type="number"
                min={0}
                max={100}
                value={data.debtLevel}
                onChange={(e) => update('debtLevel', +e.target.value)}
            />
            </div>
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Tax Status
            </label>
            <Select
            value={data.taxStatus}
            onValueChange={val => update('taxStatus', val)}
            >
            <SelectTrigger>
                <SelectValue placeholder="Select tax status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="joint">Joint</SelectItem>
            </SelectContent>
            </Select>

            </div>
            <div className="group">
            <label className="block text-sm font-medium mb-2 text-white/80">
                Additional Notes
            </label>
            <Textarea
                className='border-zinc-800 text-white'
                value={data.description || ''}
                onChange={(e) => update('description', e.target.value)}
                rows={4}
            />
            </div>
        </div>
        </div>,
    ]

    return (
        <Card className="bg-white/5 border-0 shadow-lg backdrop-blur-sm">
        <CardHeader className="border-b border-white/10">
            <CardTitle className="text-2xl">Risk Assessment Wizard</CardTitle>
            <div className="flex gap-1 mt-4">
            {steps.map((_, i) => (
                <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    i === step
                    ? 'bg-emerald-900'
                    : i < step
                    ? 'bg-white/20'
                    : 'bg-white/5'
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
            disabled={isTransitioning}
            className="min-w-[100px] bg-emerald-900 hover:bg-emerald-800"
            >
            {isTransitioning ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : step < steps.length - 1 ? (
                'Next'
            ) : (
                'Complete'
            )}
            </Button>
        </CardFooter>
        </Card>
    )
}
