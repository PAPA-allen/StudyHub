"use client";

import React, { FC, useEffect, useState } from 'react'
import { useCreateCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/courseApi';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import CourseOptions from '../Course/CourseOptions';
import CoursePreview from '../Course/coursePreview';
import CourseContent from '../Course/courseContent';
import CourseData from '../Course/CourseData';
import CourseInformation from '../Course/CourseInformation';

type Props = {
    id: string;
}

const EditCourse: FC<Props> = ({ id }) => {
    const { error, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    
    const editCourseData = data && data.courses.find((i: any) => i._id === id);

    const [active, setActive] = useState(0);

    // Updating the states after fetching the data
    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                estimatedPrice: editCourseData?.estimatedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData?.thumbnail?.url,
            });

            setBenefits(editCourseData.benefits);
            setPrerequisites(editCourseData.prerequisites);
            setCourseContentData(editCourseData.courseData);

      
        }
    }, [editCourseData]);

    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
    });
    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            links: [
                {
                    title: "",
                    url: ""
                },
            ],
            suggestion: ""
        },
    ]);
    
    const [courseData, setCourseData] = useState({});

    // Handle the submit logic to format the data
    const handleSubmit = async () => {
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));
        const formattedCourseContentData = courseContentData.map((CourseContent) => ({
            videoUrl: CourseContent.videoUrl,
            title: CourseContent.title,
            description: CourseContent.description,
            videoSection: CourseContent.videoSection,
            links: CourseContent.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            suggestion: CourseContent.suggestion
        }));

        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData,
        };
        setCourseData(data);
    }

    const handleCourseCreate = async (e: any) => {
        const data = courseData;
        // Here you can call an API to create/update the course
        // Example:
        // await createCourse(data);
    }

    return (
        <div className="w-full  md:flex min-h-screen">
            <div className="md:w-[80%] ">
                {
                    active === 0 && (
                        <CourseInformation
                            courseInfo={courseInfo}
                            setCourseInfo={setCourseInfo}
                            active={active}
                            setActive={setActive} />
                    )
                }
                {
                    active === 1 && (
                        <CourseData
                            benefits={benefits}
                            setBenefits={setBenefits}
                            prerequisites={prerequisites}
                            setPrerequisites={setPrerequisites}
                            active={active}
                            setActive={setActive} />
                    )
                }
                {
                    active === 2 && (
                        <CourseContent
                            active={active}
                            setActive={setActive}
                            courseContentData={courseContentData}
                            setCourseContentData={setCourseContentData}
                            handleSubmit={handleSubmit}
                        />
                    )
                }
                {
                    active === 3 && (
                        <CoursePreview
                            active={active}
                            setActive={setActive}
                            courseData={courseData}
                            handleCourseCreate={handleCourseCreate} />
                    )
                }
            </div>
            <div className=" hidden sm:block w-[20%] mt-[100px] h-screen fixed z-[1] top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}

export default EditCourse;
