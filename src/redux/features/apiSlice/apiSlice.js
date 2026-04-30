import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1/auth/",
        credentials: "include" // for cookies
    }),
    endpoints: (builder) => ({

        // Register request
        userRegister: builder.mutation({
            query: (newPost) => ({
                url: "register",
                method: "POST",
                body: newPost
            })
        }),

        // Login request
        userLogin: builder.mutation({
            query: (newPost) => ({
                url: "login",
                method: "POST",
                body: newPost
            })
        })

    })
});

export const { useUserRegisterMutation, useUserLoginMutation } = apiSlice;