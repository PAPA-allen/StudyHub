import EditCourse from '@/app/components/Admin/edit-course/editCourse'
import React from 'react'



const page = ({params}:any) => {
    const id = params?.id
  return (
      <EditCourse id={id} />
  )
}

export default page