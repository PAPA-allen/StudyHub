"use client";

import AdminSidebar from '@/app/components/Admin/AdminSidebar';
import AllCourses from '@/app/components/Admin/Course/AllCourses';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import { ModeToggle } from '@/app/utils/mode-toggle';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Bell } from 'lucide-react';
import React, { useState } from 'react'

type Props = {}

const page = (props: Props) => {
    
  return (
    <div>
  <AllCourses/>
  </div>
  )
}

export default page