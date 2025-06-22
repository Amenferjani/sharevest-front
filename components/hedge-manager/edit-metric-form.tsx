import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PerformanceMetric } from '@/types/types';

const metricSchema = z.object({
    date: z.string().min(1, 'Date is required'),
    returnPercentage: z.number().min(-100).max(100, 'Return must be between -100% and 100%'),
    sharpeRatio: z.number().min(-10).max(10, 'Sharpe ratio must be between -10 and 10'),
    volatility: z.number().min(0).max(100, 'Volatility must be between 0% and 100%'),
    drawdown: z.number().min(-100).max(0, 'Drawdown must be between -100% and 0%'),
    benchmarkPerformance: z.number().min(-100).max(100, 'Benchmark performance must be between -100% and 100%'),
    riskScore: z.number().min(0).max(10, 'Risk score must be between 0 and 10'),
    comments: z.string().optional(),
});

type MetricFormData = z.infer<typeof metricSchema>;

interface EditMetricFormProps {
    metric: PerformanceMetric;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<PerformanceMetric>) => void;
}

export default function EditMetricForm({ metric, isOpen, onClose, onSubmit }: EditMetricFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<MetricFormData>({
        resolver: zodResolver(metricSchema),
        defaultValues: {
            date: metric.date.split('T')[0],
            returnPercentage: metric.returnPercentage,
            sharpeRatio: metric.sharpeRatio,
            volatility: metric.volatility,
            drawdown: metric.drawdown,
            benchmarkPerformance: metric.benchmarkPerformance,
            riskScore: metric.riskScore,
            comments: metric.comments || '',
        },
    });

    useEffect(() => {
        if (isOpen) {
            form.reset({
                date: metric.date.split('T')[0],
                returnPercentage: metric.returnPercentage,
                sharpeRatio: metric.sharpeRatio,
                volatility: metric.volatility,
                drawdown: metric.drawdown,
                benchmarkPerformance: metric.benchmarkPerformance,
                riskScore: metric.riskScore,
                comments: metric.comments || '',
            });
        }
    }, [metric, isOpen, form]);

    const handleSubmit = async (data: MetricFormData) => {
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            onSubmit(data);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Performance Metric</DialogTitle>
                    <DialogDescription>
                        Update the performance metric data. Make sure all values are accurate.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="returnPercentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Return Percentage (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sharpeRatio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sharpe Ratio</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="volatility"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Volatility (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="drawdown"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Drawdown (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="benchmarkPerformance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Benchmark Performance (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="riskScore"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Risk Score (0-10)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="10"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="comments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comments (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea rows={3} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Updating...' : 'Update Metric'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}