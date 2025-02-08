import Ratings from '@/app/utils/Ratings';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import CourseData from '../../components/Admin/Course/CourseData';

type Props = {
    item: any;
    isProfile?: boolean;
}

const CourseCard: FC<Props> = ({ item, isProfile }) => {
    return (
        <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
            <div className="w-full min-h-[35vh]  border border-gray-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                
                {/* Image Section */}
                <div className="relative w-full h-40 md:h-48">
                    <Image 
                        src={item.thumbnail.url} 
                        width={500} 
                        height={300} 
                        alt={item.name || 'Course Thumbnail'}
                        objectFit="cover"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Course Title and Description */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                    <div className="flex justify-between mx-auto">
                        <Ratings rating={item.ratings} />
                   
                        <h5 className={` ${isProfile && "hidden"}`}>{item.purchased} Students</h5>
                    </div>
                    <div className="w-full flex items-center justify-between pt-3">
                    <div className="w-full flex items-center justify-between pt-3">
                        <div className="flex">
                                <h3>
                                   {item.price === 0?"Free":item.price +"₵"}
                                </h3>
                                <h5 className="line-through opacity-80 mt-[-5px] text-[12px]">
                                    {item.estimatedPrice}₵ 
                                </h5>
                            </div>
                            <div className="flex items-center pb-3">
                                <AiOutlineUnorderedList size={20} />
                                <h5 className="pl-2">{item.courseData?.length} Lectures</h5>
                            </div>
                </div>

                        </div>
                </div>
            </div>
        </Link>
    );
}

export default CourseCard;
