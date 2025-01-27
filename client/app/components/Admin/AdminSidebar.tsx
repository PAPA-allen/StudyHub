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
  useSidebar,
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
  const pathname = usePathname(); 

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Don't render until mounted
  }

  return (
    <Sidebar {...props}>
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
        {/* We create a SidebarGroup for each parent */}
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
  );
};

export default AdminSidebar;
