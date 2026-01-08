import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/', 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken'); 
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Note'],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: (search) => `notes${search ? `?search=${search}` : ''}`,
      providesTags: ['Note'],
    }),
    getNoteById: builder.query({
      query: (id) => `notes/${id}`,
      providesTags: (id) => [{ type: 'Note', id }],
    }),
    addNote: builder.mutation({
      query: (body) => ({
        url: 'notes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `notes/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;