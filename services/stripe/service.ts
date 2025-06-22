import { logout } from "@/lib/utils";
import api from "../api";

export async function createCheckoutSession() {
    try {
        const response = await api.post('http://localhost:3000/payment/stripe/checkout');
        console.log('Checkout Session Created:', response.data);
        return response.data
    } catch (err: any) {
        if (err.response?.status === 401) {
            logout();
        }
        throw err;
    }
}