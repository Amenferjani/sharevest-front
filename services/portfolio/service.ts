import { Asset } from "@/types/types";
import api from "../api";
import { logout } from "@/lib/utils";

export const addAssetToPortfolio = async (data: { portfolioId: string, asset: Asset }) => {
    try {
        console.log(`Adding new asset to portfolio:${data.portfolioId} asset : `, data.asset)
        const response = await api.post(`/portfolio/${data.portfolioId}/assets`, data.asset);
        console.log("asset added:", response.data)
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};

export const getMyPortfolio = async () => {

    try {
        const response = await api.get("/portfolio/user");
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
        logout();
        }
        throw err;
    }
};

export const getPortfolioMonthlyPerformance = async (portfolioId: string) => {
    console.log("Fetching portfolio Performance...");

    try {
        const response = await api.get(`/portfolio/${portfolioId}/transactions/monthly-performance`);
        console.log("portfolio Performance fetched successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
        logout();
        }
        throw err;
    }
};

export const getAllPortfolioAssets = async (portfolioId: string) => {

    try {
        const response = await api.get(`/portfolio/${portfolioId}/assets`);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
        logout();
        }
        throw err;
    }
};

export const sellAsset = async (data :{portfolioId: string , assetId: string , sellingQuantity: number}) => {
    console.log("selling asset with data : " ,data)
    const { portfolioId, assetId, sellingQuantity } = data;
    try {
        const response = await api.delete(`/portfolio/${portfolioId}/assets/${assetId}?sellingQuantity=${sellingQuantity}`);
        console.log("asset sold successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};

export const getAllTransactionsInPortfolio = async ( portfolioId: string) => {
    console.log("getting portfolio transaction " )
    try {
        const response = await api.get(`/portfolio/${portfolioId}/transactions`);
        console.log("transactions fetched :", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};


// Market Data APIs

export const getMarketData = async (symbol: string) => {
    try {
        console.log(symbol)
        const response = await api.get(`/market-data/price/${symbol}`);
        console.log("Market data fetched successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};

export const getHistoricalMarketData = async (symbol: string) => {
    try {
        const response = await api.get(`/market-data/historical/${symbol}`);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};

export const getMarketVolatility = async (symbol: string) => {
    try {
        const response = await api.get(`/market-data/volatility/${symbol}`);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};

export const getMarketNews = async (symbol: string) => {
    try {
        const response = await api.get(`/market-data/news/${symbol}`);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};


export const getBenchmarksMonthlyLastYear = async () => {
    try {
        //todo: uncomment when the limit on alpha vantage ends
        const response = await api.get(`/market-data/benchmarks/monthly-last-year`);
        return response.data;
        return [];
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};
export const getSpyIntradayChart = async () => {
    try {
        //todo: uncomment when the limit on alpha vantage ends
        // const response = await api.get(`/market-data/spy-intraday-chart`);
        // return response.data;
        return [];
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};

export const getTopMovers = async () => {
    try {
        //todo: uncomment when the limit on alpha vantage ends
        // const response = await api.get(`/market-data/top-movers`);
        // return response.data;
        return {};
    } catch (err : any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};
export const getEconomicEvents = async () => {
    try {
        const response = await api.get(`/market-data/economic-events`);
        console.log("Economic events fetched successfully:", response.data);
        return response.data;
    } catch (err:any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};

export const getSectorsPerformance = async () => {
    try {
        const response = await api.get(`/market-data/sectors-performance`);
        console.log("Sectors performance fetched successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
};