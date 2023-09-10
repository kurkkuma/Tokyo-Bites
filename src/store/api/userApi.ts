import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (body) => ({
        url: "add-user",
        method: "POST",
        body,
      }),
    }),
    // updateFavorites: builder.mutation({
    //   query: (body) => ({
    //     url: "update-favorites",
    //     method: "POST",
    //     body,
    //   }),
    // }),
    addFavorite: builder.mutation({
      query: (body) => ({
        url: "add-favorite",
        method: "POST",
        body,
      }),
    }),
    deleteFavorites: builder.mutation({
      query: (body) => ({
        url: "delete-favorite",
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useAddFavoriteMutation,
  useDeleteFavoritesMutation,
} = userApi;
