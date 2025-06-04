import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface Event {
    name: string;
    time: string;
    importance: number; 
    description: string;
    timestampDay: number; 
}
// Enhanced Economic Calendar
export default function EnhancedEconomicCalendar({ economicEvents }: { economicEvents: Event[] }) {
    const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

    // fallback data
    const eventsBackUp: Event[] = [
        { name: "Fed Interest Rate Decision",  time: "2:00 PM", importance: 3, description: "Federal Reserve announces interest rate policy", timestampDay: 1746576000 },
        { name: "AAPL Earnings",                time: "4:30 PM", importance: 2, description: "Apple Inc. quarterly earnings report",     timestampDay: 1746662400 },
        { name: "CPI Data Release",             time: "8:30 AM", importance: 3, description: "Consumer Price Index inflation data",     timestampDay: 1746921600 },
        { name: "Retail Sales Report",          time: "10:00 AM", importance: 2, description: "Monthly retail sales figures",           timestampDay: 1747094400 },
        { name: "NVDA Earnings",              time: "5:00 PM", importance: 2, description: "NVIDIA Corp. quarterly earnings report", timestampDay: 1747353600 },
    ];

    // decide which source to use
    const rawEvents = (economicEvents?.length ?? 0) > 0 ? economicEvents : eventsBackUp;

    // map filter label to numeric importance
    const importanceValue: Record<string, number> = { high: 3, medium: 2, low: 1 };

    // apply filter
    const filtered = filter === 'all'
        ? rawEvents
        : rawEvents.filter(e => e.importance === importanceValue[filter]);

    // sort by importance descending
    const sorted = [...filtered].sort((a,b) => (b.importance||0) - (a.importance||0))

    const formatDate = (tsSec: number) => {
        const d = new Date(tsSec * 1000);
        return d.toLocaleString('default', { month: 'short', day: 'numeric' });
    };

    const getImportanceBadge = (imp: number) => {
        switch (imp) {
        case 3: return <Badge className="bg-red-500 hover:bg-red-600">High Impact</Badge>;
        case 2: return <Badge className="bg-amber-500 hover:bg-amber-600">Medium Impact</Badge>;
        case 1: return <Badge className="bg-blue-500 hover:bg-blue-600">Low Impact</Badge>;
        default: return <Badge className="bg-green-500 hover:bg-green-600">N/A</Badge>;
        }
    };

    return (
        <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-zinc-400" />
            <h3 className="text-lg font-semibold">Week Economic Events</h3>
            </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
            {(['all', 'high', 'medium', 'low'] as const).map(label => (
            <Button
                key={label}
                size="sm"
                variant={filter === label ? 'default' : 'outline'}
                className="h-8"
                onClick={() => setFilter(label)}
            >
                {label === 'all'
                ? 'All'
                : label.charAt(0).toUpperCase() + label.slice(1)}
            </Button>
            ))}
        </div>

        {/* Scrollable List */}
        <div className="grid gap-3 max-h-[400px] overflow-y-auto">
            {sorted.map((event, idx) => (
            <Card key={idx} className="bg-zinc-900 border-zinc-800 overflow-hidden">
                <div className="flex">
                <div className="bg-zinc-800 p-3 flex flex-col items-center justify-center min-w-[80px]">
                    <span className="text-sm font-bold">{formatDate(event.timestampDay)}</span>
                    <span className="text-xs text-zinc-400">{event.time}</span>
                </div>
                <CardContent className="p-4 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <p className="text-xs text-zinc-400">{event.description}</p>
                    </div>
                    {getImportanceBadge(event.importance)}
                    </div>
                </CardContent>
                </div>
            </Card>
            ))}
            {sorted.length === 0 && (
            <p className="text-center text-zinc-500">No events at this importance level.</p>
            )}
        </div>
        </div>
    );
}
