import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { FilterOptions } from '@/types/types';

interface FundFiltersProps {
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
}

export function FundFilters({ filters, onFiltersChange }: FundFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFilterChange = (key: keyof FilterOptions, value: string) => {
        onFiltersChange({
            ...filters,
            [key]: value
        });
    };

    const clearFilters = () => {
        onFiltersChange({
            strategy: '',
            category: '',
            performanceTier: '',
            searchTerm: ''
        });
    };

    const hasActiveFilters = filters.strategy || filters.category || filters.performanceTier;

    return (
        <Card className="mb-6">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Filter Hedge Funds</CardTitle>
                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <Button variant="outline" onClick={clearFilters}>
                                <X className="h-4 w-4 mr-1" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search funds by name or manager..."
                        value={filters.searchTerm}
                        onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Basic Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Strategy</label>
                        <Select value={filters.strategy} onValueChange={(value) => handleFilterChange('strategy', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Strategies" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Strategies</SelectItem>
                                <SelectItem value="Long/Short Equity">Long/Short Equity</SelectItem>
                                <SelectItem value="Global Macro">Global Macro</SelectItem>
                                <SelectItem value="Event Driven">Event Driven</SelectItem>
                                <SelectItem value="Fixed Income Arbitrage">Fixed Income Arbitrage</SelectItem>
                                <SelectItem value="Multi-Strategy">Multi-Strategy</SelectItem>
                                <SelectItem value="Quantitative">Quantitative</SelectItem>
                                <SelectItem value="Emerging Markets">Emerging Markets</SelectItem>
                                <SelectItem value="Distressed Securities">Distressed Securities</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                        <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Categories</SelectItem>
                                <SelectItem value="equity">Equity Focused</SelectItem>
                                <SelectItem value="fixed-income">Fixed Income</SelectItem>
                                <SelectItem value="commodity">Commodity</SelectItem>
                                <SelectItem value="currency">Currency</SelectItem>
                                <SelectItem value="multi-asset">Multi-Asset</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Performance Tier</label>
                        <Select value={filters.performanceTier} onValueChange={(value) => handleFilterChange('performanceTier', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Performance Levels" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Performance Levels</SelectItem>
                                <SelectItem value="top-performer">Top Performer (15%+)</SelectItem>
                                <SelectItem value="above-average">Above Average (8-15%)</SelectItem>
                                <SelectItem value="average">Average (3-8%)</SelectItem>
                                <SelectItem value="below-average">Below Average (&lt;3%)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}