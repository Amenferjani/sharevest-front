    import { useState } from 'react';
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
    import { useAuth } from '@/context/authContext';

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

    interface CreateFundModalProps {
        isOpen: boolean;
        onClose: () => void;
        onSubmit: (data: HedgeFund) => void;
        isSubmitting?: boolean;
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

    export default function CreateFundModal({ isOpen, onClose, onSubmit,isSubmitting }: CreateFundModalProps) {
        const {user} = useAuth()

        const form = useForm<FundFormData>({
            resolver: zodResolver(fundSchema),
            defaultValues: {
                name: '',
                manager: user?.username,
                description: '',
                strategy: '',
                totalAssets: 0,
                investedAmount: 0,
                managementFees: 2.0,
                performanceFees: 20.0,
                status: 'Active',
            },
        });

        const handleSubmit = async (data: FundFormData) => {
            onSubmit({
                ...data,
                inceptionDate: new Date().toISOString().split('T')[0],
            });
            form.reset(); // reset form after submission
        };


        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create New Hedge Fund</DialogTitle>
                        <DialogDescription>
                            Add a new hedge fund to your portfolio. Fill in all the required information.
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
                                                <Input placeholder="Alpha Growth Partners" {...field} />
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
                                                <Input
                                                    {...field}
                                                    disabled // Make input disabled
                                                />
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
                                            <Textarea
                                                placeholder="Describe the fund's investment strategy and objectives..."
                                                rows={3}
                                                {...field}
                                            />
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
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select strategy" />
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
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
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
                                                    placeholder="250000000"
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
                                                    placeholder="225000000"
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
                                                    placeholder="2.0"
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
                                                    placeholder="20.0"
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
                                    {isSubmitting ? 'Creating...' : 'Create Fund'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        );
    }