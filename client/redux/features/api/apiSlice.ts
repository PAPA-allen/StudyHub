import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
  }),
    endpoints: (builder) => ({
        //refresh token endpoint
        refreshToken: builder.query({
            query: () => ({
                url: 'refreshtoken',
                method: 'POST',
                credentials: "include" as const,
            }),
        }),
  }),
});

export const {useRefreshTokenQuery} = apiSlice;
