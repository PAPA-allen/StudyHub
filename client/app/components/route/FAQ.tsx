import Loader from '@/components/loader';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useState, useEffect } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [questions, setQuestions] = useState<FAQItem[]>([]); // State to 
  const { data, isLoading } = useGetHeroDataQuery('FAQ', {});

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle answer visibility
  };

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq); 
    }
  }, [data]);


  if (isLoading) {
    return <div className="text-center text-xl"><Loader/></div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {questions.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleAnswer(index)}>
              <h3 className="text-xl font-semibold text-gray-900">{faq.question}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`w-6 h-6 transform ${openIndex === index ? 'rotate-180' : ''}`}
              >
                <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {openIndex === index && <p className="text-gray-700 mt-4">{faq.answer}</p>} {/* Show answer if the section is open */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
