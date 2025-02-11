import Image from 'next/image';
import React, { FC } from 'react'
import Default from "../../components/images/user.png"
import { TbPasswordUser } from "react-icons/tb";
import { FaBookReader } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";
import Link from 'next/link';

type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logoutHandler: any;
}
const SidebarProfile: FC<Props> = ({ user, avatar, active, logoutHandler, setActive }) => {
  
  return (
      <div className="w-full">
          <div className={`w-full flex items-center px-3 py-4 cursor-pointer shadow-md ${active === 1 ? "bg-gray-200 dark:bg-blue-950" : "transparent"}`} onClick={() => setActive(1)}>
              <Image src={user.avatar || avatar ? user.avatar.url || avatar : Default}
                  alt=''
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full" />
              <h4 className="pl-2 md:block hidden">
                  {user?.name} &apos; s Account
              </h4>
          </div>
          <div className={`w-full flex items-center px-3 py-4 cursor-pointer shadow-md ${active === 2 ? "bg-gray-200 dark:bg-blue-950" : "transparent"}`} onClick={() => setActive(2)}>
              <TbPasswordUser size={20} />
              <h5 className="pl-2 md:block hidden">Change Password</h5>
          </div>
          <div className={`w-full flex items-center px-3 py-4 cursor-pointer shadow-md ${active === 3 ? "bg-gray-200 dark:bg-blue-950" : "transparent"}`} onClick={() => setActive(3)}>
              <FaBookReader  size={20} />
              <h5 className="pl-2 md:block hidden">Enrolled Courses</h5>
          </div>
          {
              user.role === "admin" && (
                <Link className={`w-full flex items-center px-3 py-4 cursor-pointer shadow-md ${active === 4 ? "bg-gray-200 dark:bg-blue-950" : "transparent"}`}href={"/admin"}>
                <GrUserAdmin  size={20} />
                <h5 className="pl-2 md:block hidden">Admin Dashboard</h5>
            </Link>
              )
          }
      
          <div className={`w-full flex items-center px-3 py-4 cursor-pointer shadow-md ${active === 5 ? "bg-gray-200 dark:bg-blue-950" : "transparent"}`} onClick={()=>logoutHandler()}>
              <IoIosLogOut  size={20} />
              <h5 className="pl-2 md:block hidden">Log Out</h5>
          </div>
          
    </div>
  )
}

export default SidebarProfile
