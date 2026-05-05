import './App.css'
import { Auth } from './pages/Auth.jsx'
import Home from './pages/Home.jsx'
import { Layout } from './components/Layout/Layout'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MyLearning } from './pages/MyLearning'
import { Profile } from './pages/Profile'
import { AdminLayout } from './components/Layout/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Courses from './pages/admin/Courses'
import AddCourses from './pages/admin/AddCourses'
import EditCourses from './pages/admin/EditCourses'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Auth />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "my-learning",
        element: <MyLearning />
      }
    ]
  },


  // Admin routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "courses", element: <Courses /> },
      { path: "courses/add", element: <AddCourses /> },
      { path: "courses/edit/:id", element: <EditCourses /> }
    ]
  }


])

function App() {
  return <RouterProvider router={router} />
}

export default App