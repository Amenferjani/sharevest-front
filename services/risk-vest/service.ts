import { MarketAlert, RiskProfile } from "@/types/types";
import api from "../api";
import { logout } from "@/lib/utils";

export const createRiskProfile = async (riskDto: RiskProfile): Promise<RiskProfile> => {
    try {
        const response = await api.post("/risk-vest", riskDto);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};

export const getRiskProfile = async () => {
    try {
        console.log("getting user risk profile ")
        const response = await api.get(`/risk-vest/user`);
        console.log("user risk profile fetched :", response.data)
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 404) {
            console.log("no risk profile yet—returning null");
            return null;
        }
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
}

export const getAdjustedCrowdfundingRisk = async () => {
    try {
        console.log("getting adjusted crowdfunding risk ")
        const response = await api.get(`/risk-vest/crowdfunding`);
        console.log("adjusted crowdfunding risk fetched :", response.data)
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
}

export const getSuggestRiskProfileChange = async () => {
    try {
        console.log("getting Suggest Risk Profile Change ")
        const response = await api.get(`/risk-vest/suggest`);
        console.log("Suggested Risk Profile Change fetched :", response.data)
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
}

export const getAggregatedRiskDetails = async () => {
    try {
        console.log("getting Aggregated Risk Details ")
        const response = await api.get(`/risk-vest/aggregated`);
        console.log("Aggregated Risk Details fetched :", response.data)
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
}

export const updateRiskProfile = async (riskDto: RiskProfile) => {
    try {
        console.log("updating Risk  ")
        const response = await api.patch(`/risk-vest/update`, riskDto);
        console.log("Risk  profile updated:", response.data)
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
}

/*
?alerts
*/
export const getUserRiskAlerts = async (): Promise<MarketAlert[]> => {
    try {
        console.log("getting Risk Alerts ")
        const response = await api.get(`/risk-vest/alert`);
        console.log("Risk Alerts fetched :", response.data)
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
}
export const updateRiskAlert = async (data : {alertId: string, isActive: boolean}) => {
    const { alertId, isActive } = data;
    try {
        console.log("updating Risk Alert ", alertId, " to ", isActive)
        const response = await api.patch(`/risk-vest/alert/${alertId}`, { isActive });
        console.log("Risk Alert updated:", response.data)
        // return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
}
export const deleteRiskAlert = async (alertId: string) => {
    try {
        console.log("deleting Risk Alert ", alertId)
        const response = await api.delete(`/risk-vest/alert/${alertId}`);
        console.log("Risk Alert deleted:", response.data)
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
}
export const createRiskAlert = async (alertData: MarketAlert) => {
    try {
        console.log("creating Risk Alert ", alertData)
        const response = await api.post(`/risk-vest/alert`, alertData);
        console.log("Risk Alert created:", response.data)
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
}
