import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { useFetchCoursesQuery } from "@/redux/features/apiSlice/courseApi"

export default function Courses() {

    const navigate = useNavigate()

    const { data, isLoading, isError } = useFetchCoursesQuery();

    const courses = data?.courses || [];

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load courses</p>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Courses
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Manage all your courses
                    </p>
                </div>

                <Button onClick={() => navigate("/admin/courses/add")}>
                    Add Course
                </Button>


            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
                <Input placeholder="Search courses..." className="max-w-sm" />
            </div>

            {/* Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Courses</CardTitle>
                </CardHeader>


                <CardContent>
                    <div className="rounded-lg border overflow-hidden">
                        <Table>

                            <TableHeader className="bg-gray-50 dark:bg-gray-800">
                                <TableRow>
                                    <TableHead className="py-3">Course</TableHead>
                                    <TableHead>Instructor</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right pr-6">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow
                                        key={course._id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                    >
                                        {/* Course */}
                                        <TableCell className="py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                                    {course.title}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Instructor */}
                                        <TableCell className="text-gray-700 dark:text-gray-300">
                                            {course.creator}
                                        </TableCell>

                                        {/* Students */}
                                        <TableCell>
                                            <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm">
                                                {course.enrolledStudents.length}
                                            </span>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            {course.isPublish ? (
                                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                                                    Draft
                                                </span>
                                            )}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right pr-6">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" onClick={() => navigate(`/admin/courses/edit/${course._id}`)}>
                                                    Edit
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </div>
                </CardContent>

            </Card>



        </div>
    )
}