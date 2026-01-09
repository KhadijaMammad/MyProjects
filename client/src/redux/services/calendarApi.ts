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
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["CalendarEvent"],
  endpoints: (builder) => ({
    getCalendarEvents: builder.query<
      { success: boolean; data: CalendarEventDB[] },
      void
    >({
      query: () => ({
        url: "/calendar/events",
      }),
      providesTags: ["CalendarEvent"],
    }),
    syncAICalendarEvent: builder.mutation<
      { success: boolean; message: string; data?: any },
      AISyncPayload
    >({
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
} = calendarApi;
