import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';  // Import framer-motion for animation
import { Search } from 'lucide-react';

const Lading = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500); // Delay animation
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            className="mt-[30px] max-w-7xl mx-auto md:py-10"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
        >
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl md:text-4xl font-bold text-center px-4">
                    Unlock Your Full Potential with Our Online StudyHub
                </h1>
                <h2 className="font-semibold text-[18px] py-4 text-center text-gray-700 px-4">
                    Enhance Your Learning Skills & Achieve Academic Excellence
                </h2>
                <p className="mx-auto text-[20px] font-medium text-gray-600 max-w-[800px] text-center px-4">
                    Whether you’re mastering complex subjects or refining your study habits, our StudyHub is designed to help you study smarter, not harder. Gain access to expert resources, personalized learning strategies, and a community of like-minded learners. Stay motivated, organized, and on track to achieve your academic goals.
                </p>

                <div className="text-center p-10 text-[20px] mx-auto">
                    <p className="font-bold text-2xl mb-4">What You’ll Gain:</p>
                    <div className="space-y-6 mx-auto text-gray-500 text-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isVisible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center">
                                <span className="text-green-500 text-xl mr-3">✔</span>
                                <strong>Effective Learning Techniques:</strong> Learn strategies that will make your study sessions more productive and enjoyable.
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isVisible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center">
                                <span className="text-green-500 text-xl mr-3">✔</span>
                                <strong>Customized Study Plans:</strong> Receive tailored plans that align with your learning pace and personal goals for optimal results.
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isVisible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center">
                                <span className="text-green-500 text-xl mr-3">✔</span>
                                <strong>Access to Expert Resources:</strong> Get the latest tools, tips, and insights from experienced educators to boost your learning.
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isVisible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center">
                                <span className="text-green-500 text-xl mr-3">✔</span>
                                <strong>Community Support:</strong> Join a vibrant community of motivated peers to collaborate, exchange ideas, and grow together.
                            </div>
                        </motion.div>
                    </div>
                    <div className="max-w-[400px] mx-auto py-10 flex space-x-4">
                        <input
                            placeholder="Search courses ..."
                            className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-700 outline-none"
                        />
                        <button
                            className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        >
                            <Search/>
                        </button>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default Lading;
