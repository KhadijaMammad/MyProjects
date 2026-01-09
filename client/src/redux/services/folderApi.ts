import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Folder, CreateFolderDTO, UpdateFolderRequest } from '../../types/folders/folder';

interface FolderResponse {
  success: boolean;
  data: Folder[];
}

export const folderApi = createApi({
  reducerPath: 'folderApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Folder'],
  endpoints: (builder) => ({
    getFolders: builder.query<FolderResponse, string | void>({
      query: (search = '') => `/folders${search ? `?search=${search}` : ''}`,
      providesTags: ['Folder'],
    }),

    addFolder: builder.mutation<Folder, CreateFolderDTO>({
      query: (body) => ({
        url: '/folders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Folder'],
    }),

    getFolderById: builder.query<Folder, number>({
      query: (id) => `/folders/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Folder', id }],
    }),

    updateFolder: builder.mutation<Folder, UpdateFolderRequest>({
      query: ({ id, name }) => ({
        url: `/folders/${id}`,
        method: 'PUT',
        body: { name },
      }),
      invalidatesTags: ['Folder'],
    }),

    deleteFolder: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/folders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Folder'],
    }),


    togglePinFolder: builder.mutation<Folder, number>({
      query: (id) => ({
        url: `/folders/pin/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Folder'],
    }),
  }),
});

export const { 
  useGetFoldersQuery, 
  useAddFolderMutation, 
  useGetFolderByIdQuery,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
  useTogglePinFolderMutation 
} = folderApi;