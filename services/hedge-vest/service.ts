import { logout } from "@/lib/utils"
import api from "../api"
import { FilterOptions, HedgeFund, PerformanceMetric } from "@/types/types"


export const getHedgeFundsByFilter = async (filters?: FilterOptions): Promise<HedgeFund[]> => {
    console.log("Fetching hedge funds by filter...");
    try {
        
        const response = await api.get("/hedge-funds/filters",
            // {
            // params: filters,
            // }
        );

        console.log("Hedge funds fetched successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};

export const createHedgeFund = async (dto : HedgeFund): Promise<HedgeFund> => {
    console.log("creating hedge funds...");
    try {
        
        const response = await api.post("/hedge-funds", dto);

        console.log("Hedge funds created successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};

export const deleteFund = async (id:string) => {
    console.log(`Deleting fund ${id}...`)
    try {
        await api.delete(`/hedge-funds/${id}`)
        console.log(`Fund ${id} deleted successfully.`)
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
};

export const getFundDetails = async (id: string):Promise<HedgeFund> => {
    console.log(`getting fund ${id}...`)
    try {
        const response = await api.get(`/hedge-funds/${id}/details`)
        console.log(`Fund ${id} fetched successfully.`, response.data)
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
};

export const createPerformanceMetric = async (dto: PerformanceMetric): Promise<PerformanceMetric> => {
    console.log("creating performance metric...");
    try {

        const response = await api.post(`/hedge-funds/${dto.hedgeFundId}/performance-metrics`, dto);

        console.log("Performance metric created successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};