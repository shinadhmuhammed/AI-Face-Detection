import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/chat",
  }),
  endpoints: (builder) => ({
    sendChatMessage: builder.mutation({
      query: ({ message, user, emotion, guest = false }) => ({
        url: "/chat",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          user,
          emotion,
          guest,
        }),
      }),
    }),

    getChatHistory: builder.query({
      query: (user) => `/chat/history/${user}`,
    }),
  }),
});

export const { useSendChatMessageMutation, useGetChatHistoryQuery } = chatApi;
