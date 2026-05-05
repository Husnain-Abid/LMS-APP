import * as React from "react";
import { CourseCard } from "@/components/shared/CourseCard";
import { EditProfileDialog } from "@/components/shared/EditProfileDialog";
import { useUserProfileQuery } from "@/redux/features/apiSlice/authApi";

export function Profile() {

  const { data, isLoading, isError, refetch } = useUserProfileQuery();

  const user = data?.user;

  // ✅ Loading state
  if (isLoading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  // ✅ Error state
  if (isError) {
    return <p className="text-center mt-10 text-red-500">Failed to load profile</p>;
  }

  // ✅ Safety check
  if (!user) {
    return <p className="text-center mt-10">No user data found</p>;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">

          <img
            src={user?.profilePicture || "https://via.placeholder.com/150"}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover"
          />

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {user?.name}
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>

            <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
              {user?.role || "User"}
            </span>
          </div>

          {/* Edit Button */}
          <EditProfileDialog user={user} refetch={refetch} />

        </div>

        {/* Enrolled Courses */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Enrolled Courses
          </h3>

          <div className="grid gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3">
            {user?.enrolledCourses.length > 0 ? (
              user.enrolledCourses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No enrolled courses
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}