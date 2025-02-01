"use client";

import { FC, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./changePassword";

type Props = {
    user: any
}
const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = useState(false);
    const [active, setActive] = useState(1);
    const [avatar, setAvatar] = useState(null);
    const [logout, setLogout] = useState(false);
    const { } = useLogOutQuery(undefined, {
        skip: !logout ? true : false
    })

    const logoutHandler = async () => {
        setLogout(true);
        await signOut();
        redirect("/")
    }
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        })
    }

    return (
        <div className="w-[90%] mx-auto flex">
            <div className={`w-[30%] md:w-[312px] h-[400px] border rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}>
                <SidebarProfile
                    user={user}
                    avatar={avatar}
                    active={active}
                    setActive={setActive}
                    logoutHandler={logoutHandler}
                />
            </div>
            {
                active === 1 && (
                    <div className="w-full h-full bg-transparent mt-[80px]">
                        <ProfileInfo user={user} avatar={avatar} />
                    </div>

                )
            },
            {
                active === 2 && (
                    <div className="w-full h-full bg-transparent mt-[80px]">
                        <ChangePassword />
                    </div>

                )
            }
        </div>
    )
}

export default Profile
