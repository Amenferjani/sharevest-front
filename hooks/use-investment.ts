import { useState, useEffect } from 'react';
import { InvestorTracking, InterestFormData } from '@/types/types';
import { apiService } from '@/services/private-vest/service';

export const useInvestments = () => {
    const [investments, setInvestments] = useState<InvestorTracking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInvestments = async () => {
        try {
            setLoading(true);
            const response = await apiService.getMyInvestments();

            if (response.success) {
                setInvestments(response.data);
                setError(null);
            } else {
                setError('Failed to fetch investments');
            }
        } catch (err) {
            setError('An error occurred while fetching investments');
        } finally {
            setLoading(false);
        }
    };

    const addInvestment = async (dealId: string, formData: InterestFormData) => {
        try {
            const response = await apiService.addInvestment(dealId, formData);

            if (response.success) {
                await fetchInvestments(); // Refresh the list
                return { success: true, message: response.message };
            } else {
                return { success: false, message: response.message || 'Failed to add investment' };
            }
        } catch (err) {
            return { success: false, message: 'An error occurred while adding investment' };
        }
    };

    const updateInvestment = async (investmentId: string, formData: InterestFormData) => {
        try {
            const response = await apiService.updateInvestment(investmentId, formData);

            if (response.success) {
                await fetchInvestments(); // Refresh the list
                return { success: true, message: response.message };
            } else {
                return { success: false, message: response.message || 'Failed to update investment' };
            }
        } catch (err) {
            return { success: false, message: 'An error occurred while updating investment' };
        }
    };

    const removeInvestment = async (investmentId: string) => {
        try {
            const response = await apiService.removeInvestment(investmentId);

            if (response.success) {
                await fetchInvestments(); // Refresh the list
                return { success: true, message: response.message };
            } else {
                return { success: false, message: response.message || 'Failed to remove investment' };
            }
        } catch (err) {
            return { success: false, message: 'An error occurred while removing investment' };
        }
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

    return {
        investments,
        loading,
        error,
        addInvestment,
        updateInvestment,
        removeInvestment,
        refetch: fetchInvestments
    };
};

export const useDealInvestment = (dealId: string) => {
    const [investment, setInvestment] = useState<InvestorTracking | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvestment = async () => {
            if (!dealId) return;

            try {
                setLoading(true);
                const response = await apiService.getInvestmentForDeal(dealId);

                if (response.success) {
                    setInvestment(response.data);
                }
            } catch (err) {
                console.error('Error fetching deal investment:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvestment();
    }, [dealId]);

    return { investment, loading };
};