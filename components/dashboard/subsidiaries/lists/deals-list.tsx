import React, { useState } from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import { Deal, InvestorTracking } from '@/types/types';
import { useDealInvestment } from '@/hooks/use-investment';
import { DealCard } from '../sub-pages/deal-card';
import Loading from '@/components/ui/loading';

interface DealsListProps {
    deals: Deal[];
    loading: boolean;
    error: string | null;
    onAddInvestment: (deal: Deal) => void;
    onEditInvestment: (deal: Deal, investment: InvestorTracking) => void;
    onRemoveInvestment: (investment: InvestorTracking) => void;
}

const DealCardWithInvestment: React.FC<{
    deal: Deal;
    onAddInvestment: (deal: Deal) => void;
    onEditInvestment: (deal: Deal, investment: InvestorTracking) => void;
    onRemoveInvestment: (investment: InvestorTracking) => void;
}> = ({ deal, onAddInvestment, onEditInvestment, onRemoveInvestment }) => {
    const { investment } = useDealInvestment(deal.id!);

    return (
        <DealCard
            deal={deal}
            userInvestment={investment}
            onAddInvestment={() => onAddInvestment(deal)}
            onEditInvestment={() => investment && onEditInvestment(deal, investment)}
            onRemoveInvestment={() => investment && onRemoveInvestment(investment)}
        />
    );
};

export const DealsList: React.FC<DealsListProps> = ({
    deals,
    loading,
    error,
    onAddInvestment,
    onEditInvestment,
    onRemoveInvestment
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    // Get unique industries from deals
    const industries = Array.from(new Set(deals.map(deal => deal.industry))).sort();

    // Filter and sort deals
    const filteredAndSortedDeals = React.useMemo(() => {
        let filtered = deals.filter(deal => {
            const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                deal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                deal.industry.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesIndustry = !selectedIndustry || deal.industry === selectedIndustry;
            const matchesStatus = !selectedStatus || deal.status === selectedStatus;

            return matchesSearch && matchesIndustry && matchesStatus;
        });

        // Sort deals
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
                case 'oldest':
                    return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
                case 'funding-high':
                    return b.currentInvestment - a.currentInvestment;
                case 'funding-low':
                    return a.currentInvestment - b.currentInvestment;
                case 'required-high':
                    return b.requiredInvestment - a.requiredInvestment;
                case 'required-low':
                    return a.requiredInvestment - b.requiredInvestment;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [deals, searchTerm, selectedIndustry, selectedStatus, sortBy]);

    if (loading && deals.length === 0) {
        return (
            <div className="space-y-6">
                <Loading/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <p className="text-red-600 font-medium">Failed to load deals</p>
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search deals..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                    </div>

                    {/* Industry Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            value={selectedIndustry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
                        >
                            <option value="">All Industries</option>
                            {industries.map(industry => (
                                <option key={industry} value={industry}>{industry}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                            <option value="">All Statuses</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="funding-high">Highest Current Funding</option>
                            <option value="funding-low">Lowest Current Funding</option>
                            <option value="required-high">Highest Required Investment</option>
                            <option value="required-low">Lowest Required Investment</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    Showing {filteredAndSortedDeals.length} of {deals.length} deals
                </p>
                {loading && (
                    <div className="text-sm text-gray-500">Refreshing...</div>
                )}
            </div>

            {/* Deals Grid */}
            {filteredAndSortedDeals.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                        <p className="text-gray-600 font-medium">No deals found</p>
                        <p className="text-gray-500 text-sm mt-1">
                            Try adjusting your search criteria or filters
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedDeals.map(deal => (
                        <DealCardWithInvestment
                            key={deal.id}
                            deal={deal}
                            onAddInvestment={onAddInvestment}
                            onEditInvestment={onEditInvestment}
                            onRemoveInvestment={onRemoveInvestment}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};