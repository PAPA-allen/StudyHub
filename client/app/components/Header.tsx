import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react'
import NavLink from './NavLink';
import { ModeToggle } from '../utils/mode-toggle';
import { Menu, User } from 'lucide-react';
import { Modal } from './Modal';
import { LoginForm } from './Auth/Login';
import { SignUpForm } from './Auth/SignUp';
import Verification from './Auth/Verification';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import avatar from "../components/images/user.png"
import { useSession } from 'next-auth/react';
import { useLogOutQuery, useSocialAuthMutation } from '@/redux/features/auth/authApi';
import { toast } from 'sonner';


interface Props {
    activeItem: number;
    open: boolean;
    setOpen: (open: boolean) => void;
    route: string;
    setRoute: (route: string) => void;
}

const Header: FC<Props> = ({ activeItem, setOpen, open, route, setRoute }) => {
    const [active, setActive] = useState(false)
    const [openSideBar, setOpenSideBar] = useState(false);
    const { user } = useSelector((state: any) => state.auth)
    const { data } = useSession()
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
    const [logout, setLogout]= useState(false);
    const { } = useLogOutQuery(undefined, {
        skip: !logout ? true : false
    })

    useEffect(() => {
        if (!user) {
            if (data) {
                socialAuth({ name: data?.user?.name, email: data?.user?.email, avatar: data?.user?.image })
            }
        }
        if (data === null) {
            if (isSuccess) {
                toast.success("Login successful");
            }
        }
       
        if (error) {
            if ("data" in error) {
                const errorData = error as any
                toast.error(errorData?.data?.message) || "An error occurred";
            }
        }
        if (data === null) {
            setLogout(true);
        }
    }, [data, user])
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget.id === "screen") {
            setOpenSideBar(false)
        }
    }
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                setActive(true);
            } else {
                setActive(false);
            }
        })
    }

    const currentYear = new Date().getFullYear();

    return (
        <header className="w-full flex mx-auto px-4 lg:px-6">
            <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-b dark:from-gray-900 dark:to-black w-full fixed left-0 top-0 z-[80] h-[80px] border-b border-b-slate-50 backdrop-blur" : "w-full left-0 top-0"}`}>
                <div className="mx-auto max-w-7xl flex items-center justify-between py-4 px-4">
                    <Link href="/" className="md:text-2xl font-bold">
                        <h1>StudyHub</h1>
                    </Link>
                    <div className="flex items-center px-4">
                        <NavLink
                            isMobile={false}
                            activeItem={activeItem}
                        />
                        <ModeToggle />

                        {/* mobile screen */}
                        <div className={`${user ? "hidden" : null} md:hidden px-3`}>
                            <Menu
                                size={25}
                                className="cursor-pointer"
                                onClick={() => setOpenSideBar(true)} />
                        </div>
                        {
                            user ? (
                                <Link href="/profile">
                                    <Image src={user.avatar ? user.avatar.url : avatar} alt="" width={30} height={30} className="w-[30px] h-[30px] md:ml-3 rounded-full ml-2 cursor-pointer"
                                        style={{border:activeItem === 5 ? "2px solid #ffc107":"none"}} />
                                </Link>
                            ) : (
                                <div className="md:px-2 hidden md:flex">
                                    <User className="rounded-full cursor-pointer hover:ring-2"
                                        size={25}
                                        onClick={() => setOpen(true)}
                                    />
                                </div>
                            )
                        }

                    </div>
                </div>

                {/* mobile sidebar */}
                {
                    openSideBar && (
                        <div className="fixed w-full h-screen top-0 left-0 z-[9999999] bg-[#05020224] md:hidden" onClick={handleClose} id="screen">
                            <div className="w-[60%] fixed z-[999999999] h-screen bg-white dark:bg-gray-900 top-0 right-0">
                                <NavLink isMobile={true} activeItem={activeItem} />
                                <div className="px-4">
                                    <User className="cursor-pointer"
                                        size={25}
                                        onClick={() => setOpen(true)}
                                    />
                                    <br />
                                    <br />
                                    <br />
                                    <p>copyright &copy; {currentYear} studyhub</p>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    route === "Login" && (
                        <>
                            {open && (
                                <Modal
                                    open={open}
                                    setOpen={setOpen}
                                    activeItem={activeItem}
                                    setRoute={setRoute}
                                    component={LoginForm}
                                />
                            )}
                        </>
                    )
                }

                {
                    route === "sign-up" && (
                        <>
                            {open && (
                                <Modal
                                    open={open}
                                    setOpen={setOpen}
                                    activeItem={activeItem}
                                    setRoute={setRoute}
                                    component={SignUpForm}
                                />
                            )}
                        </>
                    )
                }
                {
                    route === "Verification" && (
                        <>
                            {open && (
                                <Modal
                                    open={open}
                                    setOpen={setOpen}
                                    activeItem={activeItem}
                                    setRoute={setRoute}
                                    component={Verification}
                                />
                            )}
                        </>
                    )
                }
            </div>
        </header>
    )
}

export default Header
