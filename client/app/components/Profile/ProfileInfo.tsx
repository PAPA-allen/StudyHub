import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import Default from "../images/user.png";
import { CiCamera } from "react-icons/ci";
import { useActivationMutation } from '@/redux/features/auth/authApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { toast } from 'sonner';
import { useUpdateAvatarMutation } from '@/redux/features/user/userApi';

type Props = {
    avatar: string | null;
    user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user.name);
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation()
    const [loadUser, setLoadUser]=useState(false)
    const { } = useLoadUserQuery(undefined, {skip:!loadUser?true:false})
    const imageHandler = async (e: any) => {
        const files = e.target.files[0];

        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
               const avatar = fileReader.result;
               updateAvatar(
                     avatar,
              )
            }
        };
        fileReader.readAsDataURL(e.target.files[0])
    };
    useEffect(() => { 
        if (isSuccess) {
            setLoadUser(true)
            toast.success("Profile updated successfully")
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data?.message) || "An error occurred";
            }
        }
    },[isSuccess])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Handle form submission
        console.log("Profile updated");
    };

    return (
        <div className="w-full flex flex-col items-center mt-8">
            <div className="relative mb-6">
                <label htmlFor="avatar">
                    <Image
                        src={user.avatar || avatar ? user.avatar.url || avatar : Default}
                        alt=""
                        className="w-[120px] h-[120px] cursor-pointer border-[3px] rounded-full border-blue-500 transition-all duration-300 hover:scale-105"
                        width={120}
                        height={120}
                    />
                </label>
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="hidden"
                    onChange={imageHandler}
                    accept="image/png,image/jpg,image/jpeg,image/webp"
                />

                <label htmlFor="avatar">
                    <div className="w-[30px] h-[30px] bg-white border border-gray-300 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 hover:bg-gray-100">
                        <CiCamera size={18} className="text-blue-500" />
                    </div>
                </label>
            </div>

            <div className="w-full px-6 md:px-10">
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
                    <div className="w-full max-w-[400px]">
                        <div className="w-full">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* Email Input */}
                        <div className="w-full mt-4">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={user.email}
                                required
                                readOnly
                            />
                        </div>
                        <div className="w-full mt-6">
                            <button
                                type="submit"
                                value="Update"
                                className="w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileInfo;
