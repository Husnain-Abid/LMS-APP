import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { Navbar } from "../shared/Navbar"

export function AdminLayout() {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Admin</h2>
          <nav className="flex flex-col gap-3">
            <a href="/admin">Dashboard</a>
            <a href="/admin/users">Users</a>
            <a href="/admin/courses">Courses</a>
          </nav>
        </aside>

        {/* Right Section */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>

      <Toaster />

    </>
  )
}