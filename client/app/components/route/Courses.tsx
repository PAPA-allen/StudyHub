"use client";
import CourseCard from '@/app/admin/course/CourseCard';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/courseApi'
import React, { useEffect, useState } from 'react'

type Props = {}

const Courses = (props: Props) => {
    const { data } = useGetUsersAllCoursesQuery({});
    const [courses, setCourses]=useState<any[]>([])
   
    console.log(data)
    useEffect(() => {
        setCourses(data?.courses)
    }, [data])
  return (
    <div className="w-[90%] md:w-[80%] m-auto py-12">
    {/* Heading Section */}
    <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-blue-500 mb-4">
            Broaden Your Mind
        </h1>
        <span className="text-lg md:text-xl text-gray-600">
            With Courses from Our Great Intellects
        </span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses && courses.map((item: any, index: number) => (
                         <CourseCard
                item={item}
                key={index}
                      />
         
        ))}
    </div>
</div>

  )
}

export default Courses