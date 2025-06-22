import { useState } from 'react';
import { Edit, Trash2, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { PerformanceMetric } from '@/types/types';
import { formatPercentage, formatDate } from '@/lib/utils';
import EditMetricForm from '../edit-metric-form';

interface MetricsTableProps {
    metrics: PerformanceMetric[];
    onUpdate: (metricId: string, data: Partial<PerformanceMetric>) => void;
    onDelete: (metricId: string) => void;
}

export default function MetricsTable({ metrics, onUpdate, onDelete }: MetricsTableProps) {
    const [editingMetric, setEditingMetric] = useState<PerformanceMetric | null>(null);
    const [deletingMetricId, setDeletingMetricId] = useState<string | null>(null);

    const getPerformanceColor = (value: number) => {
        if (value >= 3) return 'text-green-600';
        if (value >= 1) return 'text-blue-600';
        if (value >= 0) return 'text-gray-600';
        return 'text-red-600';
    };

    const getPerformanceIcon = (value: number) => {
        if (value > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
        if (value < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
        return null;
    };

    const getRiskBadgeVariant = (riskScore: number) => {
        if (riskScore <= 3) return 'default';
        if (riskScore <= 6) return 'secondary';
        return 'destructive';
    };

    const sortedMetrics = [...metrics].sort((a, b) =>
        new Date(b.date!).getTime() - new Date(a.date!).getTime()
    );

    return (
        <>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Return</TableHead>
                            <TableHead>Sharpe Ratio</TableHead>
                            <TableHead>Volatility</TableHead>
                            <TableHead>Drawdown</TableHead>
                            <TableHead>Benchmark</TableHead>
                            <TableHead>Risk Score</TableHead>
                            <TableHead>Comments</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedMetrics.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <Calendar className="h-8 w-8 text-gray-400" />
                                        <p className="text-gray-600">No performance metrics available</p>
                                        <p className="text-sm text-gray-500">Add your first metric to get started</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedMetrics.map((metric) => (
                                <TableRow key={metric.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            {formatDate(metric.date)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            {getPerformanceIcon(metric.returnPercentage)}
                                            <span className={`font-semibold ${getPerformanceColor(metric.returnPercentage)}`}>
                                                {formatPercentage(metric.returnPercentage)}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {metric.sharpeRatio}
                                    </TableCell>
                                    <TableCell>{metric.volatility}%</TableCell>
                                    <TableCell className="text-red-600">
                                        {formatPercentage(metric.drawdown)}
                                    </TableCell>
                                    <TableCell>
                                        <span className={getPerformanceColor(metric.benchmarkPerformance)}>
                                            {formatPercentage(metric.benchmarkPerformance)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getRiskBadgeVariant(metric.riskScore)}>
                                            {metric.riskScore}/10
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-xs">
                                        <p className="truncate text-sm text-gray-600" title={metric.comments}>
                                            {metric.comments || 'No comments'}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setEditingMetric(metric)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setDeletingMetricId(metric.id!)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Metric Modal */}
            {editingMetric && (
                <EditMetricForm
                    metric={editingMetric}
                    isOpen={!!editingMetric}
                    onClose={() => setEditingMetric(null)}
                    onSubmit={(data) => {
                        onUpdate(editingMetric.id!, data);
                        setEditingMetric(null);
                    }}
                />
            )}

            {/* Delete Confirmation */}
            <AlertDialog open={!!deletingMetricId} onOpenChange={() => setDeletingMetricId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Performance Metric</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this performance metric? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (deletingMetricId) {
                                    onDelete(deletingMetricId);
                                    setDeletingMetricId(null);
                                }
                            }}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}