import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

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
                method: 'GET',
                credentials: "include" as const,
            }),
        }),
        loadUser: builder.query({
            query: () => ({
                url: 'me',
                method: 'GET',
                credentials: "include" as const,
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) { 
                try {
                    const result = await queryFulfilled;
                    console.log('Query result:', result); // Check the structure of the result
                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));
                 } catch (error: any) {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log('Error during query fulfillment:', error);
                    }
                 }
                 
            }
        })
    }),
 
});

export const {useRefreshTokenQuery,useLoadUserQuery} = apiSlice;
