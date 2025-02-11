import React, { FC, useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
}

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>());

  // Find unique video sections
  const videoSection: string[] = [
    ...new Set<string>(props.data?.map((item: any) => item.videoSection))
  ];

  // Total count of videos from previous sections
  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div className={`${!props.isDemo && "ml-[-30px] sticky top-24 left-0 z-30"}`}>
      {videoSection.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);

        // Filter videos by section
        const sectionVideos: any[] = props.data.filter(
          (item: any) => item.videoSection === section
        );
        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength, 0
        );
        const sectionStartIndex: number = totalCount; // Start index of videos within the current section
        totalCount += sectionVideoCount; // Update the total count of videos

        const sectionContentHours: number = sectionVideoLength / 60;
        return (
          <div className={`${!props.isDemo && "border-b pb-4"}`} key={section}>
            <div className="flex justify-between items-center py-3">
              <h2 className="text-xl font-semibold ">{section}</h2>
              <button
                onClick={() => toggleSection(section)}
                className="p-2 rounded-full hover:bg-gray-200 transition duration-300"
              >
                {isSectionVisible ? (
                  <BsChevronUp size={20} />
                ) : (
                  <BsChevronDown size={20} />
                )}
              </button>
            </div>
            <h5 className="text-sm">
              {sectionVideoCount} Lessons {" "}
              {sectionVideoLength < 60 ? sectionVideoLength : sectionContentHours.toFixed(2)}{" "}
              {sectionVideoLength > 60 ? "Hours" : "Minutes"}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full mt-3 space-y-3">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;
                  return (
                    <div
                      className={`w-full p-4 cursor-pointer transition-all duration-200 rounded-lg hover:bg-gray-100 ${videoIndex === props.activeVideo ? "dark:text-white" : "bg-transparent"}`}
                      key={item._id}
                      onClick={() => props.isDemo ? null : props?.setActiveVideo(videoIndex)}
                    >
                      <div className="flex items-center space-x-4">
                        <MdOutlineOndemandVideo size={24} className="text-gray-500" />
                        <h1 className="text-lg font-medium text-gray-800">{item.title}</h1>
                      </div>
                      <h5 className="text-sm text-gray-500">
                        {item.videoLength > 60 ? contentLength.toFixed(2) : item.videoLength}{" "}
                        {item.videoLength > 60 ? "hours" : "minutes"}
                      </h5>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CourseContentList;
