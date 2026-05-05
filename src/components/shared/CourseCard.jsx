import * as React from "react"

export function CourseCard({ title, image, instructorName, instructorImage, level, price }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      
      {/* Course Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center mt-3">
          <img
            src={instructorImage}
            alt={instructorName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="ml-2 text-sm text-gray-600">
            {instructorName}
          </span>
        </div>

        {/* Level + Price */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            {level}
          </span>

          <span className="text-sm font-bold text-gray-800">
            {price}
          </span>
        </div>
      </div>
    </div>
  )
}