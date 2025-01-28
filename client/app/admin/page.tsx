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

export default function Page() {
  // State for managing the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Sample notification data
  const notifications = [
    { id: 1, message: 'You have a new message!' },
    { id: 2, message: 'Your account has been updated.' },
    { id: 3, message: 'New comment on your post.' },
    { id: 4, message: 'Scheduled maintenance will happen tonight.' },
  ]

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                  
          <SidebarTrigger className="-ml-1 hidden md:flex" />
                  <div className="relative ml-auto flex">
                      <div>
                      <ModeToggle/>  
                      </div>
                 
            <button
              onClick={toggleDropdown}
              className="relative p-2  rounded-full hover:bg-gray-300 focus:outline-none"
            >
              <Bell size={24} />
              {/* Notification Badge */}
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                3
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="p-4 text-sm text-gray-700">
                  {notifications.length === 0 ? (
                    <p>No new notifications.</p>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="py-2 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                      >
                        {notification.message}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
