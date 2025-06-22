import React, { useState, useEffect } from 'react';
import { X, DollarSign } from 'lucide-react';
import { InvestorTracking, InterestFormData } from '@/types/types';
import { formatCurrency } from '@/types/mock-data';
import { Button } from '@/components/ui/button';

interface InvestmentModalProps {
    isOpen: boolean;
    dealName: string;
    dealId: string;
    requiredInvestment: number;
    existingInvestment?: InvestorTracking | null;
    // onSubmit: (formData: InterestFormData) => Promise<{ success: boolean; message: string }>;
    onClose: () => void;
}

export const InvestmentModal: React.FC<InvestmentModalProps> = ({
    isOpen,
    dealName,
    dealId,
    requiredInvestment,
    existingInvestment,
    // onSubmit,
    onClose
}) => {
    const [formData, setFormData] = useState<InterestFormData>({
        investmentAmount: 0,
        note: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isEditing = !!existingInvestment;

    useEffect(() => {
        if (isOpen) {
            if (existingInvestment) {
                setFormData({
                    investmentAmount: existingInvestment.investmentAmount,
                    note: ''
                });
            } else {
                setFormData({
                    investmentAmount: 0,
                    note: ''
                });
            }
            setError(null);
        }
    }, [isOpen, existingInvestment]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.investmentAmount <= 0) {
            setError('Investment amount must be greater than zero');
            return;
        }

        setLoading(true);
        setError(null);

        // try {
        //     const result = await onSubmit(formData);

        //     if (result.success) {
        //         onClose();
        //     } else {
        //         setError(result.message);
        //     }
        // } catch (err) {
        //     setError('An unexpected error occurred');
        // } finally {
        //     setLoading(false);
        // }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
                    onClick={onClose}
                />

                <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-6 pt-6 pb-4">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {isEditing ? 'Update Investment' : 'Make Investment'}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {dealName}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Required Investment: {formatCurrency(requiredInvestment)}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                                    disabled={loading}
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-2">
                                        Investment Amount
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="number"
                                            id="investmentAmount"
                                            min="1"
                                            step="1000"
                                            value={formData.investmentAmount || ''}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                investmentAmount: parseFloat(e.target.value) || 0
                                            }))}
                                            placeholder="Enter investment amount"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            disabled={loading}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Minimum investment: {formatCurrency(1000)}
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                                        Notes (Optional)
                                    </label>
                                    <textarea
                                        id="note"
                                        rows={3}
                                        value={formData.note || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                                        placeholder="Add any additional comments..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                // variant="primary"
                                // loading={loading}
                                // disabled={loading}
                            >
                                {isEditing ? 'Update Investment' : 'Make Investment'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};