import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tokyo-bites-api.vercel.app/",
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (body) => ({
        url: "add-user",
        method: "POST",
        body,
      }),
    }),

    updateFavorites: builder.mutation({
      query: (body) => ({
        url: "update-favorite",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useAddUserMutation, useUpdateFavoritesMutation } = userApi;
