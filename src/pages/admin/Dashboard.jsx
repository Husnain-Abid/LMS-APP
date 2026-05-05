import React from "react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Overview of your LMS platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: "1,240" },
          { title: "Total Courses", value: "85" },
          { title: "Enrollments", value: "3,420" },
          { title: "Revenue", value: "$12,430" },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700 p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.title}
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700 p-5 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Recent Users
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-500 dark:text-gray-400 dark:border-gray-700">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3 text-gray-900 dark:text-gray-100">
                  Ali Khan
                </td>
                <td className="text-gray-600 dark:text-gray-300">
                  ali@example.com
                </td>
                <td>
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                    Active
                  </span>
                </td>
                <td className="text-gray-600 dark:text-gray-300">
                  May 1, 2026
                </td>
              </tr>

              <tr className="border-b dark:border-gray-700">
                <td className="py-3 text-gray-900 dark:text-gray-100">
                  Sara Ahmed
                </td>
                <td className="text-gray-600 dark:text-gray-300">
                  sara@example.com
                </td>
                <td>
                  <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300">
                    Pending
                  </span>
                </td>
                <td className="text-gray-600 dark:text-gray-300">
                  Apr 29, 2026
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700 p-5 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Recent Courses
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                React for Beginners
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                120 students
              </p>
            </div>
            <span className="text-sm text-blue-600 dark:text-blue-400">
              Published
            </span>
          </div>

          <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Advanced JavaScript
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                80 students
              </p>
            </div>
            <span className="text-sm text-yellow-600 dark:text-yellow-400">
              Draft
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}