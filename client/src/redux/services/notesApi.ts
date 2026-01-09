import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api',
    // BURADAN BAŞLAYIR: Header-ləri avtomatik əlavə edirik
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
    getNotes: builder.query<any, any>({
      query: (params) => ({
        url: '/notes',
        params: {
          search: params.search,
          folderId: params.folderId,
          favorite: params.isFavorite ? 'true' : undefined, 
          trash: params.isDeleted ? 'true' : undefined,  
        },
      }),
      providesTags: ['Note'],
    }),
    
    addNote: builder.mutation<any, any>({
      query: (body) => ({
        url: '/notes',
        method: 'POST',
        body: {
          title: body.title,
          description: body.description,
          folder_id: body.folder_id,
        },
      }),
      invalidatesTags: ['Note'],
    }),

    updateNote: builder.mutation<any, any>({
      query: ({ id, ...body }) => ({
        url: `/notes/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Note'],
    }),

    toggleFavorite: builder.mutation<any, number>({
      query: (id) => ({
        url: `/notes/${id}/favorite`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Note'],
    }),

    moveToTrash: builder.mutation<any, number>({
      query: (id) => ({
        url: `/notes/${id}/trash`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Note'],
    }),

    restoreNote: builder.mutation<any, number>({
      query: (id) => ({
        url: `/notes/${id}/restore`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Note'],
    }),

    hardDelete: builder.mutation<any, number>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useToggleFavoriteMutation,
  useMoveToTrashMutation,
  useRestoreNoteMutation,
  useHardDeleteMutation,
} = notesApi;