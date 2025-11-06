import { configureStore } from "@reduxjs/toolkit";
import { faceApi } from "../services/faceApiService";
import { chatApi } from "@/services/chatApiService";

export const store = configureStore({
  reducer: {
    [faceApi.reducerPath]: faceApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(faceApi.middleware,chatApi.middleware),
});
