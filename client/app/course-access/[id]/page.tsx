"use client";

import CourseContent from "@/app/components/course/CourseContent";
import Loader from "@/components/loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { FC, useEffect } from "react";


type Props = {
    params:any
}

const page: FC<Props> = ({ params }) => {
    const id = params.id;
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.find((item: any) => item._id === id);

            if (!isPurchased) {
                redirect("/")
            }
            if (error) {
                redirect("/")
            }
        }
    }, [data, error]);
  return (
      <>
          {
              isLoading ? (
              <Loader/>
              ) : (
                      <div>
                          <CourseContent id={id} />
                      </div>
              )
          }
      </>
  )
}

export default page