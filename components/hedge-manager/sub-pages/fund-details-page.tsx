"use client"
import { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Trash2, Plus, Download, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { staticHedgeFunds } from '@/types/staticdata';
import { HedgeFund, PerformanceMetric } from '@/types/types';
import { formatCurrency, formatPercentage, formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import FundDetail from './fund-detail';
import PerformanceChart from '../charts/performance-chart';
import CreateMetricForm from '../create-metrics-form';
import DeleteFundConfirmation from '../delete-fund-confirmation';
import MetricsTable from '../tables/metrics-table';
import UpdateFundForm from '../update-fund-form';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createPerformanceMetric, getFundDetails } from '@/services/hedge-vest/service';

interface FundPageProps {
    fundId: string
}


export default function FundDetailPage({ fundId }: FundPageProps) {
    const router = useRouter(); 
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isCreateMetricOpen, setIsCreateMetricOpen] = useState(false);

    const {
        data: fund,
        isLoading: fundLoading,
        refetch: fundRefetch,
        isFetched: fundFetched,
        error: fundError,
    } = useQuery({
        queryKey: ["hedgeFund",fundId],
        queryFn: () => getFundDetails(fundId),
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    const metricCreationMutation = useMutation({
        mutationFn: createPerformanceMetric,
        onSuccess: () => {
            fundRefetch();
            setIsCreateMetricOpen(false);
        },
    });


    const handleUpdateFund = (updatedData: Partial<HedgeFund>) => {
        if (fund) {
            const updatedFund = { ...fund, ...updatedData };
            // setFund(updatedFund);
            setIsEditMode(false);
            toast.success('Fund updated successfully');
        }
    };

    const handleDeleteFund = () => {
        toast.success('Fund deleted successfully');
        router.push('/funds');
    };

    const handleCreateMetric = (metricData: PerformanceMetric) => {
        if( !fundId) return
        metricCreationMutation.mutate({ ...metricData!, hedgeFundId: fundId! })
        console.log({ ...metricData, hedgeFundId:fundId})
    };

    const handleUpdateMetric = (metricId: string, updatedData: Partial<PerformanceMetric>) => {
        if (fund) {
            const updatedMetrics = fund.performanceMetrics?.map(metric =>
                metric.id === metricId
                    ? { ...metric, ...updatedData, updatedAt: new Date().toISOString() }
                    : metric
            );

            // setFund({ ...fund, performanceMetrics: updatedMetrics });
            toast.success('Performance metric updated successfully');
        }
    };

    const handleDeleteMetric = (metricId: string) => {
        if (fund) {
            const updatedMetrics = fund.performanceMetrics?.filter(metric => metric.id !== metricId);
            // setFund({ ...fund, performanceMetrics: updatedMetrics });
            toast.success('Performance metric deleted successfully');
        }
    };

    if (!fund) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Loading fund details...</p>
                </div>
            </div>
        );
    }

    const getLatestMetrics = () => {
        if (fund.performanceMetrics?.length === 0) return null;
        return fund.performanceMetrics![fund.performanceMetrics?.length! - 1];
    };

    const latestMetrics = getLatestMetrics();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Funds
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{fund.name}</h1>
                        <p className="text-gray-600">Managed by {fund.manager}</p>
                    </div>
                    <Badge variant={fund.status === 'Active' ? 'default' : 'secondary'}>
                        {fund.status}
                    </Badge>
                </div>
                {/* <div className="flex items-center gap-2">
                    <GenerateReportButton fund={fund} />
                    <Button variant="outline" onClick={() => setIsEditMode(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Fund
                    </Button>
                    <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </div> */}
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total AUM</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(fund.totalAssets)}</div>
                        <p className="text-xs text-gray-500">
                            {formatCurrency(fund.investedAmount)} invested
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Latest Return</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {latestMetrics ? formatPercentage(latestMetrics.returnPercentage) : 'N/A'}
                        </div>
                        <p className="text-xs text-gray-500">Monthly performance</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Sharpe Ratio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {latestMetrics ? latestMetrics.sharpeRatio : 'N/A'}
                        </div>
                        <p className="text-xs text-gray-500">Risk-adjusted return</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Risk Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {latestMetrics ? `${latestMetrics.riskScore}/10` : 'N/A'}
                        </div>
                        <p className="text-xs text-gray-500">Current risk level</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics Management</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <FundDetail fund={fund} />
                </TabsContent>

                <TabsContent value="performance" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Over Time</CardTitle>
                            <p className="text-sm text-gray-600">
                                Historical performance data for the past 12 months
                            </p>
                        </CardHeader>
                        <CardContent>
                            <PerformanceChart data={fund.performanceMetrics!} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="metrics" className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Performance Metrics</h2>
                        <Button onClick={() => setIsCreateMetricOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Metric
                        </Button>
                    </div>

                    <MetricsTable
                        metrics={fund.performanceMetrics!}
                        onUpdate={handleUpdateMetric}
                        onDelete={handleDeleteMetric}
                    />
                </TabsContent>
            </Tabs>

            {/* Modals */}
            <UpdateFundForm
                fund={fund}
                isOpen={isEditMode}
                onClose={() => setIsEditMode(false)}
                onSubmit={handleUpdateFund}
            />

            <DeleteFundConfirmation
                fund={fund}
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteFund}
            />

            <CreateMetricForm
                isOpen={isCreateMetricOpen}
                onClose={() => setIsCreateMetricOpen(false)}
                onSubmit={handleCreateMetric}
            />
        </div>
    );
}