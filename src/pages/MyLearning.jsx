import { CourseCard } from '@/components/shared/CourseCard'
import { CourseSkeleton } from '@/components/shared/CourseSkeleton'
import React from 'react'

export function MyLearning() {

 const [loading, setLoading] = React.useState(true)
  const [enrolledCourses, setEnrolledCourses] = React.useState([])

  React.useEffect(() => {
    // simulate API (replace with real backend later)
    setTimeout(() => {
      setEnrolledCourses([
        {
          title: "React for Beginners",
          image: "/courses/react.jpg",
          instructorName: "John Doe",
          instructorImage: "/instructors/john.jpg",
          level: "Beginner",
          price: "$49",
        },
      ])
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen transition">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
          My Learning
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
          Your enrolled courses
        </p>

        {/* Content */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">

          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <CourseSkeleton key={i} />
            ))
          ) : enrolledCourses.length > 0 ? (
            enrolledCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                You haven't enrolled in any courses yet.
              </p>

              <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                Browse Courses
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}


