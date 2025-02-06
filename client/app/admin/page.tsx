"use client";

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Bell } from "lucide-react"
import { useState } from "react"
import AdminSidebar from "../components/Admin/AdminSidebar"
import { ModeToggle } from "../utils/mode-toggle";
import AdminProtected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import AdminDashboard from "../components/Admin/AdminDashboard/AdminDashboard";

export default function Page() {

  return (
    <AdminDashboard isDashboard={true} />
   
  )
}
