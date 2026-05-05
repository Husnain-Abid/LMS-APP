import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginUser } from "../authSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1/auth/",
        credentials: "include" // for cookies
    }),
    endpoints: (builder) => ({

        // Register request
        userRegister: builder.mutation({
            query: (newUser) => ({
                url: "register",
                method: "POST",
                body: newUser
            })
        }),

        // Login request
        userLogin: builder.mutation({
            query: (loginData) => ({
                url: "login",
                method: "POST",
                body: loginData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(loginUser(data));
                } catch (error) {
                    console.error("Login failed:", error);
                }
            }
        }),
        
        // ✅ Get Profile
        userProfile: builder.query({
            query: () => ({
                url: "profile",
                method: "GET"
            })
        }),

        // ✅ update Profile
        updateUserProfile: builder.mutation({
            query: (updatedProfile) => ({
                url: "profile/update",
                method: "PUT",
                body: updatedProfile
            })
        }),
   
        // ✅ Logout
        userLogout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST"
            })
        }),


    })
});

export const { useUserRegisterMutation, useUserLoginMutation, useUserProfileQuery, useUpdateUserProfileMutation, useUserLogoutMutation } = authApi;
