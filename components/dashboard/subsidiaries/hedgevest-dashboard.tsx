"use client"
import { useState } from 'react';
import { HedgeFund, FilterOptions } from '@/types/types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPerformanceTier } from '@/lib/utils';
import { BarChart3, TrendingUp, Filter, Activity } from 'lucide-react';
import { staticHedgeFunds } from '@/types/staticdata';
import { FundDetails } from './sub-pages/fund-details';
import { FundFilters } from './filters/fund-filter';
import { FundList } from './lists/fund-list';
import { LatestMetrics } from './sub-pages/latest-metrics';
import { useQuery } from '@tanstack/react-query';
import { getHedgeFundsByFilter } from '@/services/hedge-vest/service';
import { useAuth } from '@/context/authContext';


export default function InvestorDashboard() {
  const { user } = useAuth();
    const [selectedFund, setSelectedFund] = useState<HedgeFund | null>(null);
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

    const getLatestReturn = (fund: HedgeFund): number => {
      if (fund.performanceMetrics?.length === 0) return 0;
      const latest = fund.performanceMetrics![fund.performanceMetrics?.length! - 1];
      return latest.returnPercentage;
    };

  const filteredFunds = funds?.filter(fund => {
      // Search term filter
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

      // Performance tier filter
      if (filters.performanceTier) {
        const latestReturn = getLatestReturn(fund);
        const tier = getPerformanceTier(latestReturn);
        if (tier !== filters.performanceTier) {
          return false;
        }
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

    if (selectedFund) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto p-6">
            <FundDetails
              fund={selectedFund}
              onBack={() => setSelectedFund(null)}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">HedgeVest</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Discover and track hedge fund performance with comprehensive analytics
            </p>
          </div>

          {/* Main Content */}
          {/* <Tabs defaultValue="funds" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
              <TabsTrigger value="funds" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Browse Funds
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Latest Metrics
              </TabsTrigger>
            </TabsList> */}

            {/* <TabsContent value="funds" className="space-y-6"> */}
              <FundFilters filters={filters} onFiltersChange={setFilters} />

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Available Hedge Funds ({filteredFunds?.length})
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>Sorted by performance</span>
                </div>
              </div>

              <FundList
                funds={filteredFunds?.sort((a, b) => getLatestReturn(b) - getLatestReturn(a))}
                onSelectFund={setSelectedFund}
              />
            {/* </TabsContent> */}

            {/* <TabsContent value="metrics" className="space-y-6">
              <LatestMetrics funds={staticHedgeFunds} />
            </TabsContent> */}
          {/* </Tabs> */}
        </div>
      </div>
    );
}
