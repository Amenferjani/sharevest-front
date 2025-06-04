import { ROLE_ROUTE, UserRole } from "@/types/types";
import axios from "axios"

export function getRedirectRoute(roles: UserRole[]): string {
    for (const role of (Object.keys(ROLE_ROUTE) as UserRole[])) {
        if (roles.includes(role)) {
            return ROLE_ROUTE[role];
        }
    }
    return "/dashboard";
}

const apiUrl = 'http://localhost:3000'
export const registerUser = async (data: {
        username:string,
        email: string,
        password: string,
}) => {
    console.log(data)
    const response = await axios.post(`${apiUrl}/users/register`, data)
    return response.data
}

export const loginUser = async (data: {
    email: string,
    pass: string
}) => {
    console.log(data)
    const response = await axios.post(`${apiUrl}/users/auth/login`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
    console.log(response.data);
    return response.data
}

export const googleAuth = async () => {
    window.location.href = `${apiUrl}/users/auth/google`;
}