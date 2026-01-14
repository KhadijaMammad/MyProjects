import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Task,
  CreateTaskPayload,
  TaskResponse,
} from "../../types/tasks/task";

const API_BASE_URL = import.meta.env.VITE_BASE_URL


export const taskApi = createApi({
  reducerPath: "taskApi",
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
  tagTypes: ["Task"],
  endpoints: (builder) => ({
   getTasks: builder.query<Task[], void>({
  query: () => "/tasks",
  // Backend-dən gələn obyekti massivə çeviririk
  transformResponse: (response: any) => {
    // Əgər backend datanı "tasks" açarı ilə göndərirsə response.tasks yazırıq
    return Array.isArray(response) ? response : response.tasks || response.data || [];
  },
  providesTags: (result) =>
    result
      ? [
          ...result.map(({ id }) => ({ type: "Task" as const, id })),
          { type: "Task", id: "LIST" },
        ]
      : [{ type: "Task", id: "LIST" }],
}),

    createTask: builder.mutation<TaskResponse, CreateTaskPayload[]>({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),

    updateTask: builder.mutation<
      Task,
      { id: number; data: Partial<CreateTaskPayload> }
    >({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: Array.isArray(data) ? data : [data],
      }),
      // result-dan asılı olmamaq üçün birbaşa arqumentdən gələn id-ni istifadə edirik
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" }, // Siyahının da yenilənməsi üçün
      ],
    }),

    // 4. Tapşırığı silmək
    deleteTask: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
