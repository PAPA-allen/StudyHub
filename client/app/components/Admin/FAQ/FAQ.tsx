"use client";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { Minus, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

type Props = {};

const EditFAQ = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q._id === id ? { ...q, active: !q.active } : q
      )
    );
  };

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q._id === id ? { ...q, question: value } : q
      )
    );
  };

  const handleAnswerChange = (id: string, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q._id === id ? { ...q, answer: value } : q
      )
    );
  };

  const newFaqHandler = () => {
    const newQuestion = { _id: Date.now().toString(), question: "", answer: "", active: true };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleEdit = () => {
    // Implement your edit functionality, such as saving to an API
    console.log("FAQ saved:", questions);
  };

  const areQuestionsUnchanged = (originalQuestions: any[], updatedQuestions: any[]) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(updatedQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => !q.question || !q.answer);
  };

  return (
    <div className="w-[90%] mx-auto p-8  rounded-lg shadow-lg space-y-8 mt-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit FAQ</h1>

      <dl>
        {questions.map((q) => (
          <div
            key={q._id}
            className={`border-t first:border-t-0 ${q._id !== questions[0]?._id && "pt-6"}`}
          >
            {/* Question Input */}
            <dt className="flex justify-between items-center">
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(q._id, e.target.value)}
                placeholder="Add your question"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
              />
              <button
                onClick={() => toggleQuestion(q._id)}
                className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
              >
                {q.active ? (
                  <Minus className="text-gray-700" size={20} />
                ) : (
                  <Plus className="text-gray-700" size={20} />
                )}
              </button>
            </dt>

            {/* Answer Input */}
            {q.active && (
              <dd className="mt-4 flex flex-col space-y-4">
                <textarea
                  value={q.answer}
                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                  placeholder="Add your answer"
                  rows={4}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
                />
                <button
                  onClick={() =>
                    setQuestions((prevQuestions) =>
                      prevQuestions.filter((item) => item._id !== q._id)
                    )
                  }
                  className="text-red-500 hover:text-red-700 transition-all flex items-center space-x-1"
                >
                  <Trash size={20} />
                  <span>Delete</span>
                </button>
              </dd>
            )}
          </div>
        ))}
      </dl>

      {/* Add New FAQ */}
      <div className="flex justify-center mt-4">
        <button
          onClick={newFaqHandler}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-all"
        >
          <IoAddCircleOutline size={24} />
          <span>Add New Question</span>
        </button>
      </div>

      {/* Save Button */}
      <div
        className={`mt-6 flex justify-center ${
          areQuestionsUnchanged(data?.layout.faq, questions) ||
          isAnyQuestionEmpty(questions)
            ? "!cursor-not-allowed opacity-50"
            : "!cursor-pointer"
        }`}
      >
        <button
          onClick={
            areQuestionsUnchanged(data?.layout.faq, questions) ||
            isAnyQuestionEmpty(questions)
              ? () => null
              : handleEdit
          }
          className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditFAQ;
