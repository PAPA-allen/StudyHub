import CoursePlayer from '@/app/utils/coursePlayer';
import Ratings from '@/app/utils/Ratings';
import React, { FC } from 'react'
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any;
    isEdit:boolean
}

const coursePreview: FC<Props> = ({ active, setActive, courseData, handleCourseCreate, isEdit}) => {

    const discountPercentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100;

    const discountPercentageprice = discountPercentage.toFixed(0);

    const prevButton = () => {
        setActive(active-1)
    }

    const createCourse = () => {
        handleCourseCreate()
    }
    return (
        <div className="w-[90%] md:w-[90%] m-auto py-5 mb-5">
            <div className="w-full relative">
                <div className="w-full mt-10">
                    <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.title} />
                </div>
                <div className="flex items-center">
                    <h1 className="pt-5 text-[15px]">
                        {courseData?.price === 0 ? "Free" : courseData?.price + "GH₵"}
                    </h1>
                    <h5 className="pl-3 text-[10px] mt-2 line-through opacity-80">
                        {courseData?.estimatedPrice}
                    </h5>
                    <h4 className="pl-5 pt-4 text-[18px]">
                        {discountPercentageprice}% off
                    </h4>
                </div>
                <div className="flex items-center">
                    <div className="cursor-not-allowed text-gray-500 bg-gray-200 rounded-full py-2 px-4 text-lg font-semibold shadow-md w-max m-5">
                        Buy Now {courseData?.price} GH₵
                    </div>
                </div>
                <div className="flex items-center space-x-4 m-5">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Discount code"
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full "
                    />
                    <div className="cursor-pointer bg-blue-500 text-white rounded-lg py-2 px-6 font-semibold shadow-md hover:bg-blue-600">
                        Apply
                    </div>
                </div>
                <br/>
                <p className="pb-1">- Fulltime access</p>
                <p className="pb-1">- certificate of completion</p>
                <p className="pb-3 md:pb-1">- Premium Support</p>
            </div>
            <div className="w-full">
                <div className="w-full md:pr-5">
                    <h1 className="text-[15px] font-[600]">
                        {courseData?.name}
                    </h1>
                    <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center">
                            < Ratings rating={0} />
                            <h5>0 Reviews</h5>
                        </div>
                        <h5>0 students</h5>
                    </div>
                    <br />
                    <h1 className="font-[600] text-[15px]">What you will learn from this course?</h1>
                </div>
                {courseData?.benefits?.map((item: any, index: number) => (
                    <div className="w-full flex md:items-center py-2" key={index }>
                        <div className="w-[14px] mr-1">
                            <IoCheckmarkDoneOutline size={15} />
                        </div>
                        <p className="pl-2">{item.title}</p>
                    </div>
                ))}
                <br />
                <h1 className="text-[20px] font-[600]">
                    what are the prerequisites for starting this course?
                </h1>
                {courseData?.prerequisites?.map((item: any, index: number) => (
                    <div className="w-full flex md:items-center py-2" key={index}>
                        <div className="w-[15px] mr-1">
                            <IoCheckmarkDoneOutline size={20} />
                        </div>
                        <p className="pl-2">{item.title}</p>
                    </div>
                ))}
                {/* course description */}
                <div className="w-full">
                    <h1 className="text-[20px] font-[600]">
                        Course Details
                    </h1>
                    <p className="text-[18px] mt-[15px] whitespace-pre-line w-full overflow-hidden">
                    {courseData?.description}
                    </p>
                   
                </div>
                <br/>
            </div>
            <div className="flex justify-between items-center py-4">
                <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out" onClick={ ()=>prevButton()}>
    Previous
  </button>
  
  <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out" onClick={ ()=>createCourse()}>
                    {
                        isEdit ?"Update":"Create"
  }
  </button>
</div>

        </div>
    )
}

export default coursePreview