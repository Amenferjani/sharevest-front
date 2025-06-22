import { PerformanceMetric } from '@/types/types';
import { formatPercentage } from '@/lib/utils';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

interface PerformanceChartProps {
    data: PerformanceMetric[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                <p>No performance data available</p>
            </div>
        );
    }

    const chartData = data
        .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())
        .map(metric => ({
            date: new Date(metric.date!).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            return: metric.returnPercentage,
            benchmark: metric.benchmarkPerformance,
            fullDate: metric.date
        }));

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        tickLine={{ stroke: '#e5e7eb' }}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                        formatter={(value: number, name: string) => [
                            formatPercentage(value),
                            name === 'return' ? 'Fund Return' : 'Benchmark'
                        ]}
                        labelFormatter={(label, payload) => {
                            if (payload && payload[0]) {
                                return new Date(payload[0].payload.fullDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                });
                            }
                            return label;
                        }}
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="return"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                        name="Fund Return"
                    />
                    <Line
                        type="monotone"
                        dataKey="benchmark"
                        stroke="#64748b"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#64748b', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#64748b', strokeWidth: 2 }}
                        name="Benchmark"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}