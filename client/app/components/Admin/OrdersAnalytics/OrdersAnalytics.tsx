"use client"
import Loader from '@/components/loader';
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React, { FC } from 'react';
import { LineChart, Area, XAxis, YAxis, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  isDashboard?: boolean;
}

const OrdersAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

    const analyticsData: any = [];
data && data?.orders.last12Months.forEach((item: any) => {
    analyticsData.push({name:item.name, count:item.count})
  })
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`p-6 ${!isDashboard ? "mt-[50px]" : "mt-[50px] shadow-sm pb-5 rounded-lg"}`}>
          <div className={`${!isDashboard ? "mb-6" : "mb-4"}`}>
            <h1 className="text-3xl font-semibold text-gray-800">Orders Analytics</h1>
          </div>

          <div className="mt-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count" // Corrected here to `count`
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={false} // Hides the dots if you don't want them
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default OrdersAnalytics;
