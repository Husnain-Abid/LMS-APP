import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useNavigate } from "react-router-dom"
import { useCreateCourseMutation } from "@/redux/features/apiSlice/courseApi"

export default function AddCourse() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const handleSubmit = async () => {
    
    if (!title || !category) {
      alert("All fields required");
      return;
    }

    try {
      const res = await createCourse({ title, category }).unwrap();
      console.log("Created:", res);

      navigate("/admin/courses");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Error creating course");
    }

  };


  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Add New Course
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Create and publish a new course
        </p>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Title</label>
            <Input placeholder="e.g. React for Beginners" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>

            <Select onValueChange={(value) => setCategory(value)} >
              <SelectTrigger>
                <SelectValue className="text-sm font-medium px-4" placeholder="Select category" />
              </SelectTrigger>

              <SelectContent className="mt-8">
                <SelectItem value="react">React JS</SelectItem>
                <SelectItem value="node">Node JS</SelectItem>
                <SelectItem value="docker">Docker</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="backend">Backend Development</SelectItem>
                <SelectItem value="fullstack">Full Stack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/courses")}
            >
              Cancel
            </Button>

            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Course"}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}