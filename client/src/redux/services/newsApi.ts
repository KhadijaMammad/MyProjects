import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { News, NewsResponse } from "../../types/news/newsList";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getNews: builder.query<News[], { category_id?: number | null; page: number; lang?: string }>({
      query: ({ category_id, page, lang = 'fa' }) => {
        if (category_id) {
          return `/news/category/${category_id}/lang/${lang}?page=${page}&limit=30`;
        }
        return `/news?page=${page}&limit=30&lang=${lang}`;
      },
      transformResponse: (response: NewsResponse) => response.data,
      
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) return newItems;
        return [...currentCache, ...newItems];
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getNewsById: builder.query<News, number>({
      query: (id) => `/news/${id}`,
      transformResponse: (response: { data: News }) => response.data,
    }),
  }),
});

export const { useGetNewsQuery, useGetNewsByIdQuery } = newsApi;