import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { categoryApi } from "../services/categoryApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { newsApi } from "../services/newsApi";
import { notesApi } from "../services/notesApi";
import { folderApi } from "../services/folderApi";
import { calendarApi } from "../services/calendarApi";
import authReducer from "../slices/auth/authSlice";
import { taskApi } from "../services/taskApi";
import { dashboardApi } from "../services/dashboardApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [folderApi.reducerPath]: folderApi.reducer,
    [calendarApi.reducerPath]: calendarApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      newsApi.middleware,
      notesApi.middleware,
      folderApi.middleware,
      calendarApi.middleware,
      taskApi.middleware,
      dashboardApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
