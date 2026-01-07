import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category } from "../../types/news/category";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => "/categories",
      transformResponse: (response: any) => response.data
    }),
    getCategoryById: builder.query<Category, number>({
      query: (categoryId) => `/categories/${categoryId}`,
    }),
    getCategoryByName: builder.query<Category, string>({
      query: (categoryName) => `/categories/name/${categoryName}`,
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetCategoryByNameQuery,
} = categoryApi;
