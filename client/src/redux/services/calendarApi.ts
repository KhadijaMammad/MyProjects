import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AISyncPayload,
  CalendarEventDB,
} from "../../types/calendar/calendar";

const API_BASE_URL = import.meta.env.VITE_BASE_URL

export const calendarApi = createApi({
  reducerPath: "calendarApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["CalendarEvent"],
  endpoints: (builder) => ({
    // 1. Mövcud Eventləri gətirən query
    getCalendarEvents: builder.query<{ success: boolean; data: CalendarEventDB[] }, void>({
      query: () => `calendar/events`,
      providesTags: ["CalendarEvent"],
    }),

    // 2. GOOGLE-DAN SİNXRONİZASİYA ET (BU ÇOX VACİBDİR!)
    triggerGoogleSync: builder.mutation<{ success: boolean; count: number }, void>({
      query: () => ({
        url: "/calendar/sync-from-google",
        method: "POST",
      }),
      // Sinxronizasiya bitəndə avtomatik olaraq list-i yeniləyir
      invalidatesTags: ["CalendarEvent"],
    }),

    // 3. Google Auth URL-i gətir
    getGoogleAuthUrl: builder.query<{ url: string }, { userId: string | number }>({
  query: ({ userId }) => ({
    url: "/google/url",
    params: { userId },
  }),
}),

    // 4. AI vasitəsilə sinxron et
    syncAICalendarEvent: builder.mutation<{ success: boolean; message: string; data?: any }, AISyncPayload>({
      query: (body) => ({
        url: "/calendar/ai-sync",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CalendarEvent"],
    }),

    // 5. Event-i silmək (lazım olacaq)
    deleteCalendarEvent: builder.mutation<{ success: boolean }, string>({
      query: (googleEventId) => ({
        url: `/calendar/events/${googleEventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CalendarEvent"],
    }),
  }),
});

export const {
  useGetCalendarEventsQuery,
  useSyncAICalendarEventMutation,
  useLazyGetGoogleAuthUrlQuery,
  useTriggerGoogleSyncMutation, // Yeni əlavə etdik
  useDeleteCalendarEventMutation // Yeni əlavə etdik
} = calendarApi;