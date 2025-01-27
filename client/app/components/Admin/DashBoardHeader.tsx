"use client"
import React, { useState } from 'react';
import { Bell } from 'lucide-react';

type Props = {};

const DashBoardHeader = (props: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample notification data
  const notifications = [
    { id: 1, message: 'You have a new message!' },
    { id: 2, message: 'Your account has been updated.' },
    { id: 3, message: 'New comment on your post.' },
    { id: 4, message: 'Scheduled maintenance will happen tonight.' },
  ];

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 ">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Bell Icon Container */}
        <div className="relative">
          {/* Bell Icon Button */}
          <button
            className="relative"
            onClick={toggleDropdown}
          >
            <Bell size={24} />
            {/* Notification Badge */}
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
              3
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg border border-gray-200 transition-all duration-300 ease-in-out">
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
      </div>
    </div>
  );
};

export default DashBoardHeader;
