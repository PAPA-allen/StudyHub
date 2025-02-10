import Loader from '@/components/loader';
import { useGetCourseContentQuery } from '@/redux/features/courses/courseApi';
import React, { FC } from 'react'

type Props = {
    id: string;
}

const CourseContent: FC<Props> = ({ id }) => {
    const {data, isLoading } = useGetCourseContentQuery(id);
  return (
      <>
          {isLoading ? (
          <Loader/>
          ) : (
                  <div>Course content</div>
          )}
      </>
  )
}

export default CourseContent