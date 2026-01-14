import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_BASE_URL
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_BASE_URL 
  }),
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => 'dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;