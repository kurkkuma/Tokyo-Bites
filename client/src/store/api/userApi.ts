import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (body) => ({
        url: "add-user",
        method: "POST",
        body,
      }),
      providesTags: (_result: any) => ["User"],
    }),
    // addFavorite: builder.mutation({
    //   query: (body) => ({
    //     url: "add-favorite",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    // deleteFavorites: builder.mutation({
    //   query: (body) => ({
    //     url: "delete-favorite",
    //     method: "DELETE",
    //     body,
    //   }),
    //   invalidatesTags: ["User"],
    // }),
    updateFavorites: builder.mutation({
      query: (body) => ({
        url: "update-favorite",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAddUserMutation,
  // useAddFavoriteMutation,
  // useDeleteFavoritesMutation,
  useUpdateFavoritesMutation,
} = userApi;
