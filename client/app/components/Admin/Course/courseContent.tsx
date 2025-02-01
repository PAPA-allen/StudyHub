import { ArrowDown, ChevronDown, CirclePlus, Delete, DeleteIcon, Link, Pencil, PlusCircle, Trash } from 'lucide-react';
import React, { FC, useState } from 'react';
import { toast } from 'sonner';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
};

const CourseContent: FC<Props> = ({ active, setActive, courseContentData, setCourseContentData, handleSubmit: handleCourseSubmit }) => {
    const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false));

    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    };

    const handleremovelink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    };

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedData);
    };

    const newContentHandler = (item: any) => {
        if (item.title === "" || item.description === "" || item.videoUrl === "" || item.links[0].title === "" || item.links[0].url === "") {
            toast.error("Please fill in the fields required");
        } else {
            let newVideoSection = "";
            if (courseContentData.length > 0) {
                const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;

                // Use the last videoSection if available else use user input
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }

            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                links: [{ title: "", url: "" }]
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const addNewSection = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Please fill the required fields first");
        } else {
            setActiveSection(activeSection + 1);
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `Untitled Section ${activeSection}`,
                links: [{ title: "", url: "" }]
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const prevButton = () => {
        setActive(active - 1);
    };

    const handleOptions = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Section cannot be empty");
        } else {
            setActive(active + 1);
            handleCourseSubmit();
        }
    };

    return (
        <div className="w-[80%] m-auto mt-10 p-3">
            <form onSubmit={handleSubmit}>
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;
                    return (
                        <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`} key={index}> 
                            {showSectionInput && (
                                <>
                                    <div className="flex w-full items-center">
                                        <input
                                            type="text"
                                            className={`text-[15px] ${item.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"} cursor-pointer bg-transparent outline-none`}
                                            value={item.videoSection}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].videoSection = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                        <Pencil className="cursor-pointer" size={15} />
                                    </div>
                                    <br />
                                </>
                            )}
                            <div className="flex w-full items-center justify-between my-0">
                                {isCollapsed[index] ? (
                                    <>
                                        {item.title && <p>{index + 1}.{item.title}</p>}
                                    </>
                                ) : null}
                                <div className="flex items-center">
                                    <Trash
                                        className={`text-[20px] mr-2 ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                        onClick={() => {
                                            if (index > 0) {
                                                const updatedData = [...courseContentData];
                                                updatedData.splice(index, 1);
                                                setCourseContentData(updatedData);
                                            }
                                        }}
                                    />
                                    <ChevronDown
                                        fontSize="large"
                                        style={{ transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)" }}
                                        onClick={() => handleCollapseToggle(index)}
                                    />
                                </div>
                            </div>
                            {!isCollapsed[index] && (
                                <>
                                    <div className="my-3">
                                        <label className="text-gray-700 font-medium">Video Title</label>
                                        <input
                                            type="text"
                                            placeholder="Project Plan"
                                            value={item.title}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].title = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-gray-700 font-medium">Video Url</label>
                                        <input
                                            type="url"
                                            placeholder="http://..."
                                            value={item.videoUrl}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].videoUrl = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-gray-700 font-medium">Video Description</label>
                                        <textarea
                                            rows={8}
                                            cols={30}
                                            placeholder="Write something here..."
                                            value={item.description}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].description = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                                        />
                                    </div>
                                    {item?.links.map((link: any, linkIndex: number) => (
                                        <div className="mb-3 block" key={linkIndex}> {/* Add key for each link */}
                                            <div className="w-full flex items-center justify-between">
                                                <label>Link {linkIndex + 1}</label>
                                                <Trash
                                                    className={`${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"}`}
                                                    onClick={() => linkIndex === 0 ? null : handleremovelink(index, linkIndex)}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Link title .."
                                                value={link.title}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].links[linkIndex].title = e.target.value;
                                                    setCourseContentData(updatedData);
                                                }}
                                                className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                                            />
                                            <input
                                                type="url"
                                                placeholder="Link url"
                                                value={link.url}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].links[linkIndex].url = e.target.value;
                                                    setCourseContentData(updatedData);
                                                }}
                                                className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                                            />
                                        </div>
                                    ))}
                                    {/* Add link button */}
                                    <div className="inline-block mb-4">
                                        <p className="flex items-center text-[18px] cursor-pointer" onClick={() => handleAddLink(index)}>
                                            <Link className="mr-2" /> Add Link
                                        </p>
                                    </div>
                                </>
                            )}
                            <br />
                            {/* Add new content */}
                            {index === courseContentData.length - 1 && (
                                <div>
                                    <p className="flex items-center text-[18px] cursor-pointer" onClick={() => newContentHandler(item)}>
                                        <CirclePlus className="mr-2" /> Add new Content
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
                <br />
                <div className="flex items-center text-[20px] cursor-pointer" onClick={() => addNewSection()}>
                    <PlusCircle className="mr-2" /> Add new Section
                </div>
            </form>
            <br />
            <div className="flex justify-between items-center mt-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => prevButton()}>
                    Previous
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => handleOptions()}>
                    Next
                </button>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
};

export default CourseContent;
