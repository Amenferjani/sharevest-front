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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { HedgeFund } from '@/types/types';

const fundSchema = z.object({
    name: z.string().min(1, 'Fund name is required'),
    manager: z.string().min(1, 'Manager name is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    strategy: z.string().min(1, 'Strategy is required'),
    totalAssets: z.number().min(0, 'Total assets must be positive'),
    investedAmount: z.number().min(0, 'Invested amount must be positive'),
    managementFees: z.number().min(0).max(10, 'Management fees must be between 0-10%'),
    performanceFees: z.number().min(0).max(50, 'Performance fees must be between 0-50%'),
    status: z.string().min(1, 'Status is required'),
});

type FundFormData = z.infer<typeof fundSchema>;

interface UpdateFundFormProps {
    fund: HedgeFund;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<HedgeFund>) => void;
}

const strategies = [
    'Long/Short Equity',
    'Global Macro',
    'Event Driven',
    'Fixed Income Arbitrage',
    'Multi-Strategy',
    'Quantitative',
    'Emerging Markets',
    'Distressed Securities',
];

const statuses = ['Active', 'Closed', 'Suspended', 'Liquidating'];

export default function UpdateFundForm({ fund, isOpen, onClose, onSubmit }: UpdateFundFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FundFormData>({
        resolver: zodResolver(fundSchema),
        defaultValues: {
            name: fund.name,
            manager: fund.manager,
            description: fund.description,
            strategy: fund.strategy,
            totalAssets: fund.totalAssets,
            investedAmount: fund.investedAmount,
            managementFees: fund.managementFees,
            performanceFees: fund.performanceFees,
            status: fund.status,
        },
    });

    useEffect(() => {
        if (isOpen) {
            form.reset({
                name: fund.name,
                manager: fund.manager,
                description: fund.description,
                strategy: fund.strategy,
                totalAssets: fund.totalAssets,
                investedAmount: fund.investedAmount,
                managementFees: fund.managementFees,
                performanceFees: fund.performanceFees,
                status: fund.status,
            });
        }
    }, [fund, isOpen, form]);

    const handleSubmit = async (data: FundFormData) => {
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
                    <DialogTitle>Update Hedge Fund</DialogTitle>
                    <DialogDescription>
                        Update the fund information. Make sure all fields are accurate.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fund Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="manager"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fund Manager</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={3} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="strategy"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Strategy</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {strategies.map((strategy) => (
                                                    <SelectItem key={strategy} value={strategy}>
                                                        {strategy}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {statuses.map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="totalAssets"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Assets ($)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
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
                                name="investedAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Invested Amount ($)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
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
                                name="managementFees"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Management Fees (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.1"
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
                                name="performanceFees"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Performance Fees (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Updating...' : 'Update Fund'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}