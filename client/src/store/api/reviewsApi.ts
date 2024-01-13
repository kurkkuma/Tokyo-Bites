import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  tagTypes: ["Reviews"],
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://tokyo-bites-api.onrender.com/",
    baseUrl: "http://localhost:8080/",
  }),
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "/reviews",
      providesTags: ["Reviews"],
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: "/add-review",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (body) => ({
        url: "/delete-review",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetReviewsQuery,
  useDeleteReviewMutation,
} = reviewsApi;
