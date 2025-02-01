"use client";
import Team from '@/app/components/Admin/Users/Team'
import React, { FC } from 'react'

type Props = {
}

const page:FC<Props> = () => {
  return (
      <Team isTeam={true} />
  )
}

export default page