import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const faceApi = createApi({
  reducerPath: "faceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/face", // ✅ backend base URL
  }),
  endpoints: (builder) => ({
    // ✅ For registering face
    registerFace: builder.mutation({
      query: ({ name, imageBlob }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", imageBlob, "face.jpg");

        return {
          url: "/register",
          method: "POST",
          body: formData,
        };
      },
    }),

    // ✅ For recognizing face
    recognizeFace: builder.mutation({
      query: (formDataOrBlob) => {
        const formData =
          formDataOrBlob instanceof FormData
            ? formDataOrBlob
            : (() => {
                const fd = new FormData();
                fd.append("image", formDataOrBlob, "face.jpg");
                return fd;
              })();

        return {
          url: "/recognize",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useRegisterFaceMutation, useRecognizeFaceMutation } = faceApi;
