import * as React from "react"

export function CourseSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden animate-pulse">
      
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700" />

      <div className="p-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />

        <div className="flex items-center mt-4">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="ml-2 h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
        </div>

        <div className="flex justify-between mt-4">
          <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 w-10 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  )
}