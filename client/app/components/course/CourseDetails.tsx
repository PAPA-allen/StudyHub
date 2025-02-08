import CoursePlayer from '@/app/utils/coursePlayer';
import Ratings from '@/app/utils/Ratings';
import React from 'react';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import CourseContentList from './CourseContentList';

type Props = {
  data: any;
};

const CourseDetails = ({ data }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const discountPercentage = ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountedPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      {/* Course Title and Info */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">{data.name}</h1>
          <div className="flex items-center space-x-4 text-gray-600 mb-2">
            <Ratings rating={data.ratings} />
            <h5 className="text-lg">{data?.reviews?.length} Reviews</h5>
          </div>
          <h5 className="text-lg text-gray-600">{data.purchased} Students</h5>
        </div>
        {/* Price Section */}
        <div>
          <div className="text-lg font-semibold text-gray-900 mb-2">
          ₵{data.price}{' '}
            {discountPercentage > 0 && (
              <span className="text-sm text-green-500 line-through ml-2">
                ₵{data?.estimatedPrice}
              </span>
            )}
          </div>
          {discountPercentage > 0 && (
            <span className="text-sm bg-green-100 text-green-800 py-1 px-3 rounded-full">
              {discountedPercentagePrice}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Course Player Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Course Demo</h2>
        <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
      </div>

      {/* Course Benefits Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">What You'll Learn</h2>
        <ul className="space-y-4 text-lg text-gray-700">
          {data.benefits?.map((item: any, index: number) => (
            <li key={index} className="flex items-start space-x-3">
              <IoCheckmarkDoneOutline className="text-green-500 mt-1" />
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">What are prerequisites for starting this course?</h2>
        <ul className="space-y-4 text-lg text-gray-700">
          {data.prerequisites?.map((item: any, index: number) => (
            <li key={index} className="flex items-start space-x-3">
              <IoCheckmarkDoneOutline className="text-green-500 mt-1" />
              <p>{item.title}</p>
            </li>
          ))}
              </ul>
              <br />
              <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Course Overview</h2>
                  <CourseContentList data={data?.courseData} />
              
      </div>
      </div>
      {/* Course Description */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Course Details</h2>
              <p className="text-lg text-gray-700">{data.description}</p>
              
      </div>

      {/* Reviews Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Course Reviews ({data?.reviews?.length})
        </h2>
        <div>
          <Ratings rating={data?.ratings} />
          <div className="text-lg text-gray-600 mb-4">
            {Number.isInteger(data?.ratings)
              ? data?.ratings.toFixed(1)
              : data?.ratings.toFixed(2)}{' '}
            Course Rating | {data?.reviews?.length} Reviews
          </div>
          <div className="space-y-6">
            {(data?.reviews && [...data.reviews].reverse()).map((Item: any, index: number) => (
              <div key={index} className="flex space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 text-white flex items-center justify-center text-xl font-semibold">
                  {Item.user.name.slice(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-semibold text-gray-900">{Item.user.name}</h5>
                      <Ratings rating={Item.rating} />
                    </div>
                    <span className="text-sm text-gray-500">{format(Item.createdAt)}</span>
                  </div>
                  <p className="text-gray-700 mt-2">{Item.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase Button */}
      <div className="flex justify-center mt-6">
        {!isPurchased ? (
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition">
                      ₵{data.price} Buy Now
          </button>
        ) : (
          <button className="bg-gray-500 text-white py-3 px-6 rounded-lg cursor-not-allowed">
           Enter Course
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
