import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginUser } from "../authSlice";

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Courses"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1/courses/",
        credentials: "include" // for cookies
    }),
    endpoints: (builder) => ({

        // Create Course request
        createCourse: builder.mutation({
            query: (newCourse) => ({
                url: "/",
                method: "POST",
                body: newCourse
            }),
            invalidatesTags: ["Courses"],
        }),

        // fetchCourses
        fetchCourses: builder.query({
            query: () => ({
                url: "/",
                method: "GET"
            }),
            providesTags: ["Courses"]
        }),

        // editCourses
      editCourse: builder.mutation({
  query: ({ id, data }) => ({
    url: `/${id}`,
    method: "PUT",
    body: data,
  }),
  invalidatesTags: ["Courses"],
}),

        // getCourseById
        getCourseById: builder.query({
            query: (id) => ({ 
                url: `/${id}`,
                method: "GET"
            }),
            providesTags: ["Courses"]
        }),

        // deleteCourses
        deleteCourses: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Courses"],
        }),

    })
});


export const { 
    useCreateCourseMutation, 
    useFetchCoursesQuery, 
    useEditCourseMutation,   // ✅ singular
    useGetCourseByIdQuery, 
    useDeleteCoursesMutation 
} = courseApi;