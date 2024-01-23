import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://tokyo-bites-api.onrender.com/",
    baseUrl: "https://dull-plum-cod-suit.cyclic.app/",

    // baseUrl: "http://localhost:8080/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
