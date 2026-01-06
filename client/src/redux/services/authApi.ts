import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginResponse } from "../../types/auth/login";

export const authApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { username?: string; email?: string; password: string }>({
            query: (payload) => ({
                url: '/auth/login/',
                method: 'POST',
                body: payload,
            }) 
        }),
        refreshToken: builder.mutation<LoginResponse, { refresh: string }>({
            query: (payload) => ({
                url: '/auth/refresh/',
                method: 'POST',
                body: payload,
            })
        }),
        logout: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: '/auth/logout/',
                method: 'POST',
            })
        })
    }),
});

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } = authApi;
