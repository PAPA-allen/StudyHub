import React, { FC, useEffect, useState } from 'react'
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './courseContent';
import CoursePreview from './coursePreview';
import { useCreateCourseMutation } from '@/redux/features/courses/courseApi';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

type Props = {}

const CreateCourse: FC<Props> = () => {
    const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();
    
    useEffect(() => {
        if (isSuccess) {
            toast.success("Course created Successsfully");
            redirect("/admin/all-courses")
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data.message)
            }
        }
    },[isLoading, isSuccess, error])
    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail:"",
    })
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

    const handleSubmit = async () => {
        //Format benefits array
        const formattedBenefits = benefits.map((benefits) => ({ title: benefits.title }))

              
        //formet prerequisites array
        const formattedPrereuisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));


        //format course content array
        const formattedCourseContentData = courseContentData.map((CourseContent) => ({
            videoUrl: CourseContent.videoUrl,
            title: CourseContent.title,
            description: CourseContent.description,
            videoSection: CourseContent.videoSection,
            links: CourseContent.links.map((link) => ({
                title: link.title,
                url:link.url,
            })),
            suggestion:CourseContent.suggestion
        }))
        //prepare data object
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
            prerequisites: formattedBenefits,
            courseContent: formattedCourseContentData,
        };
        setCourseData(data);

    }

    const handleCourseCreate = async (e: any) => {
        const data = courseData;

        if (!isLoading) {
            await createCourse(data);
        }
       
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
                          setPrerequisites={ setPrerequisites}
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
              },
                    {
                  active === 3 && (
                      <CoursePreview
                          active={active} setActive={setActive}
                          courseData={courseData}
                          handleCourseCreate={handleCourseCreate} />
                  )
              }
          </div>
          <div className=" hidden sm:block w-[20%] mt-[100px] h-screen fixed z-[1] top-18 right-0">
              <CourseOptions active={active} setActive={setActive}
              />
              
          </div>
      </div>
  )
}

export default CreateCourse