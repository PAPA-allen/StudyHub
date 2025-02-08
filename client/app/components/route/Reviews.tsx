// components/Reviews.tsx

import Ratings from '@/app/utils/Ratings';
import React from 'react';

type Review = {
  name: string;
  avatar: string;
  profession: string;
  comment: string;
};

const reviewsData = [
    {
      name: 'Alice Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      profession: 'Computer Science Student',
      comment: 'The programming tutorials here helped me ace my exams! Highly recommend the Python series.',
    },
    {
      name: 'Bob Davis',
      avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
      profession: 'Web Development Bootcamp Graduate',
      comment: 'The full-stack web development course was comprehensive and gave me the skills I needed to land my first job!',
    },
    {
      name: 'Charlotte Lee',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
      profession: 'Graphic Design Major',
      comment: 'The design resources, especially the Adobe tools tutorials, have been an invaluable part of my learning process.',
    },
    {
      name: 'David Williams',
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
      profession: 'Marketing Professional',
      comment: 'I found the digital marketing and SEO courses extremely useful for my career. Great for beginners and experts alike.',
    },
    {
      name: 'Emily Taylor',
      avatar: 'https://randomuser.me/api/portraits/women/61.jpg',
      profession: 'Business Analytics Enthusiast',
      comment: 'The Excel and data analysis tutorials here made my thesis work a breeze. I’ll definitely return for more content!',
    },
    {
      name: 'Frank Harris',
      avatar: 'https://randomuser.me/api/portraits/men/80.jpg',
      profession: 'Data Science Intern',
      comment: 'The data science tutorials, particularly on machine learning, were very well-structured and easy to follow. Highly recommend.',
    },
  ];
  

const Reviews = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">What Our Clients Say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewsData.map((review, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center mb-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{review.name}</h3>
                <p className="text-gray-500">{review.profession}</p>
              </div>
            </div>
                <p className="text-gray-700 italic">"{review.comment}"</p>
            </div>
           
        ))}
      </div>
    </div>
  );
};

export default Reviews;
