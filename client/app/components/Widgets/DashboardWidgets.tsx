import React, { FC } from 'react';
import UsersAnalytics from '../Admin/UsersAnalytics/UsersAnalytics';
import { BsBorderLeft } from 'react-icons/bs';
import { PiUsersFourLight } from 'react-icons/pi';
import AllInvoices from '../Admin/orders/AllInvoices';
import OrdersAnalytics from '../Admin/OrdersAnalytics/OrdersAnalytics';

type Props = {
  open?: boolean;
  value?: number;
};

const DashboardWidgets: FC<Props> = ({ open, value }) => {
  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      {/* Main Grid Layout with left and right sections */}
      <div className="grid grid-cols-1 lg:grid-cols-[50%,50%] gap-6">
        {/* Left Section - Users Analytics */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <UsersAnalytics isDashboard={true} />
        </div>

        {/* Right Section - Widgets */}
        <div className="space-y-6">
             {/* Orders Analytics Widget (Moves below New Users Widget) */}
         
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <OrdersAnalytics isDashboard={true} />
          </div>
          {/* Sales Widget */}
          <div className="p-4 bg-white shadow-lg rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BsBorderLeft className="text-3xl text-gray-600" />
              <div>
                <h5 className="text-xl font-semibold text-gray-800">120</h5>
                <h5 className="text-sm text-gray-600">Sales Obtained</h5>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h5 className="text-green-500 text-md font-semibold">+120</h5>
            </div>
          </div>

          {/* New Users Widget */}
          <div className="p-4 bg-white shadow-lg rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <PiUsersFourLight className="text-3xl text-gray-600" />
              <div>
                <h5 className="text-xl font-semibold text-gray-800">450</h5>
                <h5 className="text-sm text-gray-600">New Users</h5>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h5 className="text-green-500 text-md font-semibold">+150%</h5>
            </div>
          </div>

       
        </div>
      </div>

      {/* Recent Transactions Section (Full width) */}
      <div className="mt-8 w-full shadow-lg rounded-lg p-6 bg-white">
        <h5 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h5>
        <AllInvoices isDashboard={true} />
      </div>
    </div>
  );
};

export default DashboardWidgets;
