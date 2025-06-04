import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDownAZ, ArrowUpAZ, ArrowUp01, ArrowDown01, TrendingUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SectorPerformance {
    name: string;
    change: number;
}

type SortOrder = "nameAsc" | "nameDesc" | "changeAsc" | "changeDesc";

export default function SectorPerformance({ sectorPerformanceData }: { sectorPerformanceData: SectorPerformance[] }) {
    const sectorsPerformanceBackUp = [
        { name: "Technology", change: 1.8 },
        { name: "Energy", change: -0.7 },
        { name: "Financials", change: 0.5 },
        { name: "Healthcare", change: 1.2 },
        { name: "Consumer", change: -0.3 },
        { name: "Industrials", change: 0.9 },
    ];

    const [sortOrder, setSortOrder] = useState<SortOrder>("changeDesc");
    const sectors = sectorPerformanceData.length > 0 ? sectorPerformanceData : sectorsPerformanceBackUp;
    
    // Find top and bottom performers
    const topPerformer = sectors.reduce((prev, current) => 
        (current.change > prev.change) ? current : prev
    );
    
    const bottomPerformer = sectors.reduce((prev, current) => 
        (current.change < prev.change) ? current : prev
    );

    // Sort sectors based on current sort order
    const sortedSectors = [...sectors].sort((a, b) => {
        switch (sortOrder) {
        case "nameAsc":
            return a.name.localeCompare(b.name);
        case "nameDesc":
            return b.name.localeCompare(a.name);
        case "changeAsc":
            return a.change - b.change;
        case "changeDesc":
            return b.change - a.change;
        default:
            return 0;
        }
    });

    const handleSort = (order: SortOrder) => {
        setSortOrder(order);
    };

    return (
        <Card className="border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 overflow-hidden">
        {/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-zinc-800/50">
            <TrendingUp className="h-4 w-4 text-zinc-400" />
        </CardHeader> */}
        
        <div className="flex items-center justify-between px-6 py-2 bg-zinc-950/50 border-b border-zinc-800/50">
            <div className="flex items-center gap-1 bg-transparent text-xs text-zinc-400">
            <span>Sort by:</span>
            </div>
            <div className="flex items-center gap-1">
            <button 
                onClick={() => handleSort("nameAsc")}
                className={cn(
                "p-1 rounded hover:bg-zinc-800 transition-colors", 
                sortOrder === "nameAsc" && "bg-zinc-800 text-white"
                )}
                title="Sort by name A-Z"
            >
                <ArrowDownAZ className="h-3.5 w-3.5" />
            </button>
            <button 
                onClick={() => handleSort("nameDesc")}
                className={cn(
                "p-1 rounded hover:bg-zinc-800 transition-colors", 
                sortOrder === "nameDesc" && "bg-zinc-800 text-white"
                )}
                title="Sort by name Z-A"
            >
                <ArrowUpAZ className="h-3.5 w-3.5" />
            </button>
            <button 
                onClick={() => handleSort("changeDesc")}
                className={cn(
                "p-1 rounded hover:bg-green-800 transition-colors", 
                sortOrder === "changeDesc" && "bg-green-800 text-white"
                )}
                title="Sort by highest performance"
            >
                <ArrowUp01 className="h-3.5 w-3.5" />
            </button>
            <button 
                onClick={() => handleSort("changeAsc")}
                className={cn(
                "p-1 rounded hover:bg-red-800 transition-colors", 
                sortOrder === "changeAsc" && "bg-red-800 text-white"
                )}
                title="Sort by lowest performance"
            >
                <ArrowDown01 className="h-3.5 w-3.5" />
            </button>
            </div>
        </div>
        
        <CardContent className="max-h-64 overflow-y-auto p-0">
            <div className="py-2">
            {sortedSectors.map((sector) => {
                const isTopPerformer = sector.name === topPerformer.name;
                const isBottomPerformer = sector.name === bottomPerformer.name;
                return (
                <div 
                    key={sector.name} 
                    className={cn(
                    "flex items-center justify-between px-6 py-3 hover:bg-zinc-800/50 transition-all duration-200",
                    "border-l-2 border-transparent",
                    isTopPerformer && "border-l-2 border-green-500/80 bg-green-500/5",
                    isBottomPerformer && "border-l-2 border-red-500/80 bg-red-500/5"
                    )}
                >
                    <div className="flex items-center bg-transparent gap-2 group">
                    <div 
                        className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125",
                        sector.change > 0 ? "bg-green-500/80" : "bg-red-500/80"
                        )}
                    />
                    <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                        {sector.name}
                        {isTopPerformer && (
                        <span className="ml-2 text-xs text-green-500 opacity-80 animate-pulse">
                            ★ Top
                        </span>
                        )}
                        {isBottomPerformer && (
                        <span className="ml-2 text-xs text-red-500 opacity-80">
                            ▼ Low
                        </span>
                        )}
                    </span>
                    </div>
                    <div className="flex items-center bg-transparent gap-2">
                    <span 
                        className={cn(
                        "text-sm font-medium transition-all duration-200 group-hover:scale-105",
                        sector.change > 0 ? "text-green-500" : "text-red-500"
                        )}
                    >
                        {sector.change > 0 ? "+" : ""}
                        {sector.change.toFixed(2)}%
                    </span>
                    <div 
                        className={cn(
                        "h-1 transition-all duration-300",
                        sector.change > 0 ? "bg-green-500/40" : "bg-red-500/40",
                        "rounded-full"
                        )}
                        style={{ 
                        width: `${Math.min(Math.abs(sector.change) * 10, 50)}px`,
                        }}
                    />
                    </div>
                </div>
                );
            })}
            </div>
        </CardContent>
        </Card>
    );
    }