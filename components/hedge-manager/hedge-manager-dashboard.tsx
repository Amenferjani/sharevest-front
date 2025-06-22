"use client"
import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { staticHedgeFunds } from '@/types/staticdata';

import { toast } from 'sonner';
import { FilterOptions, HedgeFund } from '@/types/types';
import { FundFilters } from '../dashboard/subsidiaries/filters/fund-filter';
import CreateFundModal from './creating-fund-model';
import FundCard from './fund-card';
import FundList from './lists/fund-list';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/authContext';
import { createHedgeFund, deleteFund, getHedgeFundsByFilter } from '@/services/hedge-vest/service';
import Loading from '../ui/loading';

export default function HedgeFundDashboard() {
    const {user} = useAuth()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [filters, setFilters] = useState<FilterOptions>({
        strategy: '',
        category: '',
        performanceTier: '',
        searchTerm: ''
    });

    const {
        data: funds,
        isLoading: fundsLoading,
        refetch: fundsRefetch,
        isFetched: fundsFetched,
        error: fundsError,
    } = useQuery({
        queryKey: ["hedgeFunds"],
        queryFn: () => getHedgeFundsByFilter(),
        enabled: !!user,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    const fundCreationMutation = useMutation({
        mutationFn: createHedgeFund,
        onSuccess: () => {
            fundsRefetch();
            setIsCreateModalOpen(false);
        },
    });
    const fundDeleteMutation = useMutation({
        mutationFn: deleteFund,
        onSuccess: () => {
            fundsRefetch();
        },
    });

    const handleCreateFund = (fundData: HedgeFund) => {
        console.log(fundData)
        fundCreationMutation.mutate(fundData)
    };

    const handleDeleteFund = (fundId: string) => {
        fundDeleteMutation.mutate(fundId);
    };

    const filteredFunds = funds?.filter(fund => {
        // Search filter
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            if (!fund.name.toLowerCase().includes(searchLower) &&
                !fund.manager.toLowerCase().includes(searchLower)) {
                return false;
            }
        }

        // Strategy filter
        if (filters.strategy && fund.strategy !== filters.strategy) {
            return false;
        }

        // Category filter (simplified mapping)
        if (filters.category) {
            const categoryMapping: { [key: string]: string[] } = {
                'equity': ['Long/Short Equity', 'Emerging Markets', 'Quantitative'],
                'fixed-income': ['Fixed Income Arbitrage'],
                'multi-asset': ['Multi-Strategy', 'Global Macro'],
                'commodity': ['Global Macro'],
                'currency': ['Global Macro']
            };

            const strategies = categoryMapping[filters.category] || [];
            if (!strategies.includes(fund.strategy)) {
                return false;
            }
        }

        return true;
    });

    if (fundsLoading) return<Loading/>

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Hedge Funds</h1>
                    <p className="text-gray-600">Manage your hedge fund portfolio</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Fund
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Funds</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{funds?.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total AUM</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${(funds?.reduce((sum, fund) => sum + Number(fund.totalAssets), 0)!).toFixed(1)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Active Funds</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {funds?.filter(fund => fund.status === 'Active').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Avg Management Fee</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {(funds?.reduce((sum, fund) => sum + Number(fund.managementFees), 0)! / funds?.length!).toFixed(1)}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <FundFilters filters={filters} onFiltersChange={setFilters} />

            {/* Search and View Toggle */}
            <div className="flex justify-between items-center">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search funds by name or manager..."
                        value={filters.searchTerm}
                        onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                    >
                        Grid
                    </Button>
                    <Button
                        variant={viewMode === 'table' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                    >
                        Table
                    </Button>
                </div>
            </div>

            {/* Results */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Showing {filteredFunds?.length} of {funds?.length} funds
                </p>
            </div>

            {/* Fund Display */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredFunds?.map((fund) => (
                        <FundCard
                            key={fund.id}
                            fund={fund}
                            onDelete={handleDeleteFund}
                        />
                    ))}
                </div>
            ) : (
                <FundList
                    funds={filteredFunds!}
                    onDelete={handleDeleteFund}
                />
            )}

            {filteredFunds?.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Filter className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No funds found</h3>
                        <p className="text-gray-600 text-center mb-4">
                            Try adjusting your search criteria or filters
                        </p>
                        <Button onClick={() => setFilters({ strategy: '', category: '', performanceTier: '', searchTerm: '' })}>
                            Clear Filters
                        </Button>
                    </CardContent>
                </Card>
            )}

            <CreateFundModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateFund}
                isSubmitting={fundCreationMutation.isPending} 
            />
        </div>
    );
}