import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { useEffect } from "react";
import { useEditCourseMutation, useGetCourseByIdQuery } from "@/redux/features/apiSlice/courseApi";


export default function EditCourses() {

  const { id } = useParams();
  const navigate = useNavigate();

const [editCourses] = useEditCourseMutation();
  const { data, isLoading, isError } = useGetCourseByIdQuery(id);


  const [course, setCourse] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    price: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      setCourse({ ...course, thumbnail: files[0] });
    } else {
      setCourse({ ...course, [name]: value });
    }
  };

  const handlePublish = () => {
    console.log("Publish course:", course);
  };

  const handleDelete = () => {
    console.log("Delete course:", id);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", course.title);
      formData.append("subTitle", course.subTitle);
      formData.append("description", course.description);
      formData.append("category", course.category);
      formData.append("courseLevel", course.courseLevel);
      formData.append("price", course.price);

      if (course.thumbnail) {
        formData.append("thumbnail", course.thumbnail);
      }

      await editCourses({ id, data: formData }).unwrap();

      alert("Course updated successfully");

      navigate("/courses");

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data?.course) {
      setCourse({
        title: data.course.title || "",
        subTitle: data.course.subTitle || "",
        description: data.course.description || "",
        category: data.course.category || "",
        courseLevel: data.course.courseLevel || "",
        price: data.course.price || "",
        thumbnail: null, // don't prefill file input
      });
    }
  }, [data]);

if (isLoading) return <p>Loading...</p>;
if (isError) return <p>Error loading course</p>;


  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Edit Course
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Update your course details
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDelete}>
            Remove Course
          </Button>

          <Button onClick={handlePublish}>
            Publish
          </Button>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Title</label>
            <Input
              name="title"
              value={course.title}
              onChange={handleChange}
              placeholder="Enter course title"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Subtitle</label>
            <Input
              name="subTitle"
              value={course.subTitle}
              onChange={handleChange}
              placeholder="Enter subtitle"
            />
          </div>

          {/* Description (TinyMCE Editor) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>

            <div className="border rounded-md bg-white dark:bg-gray-900">
              <Editor
                apiKey="ia65j4kqz9fpkcaxgo4tvo0kdaphgajpkcdfr87hkpts91e8" // you can add real key later
                value={course.description}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "lists link image preview",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table code help wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                }}
                onEditorChange={(content) =>
                  setCourse({ ...course, description: content })
                }
              />
            </div>
          </div>

          {/* Category + Level */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                value={course.category}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 bg-background"
              >
                <option value="">Select category</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile Development</option>
                <option value="design">Design</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Course Level</label>
              <select
                name="courseLevel"
                value={course.courseLevel}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 bg-background"
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

          </div>

          {/* Price + Thumbnail */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <label className="text-sm font-medium">Price ($)</label>
              <Input
                type="number"
                name="price"
                value={course.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Course Thumbnail
              </label>
              <Input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Bottom Actions */}
          <div className="flex justify-start gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>

            <Button onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}