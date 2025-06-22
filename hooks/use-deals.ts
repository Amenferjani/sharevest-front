import { useState, useEffect } from 'react';
import { Deal } from '@/types/types';
import { apiService } from '@/services/private-vest/service';

export const useDeals = (page = 1, limit = 10) => {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    const fetchDeals = async () => {
        try {
            setLoading(true);
            const response = await apiService.getDeals(page, limit);

            if (response.success) {
                setDeals(response.data.data);
                setPagination(response.data.pagination);
                setError(null);
            } else {
                setError('Failed to fetch deals');
            }
        } catch (err) {
            setError('An error occurred while fetching deals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeals();
    }, [page, limit]);

    return {
        deals,
        loading,
        error,
        pagination,
        refetch: fetchDeals
    };
};

export const useDeal = (dealId: string) => {
    const [deal, setDeal] = useState<Deal | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDeal = async () => {
            try {
                setLoading(true);
                const response = await apiService.getDealById(dealId);

                if (response.success) {
                    setDeal(response.data);
                    setError(null);
                } else {
                    setError('Deal not found');
                }
            } catch (err) {
                setError('An error occurred while fetching the deal');
            } finally {
                setLoading(false);
            }
        };

        if (dealId) {
            fetchDeal();
        }
    }, [dealId]);

    return { deal, loading, error };
};