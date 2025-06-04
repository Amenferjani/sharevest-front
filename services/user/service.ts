import { logout } from "@/lib/utils";
import api from "../api";

export const getUserProfile = async () => {
    console.log("Fetching user profile...")

    const response = await api.get("/users/me");
    if (response.status === 401) {
        logout();
        throw new Error('Unauthorized');
    }
    console.log("User profile fetched successfully:", response.data);
    return response.data;
};

export const userLogout = async () => {
    console.log("logging out...")

    const response = await api.post("/users/auth/logout");
    if (response.status === 401) {
        logout();
        throw new Error('Unauthorized');
    }
    console.log("logged out:", response.data);
    return response.data;
};

export const getUserRisk = async () => {
    console.log("Fetching user risk...");

    try {
        const response = await api.get("/users/risk");
        console.log("User risk fetched successfully:", response.data);
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) {
        logout();
        }
        throw err;
    }
};
