import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { categoryApi } from "../services/categoryApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { newsApi } from "../services/newsApi";
import { notesApi } from "../services/notesApi";
import { folderApi } from "../services/folderApi";
import { calendarApi } from "../services/calendarApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [folderApi.reducerPath]: folderApi.reducer,
    [calendarApi.reducerPath]: calendarApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      newsApi.middleware,
      notesApi.middleware,
      folderApi.middleware,
      calendarApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
