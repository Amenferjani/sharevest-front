import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PerformanceMetric } from '@/types/types';

interface CreateMetricFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PerformanceMetric) => void;
}

export default function CreateMetricForm({ isOpen, onClose, onSubmit }: CreateMetricFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<PerformanceMetric>({
        date: new Date().toISOString().split('T')[0],
        returnPercentage: 0,
        sharpeRatio: 0,
        volatility: 0,
        drawdown: 0,
        benchmarkPerformance: 0,
        riskScore: 5,
        comments: '',
        hedgeFundId: '', // You may need to pass this from outside or fill it later
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'comments' ? value : Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await new Promise((res) => setTimeout(res, 1000)); // simulate async
            onSubmit(formData);
            setFormData({
                date: new Date().toISOString().split('T')[0],
                returnPercentage: 0,
                sharpeRatio: 0,
                volatility: 0,
                drawdown: 0,
                benchmarkPerformance: 0,
                riskScore: 5,
                comments: '',
                hedgeFundId: '', // reset
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Performance Metric</DialogTitle>
                    <DialogDescription>
                        Add a new performance metric for this fund. All fields are required except comments.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Return Percentage (%)</label>
                            <Input
                                name="returnPercentage"
                                type="number"
                                step="0.01"
                                value={formData.returnPercentage}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Sharpe Ratio</label>
                            <Input
                                name="sharpeRatio"
                                type="number"
                                step="0.01"
                                value={formData.sharpeRatio}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Volatility (%)</label>
                            <Input
                                name="volatility"
                                type="number"
                                step="0.01"
                                value={formData.volatility}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Drawdown (%)</label>
                            <Input
                                name="drawdown"
                                type="number"
                                step="0.01"
                                value={formData.drawdown}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Benchmark Performance (%)</label>
                            <Input
                                name="benchmarkPerformance"
                                type="number"
                                step="0.01"
                                value={formData.benchmarkPerformance}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Risk Score (0–10)</label>
                            <Input
                                name="riskScore"
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={formData.riskScore}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1">Comments (Optional)</label>
                        <Textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            placeholder="Add any relevant comments about this period's performance..."
                            rows={3}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Metric'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
