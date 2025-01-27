import { useChangePasswordMutation } from '@/redux/features/user/userApi';
import React, { FC, useState, useEffect } from 'react';
import { toast } from 'sonner';


const ChangePassword: FC = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changePassword, { isSuccess, error }] = useChangePasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password updated successfully!");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data?.message || "An error occurred!");
            }
        }

    }, [isSuccess, error]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
        } else {
            await changePassword({ oldPassword, newPassword });
        }

    };

    return (
        <div className="w-full flex flex-col items-center mt-8">
            <div className="w-full px-6 md:px-10">
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
                    <div className="w-full max-w-[400px]">
                        {/* Current Password */}
                        <div className="w-full">
                            <label className="text-sm font-medium text-gray-700">Old Password</label>
                            <input
                                type="password"
                                className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        {/* New Password */}
                        <div className="w-full mt-4">
                            <label className="text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        {/* Confirm New Password */}
                        <div className="w-full mt-4">
                            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input
                                type="password"
                                className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="w-full mt-6">
                            <button
                                value="Update"
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
