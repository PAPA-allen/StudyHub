import React, { FC, useState } from 'react'

type Props = {
    courseInfo: any;
    setCourseInfo: (course: any) => void;
    active: number;
    setActive: (active: number) => void
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setActive(active + 1)
    }

    const handleFileChange = (e:any) => {
        const file = e.target.file?.[0]

        if (file) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                if (reader.readyState == 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file)
        }
    }
    const handleDragOver = (e:any) => {
        e.preventDefault();
        setDragging(true)
    }
    return (
        <div className="w-[80%] m-auto mt-24">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Name*
                </label>
                <div>
                    <input
                        type="name"
                        name=""
                        id="name"
                        required
                        value={courseInfo.name}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        placeholder="Studyhub materials"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ease-in-out"
                    />
                </div>
                <br />
                <div className="mb-5">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Course Description*
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        cols={30}
                        rows={10}
                        value={courseInfo.description}
                        placeholder="Something amazing"
                        onChange={(e: any) => setCourseInfo({
                            ...courseInfo, description: e.target.value
                        })}
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none transition duration-200 ease-in-out"
                    />
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label>Course Price*</label>
                        <input
                            type="number"
                            name=""
                            required
                            id="price"
                            value={courseInfo.costprice}
                            placeholder="10"
                            onChange={(e: any) => setCourseInfo({
                                ...courseInfo, price: e.target.value
                            })}
                            className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none transition duration-200 ease-in-out"
                        />
                    </div>
                    <div className="w-[45%]">
                        <label>Estimated Price</label>
                        <input
                            type="number"
                            name=""
                            required
                            id="price"
                            value={courseInfo.estimatedPrice}
                            placeholder="10"
                            onChange={(e: any) => setCourseInfo({
                                ...courseInfo, estimatedPrice: e.target.value
                            })}
                            className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none transition duration-200 ease-in-out"
                        />
                    </div>

                </div>
                <br />
                <div>
                    <label htmlFor="email">Course Tags*</label>
                    <input
                        type="text"
                        name=""
                        id="tags"
                        required
                        value={courseInfo.courseTags}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                        placeholder="tailwind"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ease-in-out"
                    />
                </div>
                <br />
                <div className="w-full flex justify-between">
               
                    <div className="w-[45%]">
                        <label>Course Level*</label>
                        <input
                            type="text"
                            name=""
                            required
                            id="level"
                            value={courseInfo.level}
                            placeholder="beginner/expert"
                            onChange={(e: any) => setCourseInfo({
                                ...courseInfo, level: e.target.value
                            })}
                            className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none transition duration-200 ease-in-out"
                        />
                    </div>
                    <div className="w-[50%]">
                        <label>Demo Url*</label>
                        <input
                            type="number"
                            name=""
                            required
                            id="demoUrl"
                            value={courseInfo.demoUrl}
                            placeholder="dt45"
                            onChange={(e: any) => setCourseInfo({
                                ...courseInfo, demoUrl: e.target.value
                            })}
                            className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none transition duration-200 ease-in-out"
                        />
                    </div>

                </div>
                <br />
                <div className="w-full">
                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange} />
                </div>
            </form>
        </div>
    )
}

export default CourseInformation