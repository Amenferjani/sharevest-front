import { logout } from "@/lib/utils"
import api from "../api"
import { Campaign, Contribution, Update } from "@/types/types"

/**
 * @param {object} campaignDto
 * @returns {Promise<object>}
 */
export const createCampaign = async (campaignDto) => {
    console.log("Creating campaign...", campaignDto)
    try {
        const response = await api.post("/part-vest/campaign", campaignDto)
        console.log("Campaign created successfully:", response.data)
        return response.data
    } catch (err : any) {
        if (err.response?.status === 401) {
        logout()
        }
        throw err
    }
}

/**
 * @returns {Promise<object[]>}
 */
export const getOwnerCampaigns = async () => {
    console.log("Fetching owner campaigns...")
    try {
        const response = await api.get("/part-vest/campaign/owner/by-id")
        console.log("owner Campaigns fetched successfully:", response.data)
        return response.data
    } catch (err : any) {
        if (err.response?.status === 401) {
        logout()
        }
        throw err
    }
}

/**
 * @param {string} id
 * @returns {Promise<object>}
 */
export const getCampaignById = async (id) => {
    console.log(`Fetching campaign ${id}...`)
    try {
        const response = await api.get(`/part-vest/campaign/${id}`)
        console.log(`Campaign ${id} fetched successfully:`, response.data)
        return response.data
    } catch (err : any) {
        if (err.response?.status === 401) {
        logout()
        }
        throw err
    }
}


export const updateCampaign = async (data : {id: string, campaignDto: {
    title?: string,
    description?: string,
        targetAmount?: number,
        minContribution?: number,
        maxContribution?: number,
}
}) : Promise<Campaign> => {
    const { id, campaignDto } = data; 
    console.log(`Updating campaign ${id}...`, { campaignDto})
    try {
        const response = await api.patch(`/part-vest/campaign/${id}`, { campaign: campaignDto })
        console.log(`Campaign ${id} updated successfully:`, response.data)
        return response.data
    } catch (err : any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
}
export const test = ()  =>{ console.log("test");}

/**
 * @param {string} id
 * @returns {Promise<void>}
 */
export const deleteCampaign = async (id) => {
    console.log(`Deleting campaign ${id}...`)
    try {
        await api.delete(`/part-vest/campaign/${id}`)
        console.log(`Campaign ${id} deleted successfully.`)
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
};

export const getRecentCampaigns = async (limit: number, page: number) => {
    console.log(`getting recent campaigns limit:${limit} page:${page}`);
    try {
        const response = await api.get(`/part-vest/campaign/get/recent?page=${page}&limit=${limit}`)
        console.log("Recent campaigns fetched successfully:", response.data)
        return response.data
    }
    catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
};

export const getCampaignsByUiFilters = async (
    category: string,
    progressRange: string,
    daysLeftRange: string,
    limit: number,
    ) => {
    console.log(
        `fetching campaigns with filters:`,
        { category, progressRange, daysLeftRange, limit }
    );

    const params: Record<string, string | number> = {};

    if (category && category !== 'All') {
        params.category = category.toLowerCase();
    }
    if (progressRange && progressRange !== 'All') {
        params.progressRange = progressRange;
    }
    if (daysLeftRange && daysLeftRange !== 'All') {
        params.daysLeftRange = daysLeftRange;
    }
    if (limit) {
        params.limit = limit;
    }

    try {
        const response = await api.get('/part-vest/campaign/get/by-filter', {
        params,
        });

        console.log('Filtered campaigns fetched successfully:', response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
        logout();
        }
        throw err;
    }
};

/*
???contribution
*/
export const addContribution = async (data : {campaignId: string, amount : number} ): Promise<Contribution> => {
    console.log("adding Contributions ...");
    const { campaignId, amount} = data;
    try {
        const response = await api.post(`/part-vest/contributions/campaign/${campaignId}`,{ amount });
        console.log("Contributions added successfully:", response.data)
        return response.data
    }
    catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
};

export const getAllByContributor = async () : Promise<Contribution[]> => {
    console.log(`getting all campaigns By Contributor...`);
    try {
        const response = await api.get(`/part-vest/contributions/get_all_by_contributor`)
        console.log("Campaigns By Contributor fetched successfully:", response.data)
        return response.data
    }
    catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
};

export const getSixMonthInvestmentTrend = async () :Promise<{ month: string; amount: number }[]> => {
    console.log("getting Six Month Investment Trend...");
    try {
        const response = await api.get("/part-vest/contributions/get_six_month_investment_trend")
        console.log("Six Month Investment Trend fetched successfully:", response.data)
        return response.data
    }
    catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
};

export const getCampaignContributionsByContributor = async ( campaignId : string) :Promise<Contribution[]> => {
    console.log("getting Campaign Contributions By Contributor...");
    try {
        const response = await api.get(`/part-vest/contributions/campaign/${campaignId}/contributor`)
        console.log("Campaign Contributions By Contributor fetched successfully:", response.data)
        return response.data
    }
    catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
};

export const getCampaignContributions = async (campaignId: string): Promise<Contribution[]> => {
    console.log("getting Campaign Contributions By Contributor...");
    try {
        const response = await api.get(`/part-vest/contributions/campaign/${campaignId}`)
        console.log("Campaign Contributions fetched successfully:", response.data)
        return response.data
    }
    catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
};

//!! updates section :
export const getUpdatesByCampaign = async (campaignId: string): Promise<Update[]> => {
    console.log("getting Updates By Campaign...");
    console.log("Campaign id : ", campaignId )
    try {
        const response = await api.get(`/part-vest/updates/campaign/${campaignId}`)
        console.log("Updates By Campaign fetched successfully:", response.data)
        return response.data
    }
    catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
}

export const createUpdate = async (data : {campaignId: string, message: string}): Promise<Update> => {
    console.log("creating Update...");
    const {campaignId , message } = data
    try {
        console.log(data)
        const response = await api.post(`/part-vest/updates`, { campaignId, message })
        console.log("Update created successfully:", response.data)
        return response.data
    }
    catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
}

export const deleteUpdate = async (data : {updateId: string , campaignId: string}): Promise<void> => {
    const {updateId , campaignId} = data
    console.log("deleting Update...");
    try {
        const response = await api.delete(`/part-vest/updates/${updateId}/campaign/${campaignId}`)
        console.log("Update deleted successfully:", response.data)
        return response.data
    }
    catch (err: any) {
        if (err.response?.status === 401) {
            logout()
        }
        throw err
    }
}
