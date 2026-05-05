import * as React from "react"
import { CourseCard } from "../shared/CourseCard"
import { CourseSkeleton } from "../shared/CourseSkeleton";

export function Course() {

  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);
  
  React.useEffect(() => {
    // simulate API call
    setTimeout(() => {
      setCourses([
        {
          title: "React for Beginners",
          image: "/courses/react.jpg",
          instructorName: "John Doe",
          instructorImage: "/instructors/john.jpg",
          level: "Beginner",
          price: "$49",
        },
        {
          title: "Advanced JavaScript",
          image: "/courses/js.jpg",
          instructorName: "Sarah Smith",
          instructorImage: "/instructors/sarah.jpg",
          level: "Advanced",
          price: "$79",
        },
        {
          title: "UI/UX Design Basics",
          image: "/courses/uiux.jpg",
          instructorName: "Ali Khan",
          instructorImage: "/instructors/ali.jpg",
          level: "Beginner",
          price: "$39",
        },
      ])
      setLoading(false)
    }, 1500)
  }, [])

  return (
 <section className="py-16 bg-gray-50 dark:bg-gray-900 transition">
      <div className="max-w-6xl mx-auto px-4">
        
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
          Popular Courses
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
          Choose from our top courses
        </p>

        <div className="grid gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3">
          
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <CourseSkeleton key={i} />
              ))
            : courses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
              
        </div>
      </div>
    </section>
  )
}



