"use client";
import Loader from '@/components/loader';
import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Label, YAxis, LabelList,CartesianGrid  } from 'recharts';

type Props = {}

const CourseAnalytics = (props: Props) => {
  const { data, isLoading, isError } = useGetCoursesAnalyticsQuery({});

  // const analyticsData = [
  //   { name: "June 2022", uv: 3 },
  //   { name: "July 2023", uv: 2 },
  //   { name: "August 2023", uv: 5 },
  //   { name: "Sept 2023", uv: 7 },
  //   { name: "October 2023", uv: 2 },
  //   { name: "Nov 2023", uv: 5 },
  //   { name: "Decemeber 2023", uv: 7 },
  // ];

  const analyticsData: any = [];

  data && data?.courses?.last12Months.forEach((item: any) => {
    analyticsData.push({name:item.month, uv:item.count})
  })
  const minValue = 0;

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div className="h-screen">
            <div className="mt-[50px] px-6 py-4 bg-white shadow-lg rounded-lg">
              <h1 className="text-3xl font-semibold text-gray-800">Courses Analytics</h1>
              <p className="text-lg text-gray-600 mt-2">Last 12 months analytics data</p>
            </div>

            <div className="w-full h-[90%] flex items-center justify-center">
              <ResponsiveContainer width="90%" height="50%">
                <BarChart width={150} height={300} data={analyticsData}>
                  <XAxis dataKey="name">
                    <Label offset={0} position="insideBottom" />
                    </XAxis>
                     <CartesianGrid strokeDasharray="3 3" />
                  <YAxis domain={[minValue, "auto"]} />
                  <Bar dataKey="uv" fill="#ADD8E6">
                    <LabelList dataKey="uv" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      }
    </>
  )
}

export default CourseAnalytics