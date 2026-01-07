import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { categoryApi } from "../services/categoryApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { newsApi } from "../services/newsApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, categoryApi.middleware, newsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
