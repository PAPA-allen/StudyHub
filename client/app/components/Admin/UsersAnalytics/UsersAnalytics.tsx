"use client"
import Loader from '@/components/loader';
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React, { FC } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  isDashboard?: boolean;
}


const UsersAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  
    
  const analyticsData: any = [];

  data && data?.users?.last12Months.forEach((item: any) => {
    analyticsData.push({name:item.month, count:item.count})
  })
    
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`p-6 ${!isDashboard ? "mt-[50px]" : "mt-[50px] shadow-sm pb-5 rounded-lg"}`}>
          <div className={`${!isDashboard ? "mb-6" : "mb-4"}`}>
            <h1 className="text-3xl font-semibold text-gray-800">Users Analytics</h1>
            <p className="text-lg text-gray-600 mt-2">Last 12 months data</p>
          </div>

          <div className="mt-6">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#ADD8E6"
                  fill="#ADD8E6"
                  strokeWidth={2}
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default UsersAnalytics;
