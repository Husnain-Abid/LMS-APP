import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/shared/Navbar"
import { Toaster } from "sonner"

export function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
    </>
  )
}