import { Deal, InvestorTracking } from './types';

export const mockDeals: Deal[] = [
    {
        id: '1',
        name: 'TechVenture AI Platform',
        description: 'Revolutionary AI platform for enterprise automation and decision-making processes.',
        industry: 'Technology',
        requiredInvestment: 5000000,
        currentInvestment: 3250000,
        status: 'open',
        lifecycleStage: 'Funding',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-20T00:00:00Z'
    },
    {
        id: '2',
        name: 'MedTech Diagnostics',
        description: 'Advanced medical diagnostic equipment using machine learning for early disease detection.',
        industry: 'Healthcare',
        requiredInvestment: 8000000,
        currentInvestment: 6400000,
        status: 'open',
        lifecycleStage: 'Growth',
        createdAt: '2024-01-10T00:00:00Z',
        updatedAt: '2024-01-18T00:00:00Z'
    },
    {
        id: '3',
        name: 'GreenEnergy Solutions',
        description: 'Sustainable energy infrastructure development with focus on solar and wind power.',
        industry: 'Energy',
        requiredInvestment: 12000000,
        currentInvestment: 9600000,
        status: 'open',
        lifecycleStage: 'Growth',
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-22T00:00:00Z'
    },
    {
        id: '4',
        name: 'FinTech Payment Gateway',
        description: 'Next-generation payment processing platform for e-commerce and mobile applications.',
        industry: 'Financial Services',
        requiredInvestment: 3000000,
        currentInvestment: 3000000,
        status: 'closed',
        lifecycleStage: 'Exit',
        createdAt: '2023-12-20T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
    },
    {
        id: '5',
        name: 'PropTech Real Estate',
        description: 'Digital transformation platform for real estate management and investment tracking.',
        industry: 'Real Estate',
        requiredInvestment: 6000000,
        currentInvestment: 1800000,
        status: 'open',
        lifecycleStage: 'Funding',
        createdAt: '2024-01-25T00:00:00Z',
        updatedAt: '2024-01-25T00:00:00Z'
    }
];

export const mockInvestorTrackings: InvestorTracking[] = [
    {
        id: 'track-1',
        investorId: 'investor-1',
        dealId: '1',
        investmentAmount: 250000,
        investmentDate: '2024-01-20T10:30:00Z',
        roi: 15.5,
        valuationChange: 37500,
        irr: 18.2,
        profitLoss: 37500,
        exitCompleted: false
    },
    {
        id: 'track-2',
        investorId: 'investor-1',
        dealId: '3',
        investmentAmount: 500000,
        investmentDate: '2024-01-18T14:15:00Z',
        roi: 8.3,
        valuationChange: 41500,
        irr: 12.1,
        profitLoss: 41500,
        exitCompleted: false
    }
];

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
};

export const getProgressPercentage = (current: number, required: number): number => {
    return Math.min((current / required) * 100, 100);
};

export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'open': return 'text-green-600 bg-green-50';
        case 'closed': return 'text-gray-600 bg-gray-50';
        case 'pending': return 'text-yellow-600 bg-yellow-50';
        default: return 'text-gray-600 bg-gray-50';
    }
};

export const getLifecycleStageColor = (stage: string): string => {
    switch (stage) {
        case 'Idea': return 'text-purple-600 bg-purple-50';
        case 'Funding': return 'text-blue-600 bg-blue-50';
        case 'Growth': return 'text-green-600 bg-green-50';
        case 'Exit': return 'text-orange-600 bg-orange-50';
        default: return 'text-gray-600 bg-gray-50';
    }
};