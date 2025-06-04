import { RiskLevel } from "@/types/types";

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: amount >= 1000000 ? "compact" : "standard",
        compactDisplay: "short",
    }).format(amount);
};

export const formatPercentage = (value: number): string => {
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const getRiskColor = (riskLevel: RiskLevel): string => {
    switch (riskLevel) {
        case "low":
            return "text-green-600";
        case "medium":
            return "text-yellow-600";
        case "high":
            return "text-orange-600";
        case "very-high":
            return "text-red-600";
        default:
            return "text-gray-600";
    }
};

export const getPerformanceColor = (value: number): string => {
    if (value > 15) return "text-green-600";
    if (value > 5) return "text-blue-600";
    if (value > 0) return "text-gray-600";
    return "text-red-600";
};