import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AISyncPayload,
  CalendarEventDB,
} from "../../types/calendar/calendar";

export const calendarApi = createApi({
  reducerPath: "calendarApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      console.log("Göndərilən Token:", token)
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log("Headers-ə əlavə olunan tam string:", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["CalendarEvent"],
  endpoints: (builder) => ({
    // 1. Mövcud Eventləri gətirən query
    getCalendarEvents: builder.query<{ success: boolean; data: CalendarEventDB[] }, void>({
      query: () => `calendar/events?t=${Date.now()}`,
      providesTags: ["CalendarEvent"],
    }),

    getGoogleAuthUrl: builder.query<{ url: string }, void>({
      query: () => ({
        url: "/google/url", 
        // params: { userId },
      }),
    }),

    // 3. Mövcud AI Sync mutation
    syncAICalendarEvent: builder.mutation<{ success: boolean; message: string; data?: any }, AISyncPayload>({
      query: (body) => ({
        url: "/calendar/ai-sync",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CalendarEvent"],
    }),
  }),
});

export const {
  useGetCalendarEventsQuery,
  useSyncAICalendarEventMutation,
  useLazyGetGoogleAuthUrlQuery, 
} = calendarApi;