import { IoAddCircle } from 'react-icons/io5';
import React, { FC } from 'react';
import { toast } from 'sonner';

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {
    // Handle benefit input change
    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    };

    // Add new benefit input field
    const handleAddBenefits = () => {
        setBenefits([...benefits, { title: "" }]);
    };

    // Handle prerequisite input change
    const handlePrerequisitesChange = (index: number, value: any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    };

    // Add new prerequisite input field
    const handleAddPrerequisites = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    };

    // Handle "Previous" button click, decrease the active step
    const handlePrevious = () => {
            setActive(active - 1); 
    };

    // Handle "Next" button click, increase the active step
    const handleNext = () => {
        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
            setActive(active + 1);
        } else {
            toast.error("Please fill all the forms first")
       }
    };

    return (
        <div className="w-[80%] m-auto mt-24">
            {/* Benefits Section */}
            <div>
                <label htmlFor="benefits" className="block text-lg font-semibold text-gray-700 mb-2">
                    What are the benefits for students in this course?
                </label>
                {/* Benefits inputs */}
                {benefits.map((benefit, index) => (
                    <div key={index} className="mb-4">
                        <input
                            type="text"
                            name="Benefit"
                            placeholder="You would be able to learn something new here"
                            required
                            className="block w-full px-4 py-3 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ease-in-out"
                            value={benefit.title}
                            onChange={(e) => handleBenefitChange(index, e.target.value)}
                        />
                    </div>
                ))}
                {/* Add Benefit Button */}
                <div className="flex justify-start mt-4">
                    <IoAddCircle
                        style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
                        className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out"
                        onClick={handleAddBenefits}
                    />
                </div>
            </div>

            {/* Prerequisites Section */}
            <div className="mt-8">
                <label htmlFor="prerequisites" className="block text-lg font-semibold text-gray-700 mb-2">
                    What are the prerequisites for students in this course?
                </label>
                {/* Prerequisites inputs */}
                {prerequisites.map((prerequisite, index) => (
                    <div key={index} className="mb-4">
                        <input
                            type="text"
                            name="prerequisites"
                            placeholder="You would need basic knowledge to learn something new here"
                            required
                            className="block w-full px-4 py-3 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ease-in-out"
                            value={prerequisite.title}
                            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
                        />
                    </div>
                ))}
                {/* Add Prerequisite Button */}
                <div className="flex justify-start mt-4">
                    <IoAddCircle
                        style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
                        className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out"
                        onClick={handleAddPrerequisites}
                    />
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={handlePrevious}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200 ease-in-out"
                     // Disable Previous if on the first step
                >
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CourseData;
