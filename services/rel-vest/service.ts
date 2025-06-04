// services/company.ts
import { logout } from "@/lib/utils";
import api from "../api";
import { Company, Investor, Event } from "@/types/types";

export const addCompany = async (companyDto: Company): Promise<Company> => {
    console.log("Adding company...", companyDto);
    try {
        const response = await api.post<Company>("/rel-vest/companies", companyDto);
        console.log("Company added successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        console.error("Add company failed:", err);
        throw err;
    }
};

export const updateCompany = async(
    data :{id: string,
    companyDto: Company}
): Promise<Company> => {
    console.log(`Updating company ${data.id}...`, data.companyDto);
    try {
        const response = await api.patch<Company>(
            `/rel-vest/companies/${data.id}`,
            data.companyDto
        );
        console.log("Company updated successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        console.error(`Update company ${data.id} failed:`, err);
        throw err;
    }
};

export const getCompanies = async (
    filters: Record<string, any> = {}
): Promise<Company[]> => {
    console.log("Fetching companies with filters:", filters);
    try {
        const response = await api.get("/rel-vest/companies", { params: filters });

        console.log("Companies fetched successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        // console.error("Fetch companies failed:", err);
        throw err;
    }
};

export const getCompanyDetails = async (
    id: string
): Promise<Company> => {
    console.log(`Fetching details for company ${id}...`);
    try {
        const response = await api.get<Company>(`/rel-vest/companies/${id}`);
        console.log("Company details fetched successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        console.error(`Fetch company ${id} failed:`, err);
        throw err;
    }
};

export const deleteCompany = async (
    id: string
): Promise<void> => {
    console.log(`Deleting  for company ${id}...`);
    try {
        const response = await api.delete(`/rel-vest/companies/${id}`);
        console.log("Company deleted successfully:", response.data);
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        throw err;
    }
};

export const createEvent = async (
    eventDto: Event
): Promise<Event> => {
    console.log("creating event")
    try {
        const response = await api.post(`/rel-vest/events`, eventDto);
        console.log("Event created successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        throw err;
    }
};

export const updateEvent = async (
    data: {
        id: string,
        eventDto: Event
    }
): Promise<Event> => {
    console.log(`Updating event ${data.id}...`, data.eventDto);
    try {
        const response = await api.put<Event>(
            `/rel-vest/events/${data.id}`,
            data.eventDto
        );
        console.log("Event updated successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        console.error(`Update event ${data.id} failed:`, err);
        throw err;
    }
};

export const getEvents = async (
    eventDto: Event
): Promise<Event> => {
    console.log("creating event")
    try {
        const response = await api.post(`/rel-vest/events`, eventDto);
        console.log("Event created successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        throw err;
    }
};
export const getEventDetails = async (
    id: string
): Promise<Event> => {
    console.log(`Fetching details for event ${id}...`);
    try {
        const response = await api.get<Event>(`/rel-vest/events/${id}`);
        console.log("Event details fetched successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        console.error(`Fetch event ${id} failed:`, err);
        throw err;
    }
};

export const getEventsByCompany = async (
    companyId: string
): Promise<Event[]> => {
    console.log("Getting events by company")
    try {
        const response = await api.get(`/rel-vest/events/company/${companyId}`);
        console.log("Events fetched successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        throw err;
    }
};

export const deleteEvent = async (
    id: string
): Promise<void> => {
    console.log(`Deleting  for event ${id}...`);
    try {
        const response = await api.delete(`/rel-vest/events/${id}`);
        console.log("Event deleted successfully:", response.data);
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        throw err;
    }
};

export const getInvestorsByCompany = async(
    companyId: string
): Promise<Investor> => {
    console.log("Getting investors by company")
    try {
        const response = await api.get(`/rel-vest/investors/company/${companyId}`);
        console.log("Company deleted successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        throw err;
    }
}

export const getInvestorById = async (): Promise<Investor> => {
    console.log("getting investor By id")
    try {
        const response = await api.get(`/rel-vest/investors/byId`);
        console.log("investor fetched successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        throw err;
    }
};

export const createInvestor = async (dto: Investor): Promise<Investor> => {
    console.log("Creating investor...", dto);
    try {
        const response = await api.post<Investor>("/rel-vest/investors", dto);
        console.log("Investor created successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        console.error("Create investor failed:", err);
        throw err;
    }
};

export const linkInvestorToCompany = async (companyId: string) => {
    console.log("Linking investor to company", companyId);
    try {
        const response = await api.post(`/rel-vest/investors/link/${companyId}`);
        console.log("Investor linked to company successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        console.error("Link investor to company failed:", err);
        throw err;
    }
};

export const unlinkInvestorFromCompany = async (companyId: string) => {
    console.log("unLinking investor to company", companyId);
    try {
        const response = await api.delete(`/rel-vest/investors/unlink/${companyId}`);
        console.log("Investor unlinked from company successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
            throw new Error("Unauthorized");
        }
        console.error("unLink investor to company failed:", err);
        throw err;
    }
}