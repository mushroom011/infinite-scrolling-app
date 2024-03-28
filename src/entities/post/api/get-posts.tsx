import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../types/post";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], { start: number; limit: number }>({
      query: ({ start, limit }) => `posts/?_start=${start}&_limit=${limit}`,
    }),
    getPostById: builder.query<Post, number | string>({
      query: (id) => `posts/${id}`,
    }),
  }),
});

export const { useGetPostByIdQuery, useGetAllPostsQuery } = postApi;
