import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Default from "../../app/components/images/Hero.png"; 
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

const Lading = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { data, refetch } = useGetHeroDataQuery("Banner", {});

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    // Fallback image URL
    const imageUrl = data?.layout?.banner?.image?.url || Default;

    return (
        <motion.div
            className="relative w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
        >
            {/* Image Section with Opacity Overlay */}
            <div className="relative w-full overflow-hidden mb-10 transition-all duration-500">
                <motion.div
                    className="absolute inset-0 w-full h-full opacity-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 1 }}
                />

                {/* Static Image Section */}
                <div className="relative w-full">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt="StudyHub Banner"
                            layout="responsive"
                            width={1200}
                            height={100}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                            <p className="text-white">No image available</p>
                        </div>
                    )}
                </div>

                {/* Moving Text on top of Image */}
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl md:text-3xl lg:text-4xl xl:text-6xl z-10 text-center w-full px-4"
                    initial={{ x: "100%" }}
                    animate={{ x: "-50%" }}
                    transition={{
                        type: "spring",
                        duration: 4,
                        delay: 0.5,
                    }}
                >
                    {data?.layout?.banner?.title}
                </motion.div>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col items-center justify-center text-center">
                <div className="w-full px-4">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Master Your Studies, Achieve Your Goals, and Excel in Every Subject
                    </h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                    {data?.layout?.banner?.subTitle}
                    </p>

                    {/* Call to Action Button */}
                    <div className="mt-8">
                        <a
                            href="#"
                            className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            Join StudyHub Today
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Lading;
