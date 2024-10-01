import React, { createContext, useContext } from "react";
import axios, { AxiosInstance } from "axios";


const AxiosContext = createContext<AxiosInstance | null>(null);

function AxiosProvider({ children }: { children: React.ReactNode }) {
    const client: AxiosInstance = axios.create({
        baseURL: "http://127.0.0.1:8000",
        // xsrfCookieName: 'csrftoken',
        // xsrfHeaderName: 'X-CSRFToken',
        // withCredentials: true,
    });

    return (
        <AxiosContext.Provider value={client}>
            {children}
        </AxiosContext.Provider>
    );
}

function useAxios(): AxiosInstance {
    const context = useContext(AxiosContext);
    if (!context) {
        throw new Error("useAxios must be used within an AxiosProvider");
    }
    return context;
}

export {
    AxiosProvider,
    useAxios,
};
