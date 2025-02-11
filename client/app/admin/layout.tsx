"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import AdminSidebar from "../components/Admin/AdminSidebar";
import { ModeToggle } from "../utils/mode-toggle";
import AdminProtected from "../hooks/useProtected";
import Heading from "../utils/Heading";

export default function Layout({ children }: { children: React.ReactNode }) {
  // State for managing the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ref for the notification dropdown to detect clicks outside
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sample notification data
  const notifications = [
    { id: 1, message: "You have a new message!" },
    { id: 2, message: "Your account has been updated." },
    { id: 3, message: "New comment on your post." },
    { id: 4, message: "Scheduled maintenance will happen tonight." },
    { id: 5, message: "Your course progress has been saved." },
    { id: 6, message: "You have a new follower." },
  ];

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <AdminProtected>
        <Heading
          title="StudyHub -Admin"
          description="StudyHub is a platform that allows you to learn and share your knowledge with others"
          keywords="Programming, Business, Machine Learning"
        />
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1 hidden md:flex" />
              <div className="relative ml-auto flex items-center">
                <ModeToggle />
                <button
                  onClick={toggleDropdown}
                  className="relative p-2 rounded-full hover:bg-gray-300 focus:outline-none"
                >
                  <Bell size={24} />
                  {/* Notification Badge */}
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                    {notifications.length}
                  </div>
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 top-10 z-[999999] w-80 max-h-80 bg-white shadow-lg rounded-lg border border-gray-200 transition-all duration-200 ease-in-out overflow-y-auto"
                  >
                    <div className="p-3 text-sm text-gray-700">
                      {notifications.length === 0 ? (
                        <p>No new notifications.</p>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="py-2 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
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

            {children}
          </SidebarInset>
        </SidebarProvider>
      </AdminProtected>
    </div>
  );
}
