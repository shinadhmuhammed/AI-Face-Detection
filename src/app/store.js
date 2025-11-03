import { configureStore } from "@reduxjs/toolkit";
import { faceApi } from "../services/faceApiService";

export const store = configureStore({
  reducer: {
    [faceApi.reducerPath]: faceApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(faceApi.middleware),
});
