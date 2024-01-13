import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://tokyo-bites-api.onrender.com/",
    baseUrl: "http://localhost:8080/",
  }),

  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (body) => ({
        url: "add-user",
        method: "POST",
        body,
      }),
    }),
    addFavorite: builder.mutation({
      query: (body) => ({
        url: "add-favorite",
        method: "PUT",
        body,
      }),
    }),
    deleteFavorite: builder.mutation({
      query: (body) => ({
        url: "delete-favorite",
        method: "DELETE",
        body,
      }),
    }),
    addToBasket: builder.mutation({
      query: (body) => ({
        url: "add-basket",
        method: "PUT",
        body,
      }),
    }),
    deleteFromBasket: builder.mutation({
      query: (body) => ({
        url: "delete-basket",
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useAddToBasketMutation,
  useDeleteFromBasketMutation,
} = userApi;
