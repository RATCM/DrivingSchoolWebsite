import { API_BASE_URL } from "./config";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) return null;

    try {
        const response = await fetch(`${API_BASE_URL}auth/refresh`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${refreshToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) return null;

        const data = await response.json();

        // Adjust depending on your backend response
        const newAccessToken = data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        return newAccessToken;
    } catch {
        return null;
    }
}

export async function apiRequest<T>(
    endpoint: string,
    method: HttpMethod = "GET",
    body?: unknown,
    retry = true
): Promise<T> {
    let accessToken = localStorage.getItem("accessToken");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401 && retry) {
        if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refreshAccessToken().finally(() => {
                isRefreshing = false;
            });
        }

        const newToken = await refreshPromise;

        if (!newToken) {
            // Refresh failed → force logout
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            throw new Error("Session expired");
        }

        // retry request once

        return apiRequest<T>(endpoint, method, body, false);
    }
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}