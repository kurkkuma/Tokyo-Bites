// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const favoritesApi = createApi({
//   reducerPath: "favoritesApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
//   endpoints: (builder) => ({
//     addFavorite: builder.mutation({
//       query: (body) => ({
//         url: "add-favorite",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Favorite"],
//     }),

//     deleteFavorites: builder.mutation({
//       query: (body) => ({
//         url: "delete-favorite",
//         method: "DELETE",
//         body,
//       }),
//       invalidatesTags: ["Favorite"],
//     }),
//   }),
// });

// export const { useAddFavoriteMutation, useDeleteFavoritesMutation } =
//   favoritesApi;
