/** @format */

"use client";
import React, { useState, useEffect } from "react";
import { AlertType, ConditionType, MarketAlert } from "@/types/types";
import { Loader2, X } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

type Props = {
    initialData?: MarketAlert;
    onComplete: (dto: MarketAlert) => void;
    onCancel: () => void;
};

type FormData = {
    alertType: AlertType;
    condition: ConditionType;
    threshold: string;
    thresholdMin: string;
    thresholdMax: string;
    assetSymbol: string;
    sector: string;
    portfolioId: string;
    campaignId: string;
    market: string;
    message: string;
    notificationChannel: "email" | "sms" | "in-app";
    alertFrequency: "immediate" | "daily" | "weekly";
};

const defaultEmptyForm: FormData = {
    alertType: AlertType.RiskThreshold,
    condition: ConditionType.LessThan,
    threshold: "",
    thresholdMin: "",
    thresholdMax: "",
    assetSymbol: "",
    sector: "",
    portfolioId: "",
    campaignId: "",
    market: "",
    message: "",
    notificationChannel: "email",
    alertFrequency: "immediate",
};

export default function AlertWizard({
    initialData,
    onComplete,
    onCancel,
}: Props) {
    const [step, setStep] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [form, setForm] = useState<FormData>(defaultEmptyForm);

    useEffect(() => {
        if (!initialData) return;
        const t = initialData.threshold;
        setForm({
            alertType: initialData.alertType,
            condition: initialData.condition ?? ConditionType.LessThan,
            threshold: typeof t === "number" ? String(t) : "",
            thresholdMin: Array.isArray(t) ? String(t[0]) : "",
            thresholdMax: Array.isArray(t) ? String(t[1]) : "",
            assetSymbol: initialData.assetSymbol ?? "",
            sector: initialData.sector ?? "",
            portfolioId: initialData.portfolioId ?? "",
            campaignId: initialData.campaignId ?? "",
            market: initialData.market ?? "",
            message: initialData.message ?? "",
            notificationChannel: initialData.notificationChannel,
            alertFrequency: initialData.alertFrequency as
                | "immediate"
                | "daily"
                | "weekly",
        });
    }, [initialData]);

    const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
        setForm((f) => ({ ...f, [key]: value }));

    const isRangeCondition =
        form.condition === ConditionType.InRange ||
        form.condition === ConditionType.OutOfRange;
    const isFundingProgress = form.alertType === AlertType.FundingProgress;
    const isVolatility = form.alertType === AlertType.VolatilitySpike;

    const next = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setStep((s) => Math.min(s + 1, steps.length - 1));
            setIsTransitioning(false);
        }, 300);
    };
    const back = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setStep((s) => Math.max(s - 1, 0));
            setIsTransitioning(false);
        }, 300);
    };

    const handleSubmit = () => {
        if (isRangeCondition) {
            if (!form.thresholdMin || !form.thresholdMax) {
                alert("Please fill both min and max thresholds.");
                return;
            }
        } else if (!form.threshold) {
            alert("Please fill the threshold.");
            return;
        }

        if (isVolatility) {
            if (!form.assetSymbol && !form.sector && !form.market) {
                alert(
                    "Please fill exactly one of Asset, Sector, or Market for volatility."
                );
                return;
            }
        } else if (isFundingProgress) {
            if (!form.campaignId) {
                alert("Campaign ID is required for funding-progress alerts.");
                return;
            }
        } else if (
            form.alertType === AlertType.RiskThreshold &&
            !form.portfolioId
        ) {
            alert("Portfolio ID is required for risk-threshold alerts.");
            return;
        } else if (
            (form.alertType === AlertType.PriceIncrease ||
                form.alertType === AlertType.PriceDecrease) &&
            !form.assetSymbol
        ) {
            alert("Asset Symbol is required for price alerts.");
            return;
        } else if (form.alertType === AlertType.MarketDrop && !form.market) {
            alert("Market is required for market-drop alerts.");
            return;
        }

        const payload: MarketAlert = {
            ...(initialData ?? ({} as any)),
            alertType: form.alertType,
            condition: form.condition,
            threshold: isRangeCondition
                ? [parseFloat(form.thresholdMin), parseFloat(form.thresholdMax)]
                : parseFloat(form.threshold),
            assetSymbol: form.assetSymbol || null,
            sector: form.sector || null,
            portfolioId: form.portfolioId || null,
            campaignId: form.campaignId || null,
            market: form.market || null,
            message: form.message,
            notificationChannel: form.notificationChannel,
            alertFrequency: form.alertFrequency,
            isActive: initialData?.isActive ?? true,
            createdAt: initialData?.createdAt ?? new Date(),
            lastTriggeredAt: initialData?.lastTriggeredAt ?? null,
            isManual: initialData?.isManual ?? false,
            triggeredBy: initialData?.triggeredBy ?? null,
            userId: initialData?.userId ?? "",
        };

        onComplete(payload);
    };

    const steps = [
        // Step 1: Type & Condition
        <div
            key='type'
            className={`space-y-4 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}>
            <h3 className='text-xl font-semibold'>1. Choose Alert Type</h3>
            <div className='space-y-2'>
                <Label>Alert Type</Label>
                <Select
                    value={form.alertType}
                    onValueChange={(v: AlertType) => update("alertType", v)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(AlertType).map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='space-y-2'>
                <Label>Condition</Label>
                <Select
                    value={form.condition}
                    onValueChange={(v: ConditionType) => update("condition", v)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(ConditionType).map((cond) => (
                            <SelectItem key={cond} value={cond}>
                                {cond}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>,

        // Step 2: Threshold
        <div
            key='threshold'
            className={`space-y-4 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}>
            <h3 className='text-xl font-semibold'>2. Set Threshold</h3>
            {isRangeCondition ? (
                <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                        <Label>Min Threshold</Label>
                        <Input
                            type='number'
                            value={form.thresholdMin}
                            onChange={(e) => update("thresholdMin", e.target.value)}
                            required
                        />
                    </div>
                    <div className='space-y-1'>
                        <Label>Max Threshold</Label>
                        <Input
                            type='number'
                            value={form.thresholdMax}
                            onChange={(e) => update("thresholdMax", e.target.value)}
                            required
                        />
                    </div>
                </div>
            ) : (
                <div className='space-y-2'>
                    <Label>Threshold</Label>
                    <Input
                        type='number'
                        value={form.threshold}
                        onChange={(e) => update("threshold", e.target.value)}
                        required
                    />
                </div>
            )}
        </div>,

        // Step 3: Targets (updated for all combinations)
        <div
            key='targets'
            className={`space-y-4 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}>
            <h3 className='text-xl font-semibold'>3. Select Targets</h3>

            {/* FundingProgress */}
            {isFundingProgress && (
                <div className='space-y-2'>
                    <Label>Campaign ID</Label>
                    <Input
                        placeholder='campaign_123'
                        value={form.campaignId}
                        onChange={(e) => update("campaignId", e.target.value)}
                        required
                    />
                </div>
            )}

            {/* VolatilitySpike */}
            {isVolatility && (
                <div className='grid grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                        <Label>Asset Symbol</Label>
                        <Input
                            placeholder='e.g. AAPL'
                            value={form.assetSymbol}
                            onChange={(e) => update("assetSymbol", e.target.value)}
                            disabled={!!form.sector || !!form.market}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Sector</Label>
                        <Input
                            placeholder='e.g. Technology'
                            value={form.sector}
                            onChange={(e) => update("sector", e.target.value)}
                            disabled={!!form.assetSymbol || !!form.market}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Market</Label>
                        <Input
                            placeholder='e.g. S&P 500'
                            value={form.market}
                            onChange={(e) => update("market", e.target.value)}
                            disabled={!!form.assetSymbol || !!form.sector}
                        />
                    </div>
                </div>
            )}

            {/* RiskThreshold */}
            {form.alertType === AlertType.RiskThreshold && (
                <div className='space-y-2'>
                    <Label>Portfolio ID</Label>
                    <Input
                        placeholder='portfolio_456'
                        value={form.portfolioId}
                        onChange={(e) => update("portfolioId", e.target.value)}
                        required
                    />
                </div>
            )}

            {/* MarketDrop */}
            {form.alertType === AlertType.MarketDrop && (
                <div className='space-y-2'>
                    <Label>Market</Label>
                    <Input
                        placeholder='e.g. S&P 500'
                        value={form.market}
                        onChange={(e) => update("market", e.target.value)}
                        required
                    />
                </div>
            )}

            {/* Price Increase / Decrease */}
            {(form.alertType === AlertType.PriceIncrease ||
                form.alertType === AlertType.PriceDecrease) && (
                    <div className='space-y-2'>
                        <Label>Asset Symbol</Label>
                        <Input
                            placeholder='e.g. AAPL'
                            value={form.assetSymbol}
                            onChange={(e) => update("assetSymbol", e.target.value)}
                            required
                        />
                    </div>
                )}
        </div>,

        // Step 4: Message & Notifications
        <div
            key='notify'
            className={`space-y-4 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}>
            <h3 className='text-xl font-semibold'>4. Message & Notifications</h3>
            <div className='space-y-2'>
                <Label>Message</Label>
                <Textarea
                    placeholder='Alert message...'
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={2}
                />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                    <Label>Channel</Label>
                    <Select
                        value={form.notificationChannel}
                        onValueChange={(v) =>
                            update("notificationChannel", v as "email" | "sms" | "in-app")
                        }>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='email'>Email</SelectItem>
                            <SelectItem value='sms'>SMS</SelectItem>
                            <SelectItem value='in-app'>In-App</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='space-y-2'>
                    <Label>Frequency</Label>
                    <Select
                        value={form.alertFrequency}
                        onValueChange={(v) =>
                            update("alertFrequency", v as "immediate" | "daily" | "weekly")
                        }>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='immediate'>Immediate</SelectItem>
                            <SelectItem value='daily'>Daily</SelectItem>
                            <SelectItem value='weekly'>Weekly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>,
    ];

    return (
        <Card className='bg-white/5 border-0 shadow-lg backdrop-blur-sm'>
            <CardHeader className='border-b border-white/10'>
                <CardTitle className='text-2xl'>Alert Wizard</CardTitle>
                <button
                    onClick={onCancel}
                    className='absolute top-4 right-4 text-white/70 hover:text-white'>
                    <X className='w-5 h-5' />
                </button>
                <div className='flex gap-1 mt-4'>
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i === step
                                    ? "bg-emerald-900"
                                    : i < step
                                        ? "bg-white/20"
                                        : "bg-white/5"
                                }`}
                        />
                    ))}
                </div>
            </CardHeader>

            <CardContent className='p-6'>{steps[step]}</CardContent>

            <CardFooter className='flex justify-between border-t border-white/10 p-6'>
                <div className='flex gap-3'>
                    {step > 0 && (
                        <Button
                            variant='outline'
                            onClick={back}
                            disabled={isTransitioning}
                            className='min-w-[100px] hover:bg-white/10'>
                            Back
                        </Button>
                    )}
                    <Button
                        variant='outline'
                        onClick={onCancel}
                        disabled={isTransitioning}
                        className='min-w-[100px] hover:bg-white/10'>
                        Cancel
                    </Button>
                </div>
                <Button
                    onClick={step < steps.length - 1 ? next : handleSubmit}
                    disabled={isTransitioning}
                    className='min-w-[100px] bg-emerald-900 hover:bg-emerald-800'>
                    {isTransitioning ? (
                        <Loader2 className='w-4 h-4 animate-spin' />
                    ) : step < steps.length - 1 ? (
                        "Next"
                    ) : (
                        "Complete"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
