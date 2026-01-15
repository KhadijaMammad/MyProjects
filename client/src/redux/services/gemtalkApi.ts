import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GemTalk, ChatMessage } from '../../types/gemtalk/gemtalk';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const gemTalkApi = createApi({
  reducerPath: 'gemTalkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/gemtalk`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['GemTalk'],
  endpoints: (builder) => ({
    getHistory: builder.query<GemTalk[], void>({
      query: () => '/history',
      providesTags: ['GemTalk'],
    }),

    getOneTalk: builder.query<GemTalk, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'GemTalk', id }],
    }),

    streamingDiscussion: builder.query<ChatMessage[], { topic: string; rounds: number }>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheEntryRemoved }) {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`${API_BASE_URL}/gemtalk/discuss`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(arg),
          });

          if (!response.body) return;
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            lines.forEach((line) => {
              if (line.startsWith('data: ')) {
                try {
                  const jsonStr = line.replace('data: ', '').trim();
                  const data = JSON.parse(jsonStr);
                  // Backend-dən gələn "history" sözünü ChatMessage massivi kimi qəbul edirik
                  if (data.history) {
                    updateCachedData((draft) => {
                      // Massivi təmizləyib yenisini yazırıq
                      draft.splice(0, draft.length, ...data.history);
                    });
                  }
                } catch (e) { }
              }
            });
          }
        } catch (err) {
          console.error('Streaming error:', err);
        }
        await cacheEntryRemoved;
      },
    }),
  }),
});

export const { 
  useGetHistoryQuery, 
  useLazyStreamingDiscussionQuery,
  useLazyGetOneTalkQuery 
} = gemTalkApi;