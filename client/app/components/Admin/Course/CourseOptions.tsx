import React, { FC } from 'react';
import { IoCheckmarkDoneSharp } from "react-icons/io5";

type Props = {
    active: number;
    setActive: (active: number) => void;
}

const CourseOptions: FC<Props> = ({ active, setActive }) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ]
  return (
      <div>
          {options.map((option: any, index: number)=> (
              <div key={index} className={`w-full py-5 flex items-center`}>
                  <div className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${active + 1 > index ? "bg-blue-800 text-white" : null} relative`}>
                      <IoCheckmarkDoneSharp />
                      {index !== options.length-1 && (
                          <div className={`absolute h-[30px] w-1 ${active + 1 > index ? "bg-blue-800":null} bottom-[-100%]`}>
                              </div>
                      )}
                  </div>
                  <h5 className="pl-3">
                      {option}  
                  </h5>
                  </div>
          ))}
    </div>
  )
}

export default CourseOptions;