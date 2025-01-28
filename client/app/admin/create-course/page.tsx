"use client";

import AdminSidebar from "@/app/components/Admin/AdminSidebar";
import CreateCourse from "@/app/components/Admin/Course/create-course";
import Heading from "@/app/utils/Heading";
import { ModeToggle } from "@/app/utils/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

export default function Page() {
  // State for managing the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample notification data
  const notifications = [
    { id: 1, message: "You have a new message!" },
    { id: 2, message: "Your account has been updated." },
    { id: 3, message: "New comment on your post." },
    { id: 4, message: "Scheduled maintenance will happen tonight." },
  ];

  // Reference for the dropdown menu
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const bellButtonRef = useRef<HTMLButtonElement | null>(null);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if click is outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the dropdown or bell button
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        bellButtonRef.current &&
        !bellButtonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    return (
      
        <SidebarProvider>

      <Heading
        title="StudyHub-admin"
        description="StudyHub is a platform that allows you to learn and share your knowledge with others"
        keywords="Programming, Business, Machine Learnig"
      />
      <AdminSidebar />
      <SidebarInset>
        {/* Sticky Header */}
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur">
        <SidebarTrigger className="-ml-1 hidden md:flex" />

          <div className="flex relative ml-auto">
            <div>
              <ModeToggle />
            </div>

            <button
              ref={bellButtonRef} // Add the ref to the bell button
              onClick={toggleDropdown}
              className="relative p-2 rounded-full hover:bg-gray-300 focus:outline-none"
            >
              <Bell size={24} />
              {/* Notification Badge */}
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                3
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef} // Attach the ref to the dropdown
                className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg border border-gray-200 "
                style={{ top: "100%", right: 0 }} // Position the dropdown directly below the bell
              >
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
        <div className="overflow-auto flex-1">
          <CreateCourse />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
