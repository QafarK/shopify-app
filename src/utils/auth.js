import axios from "axios";

import { getRefreshToken, setToken, setRefreshToken, clearToken } from "./store.js";

export const refreshToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const res = await axios.post('https://ilkinibadov.com/api/v1/auth/refresh', {
            refreshToken
        });

        const {accessToken, refreshToken: newRefreshToken} = res.data;

        setToken(accessToken);
        setRefreshToken(newRefreshToken);

        return accessToken
    } catch (error) {
        console.error("Error refreshing token:", error);
        clearToken();
        throw error;
    }
}