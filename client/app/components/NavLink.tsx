import Link from 'next/link';
import React, { FC } from 'react'


export const navData = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Courses",
        url: "/courses"
    },
    {
        name: "About",
        url: "/about"
    },
    {
        name: "FAQ",
        url: "/faq"
    }
]
interface NavProps {
    isMobile: boolean;
    activeItem: number
}

const NavLink: FC<NavProps> = ({ isMobile, activeItem }) => {
    return (
        <>
            <div className="hidden md:flex items-center">
                {
                    navData && navData.map((i, index) => (
                        <Link href={i.url} key={index}>
                            <span className={`${activeItem == index && "text-blue-500 "} text-[18px] px-4`}>
                                {i.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
            <div>
                {isMobile && (
                    <div className="md:hidden mt-5">
                        <div className="w-full py-6">
                            {navData && navData.map((i, index) => (
                                <Link href={i.url} key={index}>
                                    <span className={`${activeItem == index && "text-blue-500"} text-[18px] px-4 py-5 block`}>
                                        {i.name}
                                  </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>

    )
}

export default NavLink
