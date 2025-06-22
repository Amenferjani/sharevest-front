import { Deal, InvestorTracking, InterestFormData, ApiResponse, PaginatedResponse } from '@/types/types';
import { mockDeals, mockInvestorTrackings } from '@/types/mock-data';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ApiService {
    private deals: Deal[] = [...mockDeals];
    private investorTrackings: InvestorTracking[] = [...mockInvestorTrackings];
    private currentInvestorId = 'investor-1'; // Simulated current user

    async getDeals(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Deal>>> {
        await delay(800);

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedDeals = this.deals.slice(startIndex, endIndex);

        return {
            success: true,
            data: {
                data: paginatedDeals,
                pagination: {
                    page,
                    limit,
                    total: this.deals.length,
                    totalPages: Math.ceil(this.deals.length / limit)
                }
            }
        };
    }

    async getDealById(dealId: string): Promise<ApiResponse<Deal | null>> {
        await delay(300);

        const deal = this.deals.find(d => d.id === dealId);
        return {
            success: true,
            data: deal || null
        };
    }

    async getMyInvestments(): Promise<ApiResponse<InvestorTracking[]>> {
        await delay(500);

        const myInvestments = this.investorTrackings.filter(
            tracking => tracking.investorId === this.currentInvestorId
        );

        // Populate deal information
        const investmentsWithDeals = myInvestments.map(investment => ({
            ...investment,
            deal: this.deals.find(deal => deal.id === investment.dealId)
        }));

        return {
            success: true,
            data: investmentsWithDeals
        };
    }

    async addInvestment(dealId: string, formData: InterestFormData): Promise<ApiResponse<InvestorTracking>> {
        await delay(600);

        // Check if investment already exists
        const existingInvestment = this.investorTrackings.find(
            tracking => tracking.dealId === dealId && tracking.investorId === this.currentInvestorId
        );

        if (existingInvestment) {
            return {
                success: false,
                data: existingInvestment,
                message: 'You have already invested in this deal'
            };
        }

        const newInvestment: InvestorTracking = {
            id: `track-${Date.now()}`,
            dealId,
            investorId: this.currentInvestorId,
            investmentAmount: formData.investmentAmount,
            investmentDate: new Date().toISOString(),
            roi: 0,
            valuationChange: 0,
            irr: 0,
            profitLoss: 0,
            exitCompleted: false
        };

        this.investorTrackings.push(newInvestment);

        // Update deal's current investment
        const dealIndex = this.deals.findIndex(deal => deal.id === dealId);
        if (dealIndex !== -1) {
            this.deals[dealIndex].currentInvestment += formData.investmentAmount;
        }

        return {
            success: true,
            data: newInvestment,
            message: 'Investment added successfully'
        };
    }

    async updateInvestment(investmentId: string, formData: InterestFormData): Promise<ApiResponse<InvestorTracking>> {
        await delay(500);

        const investmentIndex = this.investorTrackings.findIndex(
            tracking => tracking.id === investmentId && tracking.investorId === this.currentInvestorId
        );

        if (investmentIndex === -1) {
            return {
                success: false,
                data: null as any,
                message: 'Investment not found'
            };
        }

        const oldAmount = this.investorTrackings[investmentIndex].investmentAmount;
        this.investorTrackings[investmentIndex].investmentAmount = formData.investmentAmount;

        // Update deal's current investment
        const dealId = this.investorTrackings[investmentIndex].dealId;
        const dealIndex = this.deals.findIndex(deal => deal.id === dealId);
        if (dealIndex !== -1) {
            this.deals[dealIndex].currentInvestment =
                this.deals[dealIndex].currentInvestment - oldAmount + formData.investmentAmount;
        }

        return {
            success: true,
            data: this.investorTrackings[investmentIndex],
            message: 'Investment updated successfully'
        };
    }

    async removeInvestment(investmentId: string): Promise<ApiResponse<boolean>> {
        await delay(400);

        const investmentIndex = this.investorTrackings.findIndex(
            tracking => tracking.id === investmentId && tracking.investorId === this.currentInvestorId
        );

        if (investmentIndex === -1) {
            return {
                success: false,
                data: false,
                message: 'Investment not found'
            };
        }

        const investment = this.investorTrackings[investmentIndex];

        // Update deal's current investment
        const dealIndex = this.deals.findIndex(deal => deal.id === investment.dealId);
        if (dealIndex !== -1) {
            this.deals[dealIndex].currentInvestment -= investment.investmentAmount;
        }

        // Remove the investment
        this.investorTrackings.splice(investmentIndex, 1);

        return {
            success: true,
            data: true,
            message: 'Investment removed successfully'
        };
    }

    async getInvestmentForDeal(dealId: string): Promise<ApiResponse<InvestorTracking | null>> {
        await delay(200);

        const investment = this.investorTrackings.find(
            tracking => tracking.dealId === dealId && tracking.investorId === this.currentInvestorId
        );

        return {
            success: true,
            data: investment || null
        };
    }
}

export const apiService = new ApiService();