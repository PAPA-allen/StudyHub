"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import Image from "next/image";
import Default from "../images/user.png";
import { useEffect, useState } from "react";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/admin",
      items: [
        {
          title: "Dashboard",
          url: "/admin",
        },
      ],
    },
    {
      title: "Data",
      url: "#",
      items: [
        {
          title: "Users",
          url: "/admin/users",
        },
        {
          title: "Invoices",
          url: "/admin/invoices",
        },
      ],
    },
    {
      title: "Content",
      url: "#",
      items: [
        {
          title: "Create course",
          url: "/admin/create-course",
        },
        {
          title: "Live Course",
          url: "/admin/courses",
        },
      ],
    },
    {
      title: "Customization",
      url: "#",
      items: [
        {
          title: "Hero",
          url: "/admin/hero",
        },
        {
          title: "FAQ",
          url: "/admin/faq",
        },
        {
          title: "Categories",
          url: "/admin/categories",
        },
      ],
    },
    {
      title: "Controllers",
      url: "#",
      items: [
        {
          title: "Manage Team",
          url: "/admin/team",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      items: [
        {
          title: "Courses Analytics",
          url: "/admin/courses-analytics",
        },
        {
          title: "Orders Analytics",
          url: "/admin/orders-analytics",
        },
        {
          title: "Users Analytics",
          url: "/admin/users-analytics",
        },
      ],
    },
    {
      title: "Extras",
      url: "#",
      items: [
        {
          title: "Settings",
          url: "/admin/settings",
        },
        {
          title: "Logout",
          url: "#",
        },
      ],
    },
  ],
};

const AdminSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { user } = useSelector((state: any) => state.auth);
  const [mounted, setMounted] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname(); 

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };

  if (!mounted) {
    return null; // Don't render until mounted
  }

  return (
    <>
      {/* Mobile Sidebar Button */}
      {!isMobileSidebarOpen && (
        <button
          className="fixed top-1 left-4 z-50 md:hidden p-3"
          onClick={toggleMobileSidebar}
        >
          {/* Icon for Sidebar */}
          <span className="text-2xl">&#9776;</span>
        </button>
      )}

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleMobileSidebar}
        >
          <div className="absolute top-0 left-0 w-2/3 h-full bg-white p-4">
            <div className="flex justify-between items-center">
              <div className="ml-auto mr-auto">
              <Image
                alt="profile-user"
                src={user.avatar ? user.avatar.url : Default}
                height={50}
                width={50}
                style={{
                  cursor: "pointer",
                  border: "3px solid #5b6e6",
                  borderRadius: "50%",
                }}
                className="rounded-full"
              />
              </div>
              <button
                className="text-xl"
                onClick={toggleMobileSidebar}
              >
                &times; {/* Close Button */}
              </button>
            </div>
            <div className="flex items-center justify-around">
            <h1 className="text-center font-bold py-2">{user?.name}</h1>
            <h2 className="text-center text-sm font-bold"> -{user?.role}</h2>
            </div>
       
          

            <div className="mt-6">
              {data.navMain.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-bold">{group.title}</h3>
                  <div>
                    {group.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        passHref
                        className={`block py-2 px-4 text-sm rounded-md ${
                          pathname === item.url
                            ? "bg-gray-200 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar {...props} className="hidden md:block">
        <SidebarHeader>
          <div className="py-4">
            <div className="flex items-center justify-center">
              <Image
                alt="profile-user"
                src={user.avatar ? user.avatar.url : Default}
                height={100}
                width={100}
                style={{
                  cursor: "pointer",
                  border: "3px solid #5b6e6",
                  borderRadius: "50%",
                }}
                className="rounded-full"
              />
            </div>

            <h1 className="flex items-center justify-center font-bold uppercase py-2">
              {user?.name}
            </h1>
            <h1 className="flex items-center justify-center uppercase font-bold">
              {user?.role}
            </h1>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {data.navMain.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          passHref
                          className={`block py-2 px-4 text-sm rounded-md ${
                            pathname === item.url
                              ? "bg-gray-200 text-blue-600"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </>
  );
};

export default AdminSidebar;
