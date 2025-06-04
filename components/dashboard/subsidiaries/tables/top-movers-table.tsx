import { useState } from "react"

import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";


// define this somewhere like src/data/staticTopMovers.ts
export type Ticker = {
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
};

export type TopMovers = {
    top_gainers: Ticker[];
    top_losers: Ticker[];
    most_actively_traded: Ticker[];
};

export const staticTopMovers: TopMovers = {
    top_gainers: [
        {
        ticker: "AAPL",
        price: "172.15",
        change_amount: "3.65",
        change_percentage: "+2.17%",
        volume: "58,000,000"
        },
        {
        ticker: "MSFT",
        price: "315.40",
        change_amount: "6.10",
        change_percentage: "+1.97%",
        volume: "28,500,000"
        },
        {
        ticker: "GOOG",
        price: "2,840.00",
        change_amount: "40.00",
        change_percentage: "+1.43%",
        volume: "1,100,000"
        },
        {
        ticker: "AMZN",
        price: "3,510.25",
        change_amount: "45.75",
        change_percentage: "+1.32%",
        volume: "4,200,000"
        }
    ],
    top_losers: [
        {
        ticker: "TSLA",
        price: "610.00",
        change_amount: "-15.00",
        change_percentage: "-2.40%",
        volume: "22,000,000"
        },
        {
        ticker: "NFLX",
        price: "495.00",
        change_amount: "-8.50",
        change_percentage: "-1.69%",
        volume: "5,500,000"
        },
        {
        ticker: "META",
        price: "340.50",
        change_amount: "-5.00",
        change_percentage: "-1.45%",
        volume: "14,000,000"
        },
        {
        ticker: "NVDA",
        price: "220.75",
        change_amount: "-2.25",
        change_percentage: "-1.01%",
        volume: "16,500,000"
        }
    ],
    most_actively_traded: [
        {
        ticker: "SPY",
        price: "424.00",
        change_amount: "1.20",
        change_percentage: "+0.28%",
        volume: "150,000,000"
        },
        {
        ticker: "AAPL",
        price: "172.15",
        change_amount: "3.65",
        change_percentage: "+2.17%",
        volume: "58,000,000"
        },
        {
        ticker: "TSLA",
        price: "610.00",
        change_amount: "-15.00",
        change_percentage: "-2.40%",
        volume: "22,000,000"
        },
        {
        ticker: "AMD",
        price: "104.00",
        change_amount: "1.50",
        change_percentage: "+1.47%",
        volume: "30,000,000"
        }
    ]
};


export default function TopMoversTable({
  topMovers ,            // default here
}: {
  topMovers?: any;                  // make it optional
    }) {
    const data: TopMovers = {
        top_gainers:           topMovers?.top_gainers           ?? staticTopMovers.top_gainers,
        top_losers:            topMovers?.top_losers            ?? staticTopMovers.top_losers,
        most_actively_traded:  topMovers?.most_actively_traded  ?? staticTopMovers.most_actively_traded,
    };
    const [activeTab, setActiveTab] = useState<keyof TopMovers>('top_gainers');

    const tabs: { key: keyof TopMovers; label: string }[] = [
        { key: 'top_gainers', label: 'Gainers' },
        { key: 'top_losers', label: 'Losers' },
        { key: 'most_actively_traded', label: 'Most Active' },
    ];

    const movers = data[activeTab] || [];

    return (
            <div className="bg-zinc-900/50 rounded-lg p-4 backdrop-blur-sm">
        {/* Tab navigation */}
        <div className="flex space-x-2 mb-6 border-b border-zinc-800">
            {tabs.map(tab => (
            <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                "px-4 py-2 text-sm font-medium transition-all relative",
                activeTab === tab.key
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-100"
                )}
            >
                {tab.label}
                {activeTab === tab.key && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                )}
            </button>
            ))}
        </div>

        {/* Stocks list with scroll area */}
        <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-3">
            {movers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-zinc-400">
                <TrendingDown className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No market data available</p>
                </div>
            ) : (
                movers.map((stock, index) => (
                <motion.div
                    key={stock.ticker}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 rounded hover:bg-zinc-800/50 transition-colors group"
                >
                    <div className="flex items-center space-x-2">
                    <span className="font-medium group-hover:text-white transition-colors">
                        {stock.ticker}
                    </span>
                    </div>
                    <div className="flex items-center space-x-2">
                    <span
                        className={cn(
                        "font-medium text-sm flex items-center",
                        stock.change_percentage.startsWith('+')
                            ? "text-emerald-500"
                            : "text-red-500"
                        )}
                    >
                        {stock.change_percentage}
                        {stock.change_percentage.startsWith('+') ? (
                        <TrendingUp className="h-3 w-3 ml-1" />
                        ) : (
                        <TrendingDown className="h-3 w-3 ml-1" />
                        )}
                    </span>
                    </div>
                </motion.div>
                ))
            )}
            </div>
        </ScrollArea>
        </div>
  );
}

