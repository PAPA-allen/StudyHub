"use client";
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { toast } from "sonner";

type Props = {};

const EditHero: FC<Props> = () => {
  const [editLayout, {isSuccess, error }]=useEditLayoutMutation()
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange:true
  });


  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle
    });
  }

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url || "");
    }

    if (isSuccess) {
    refetch()
    toast.success("Landing page updated!")
  }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message)
      }
    }
  }, [data, isSuccess, error, refetch]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fallbackImage = "../../images/user.png"; // fallback image URL

  return (
    <>
      <div className="w-full flex flex-col md:flex-row items-center justify-between p-4 mt-7">
        {/* Left - Image Section */}
        <div className="relative w-full md:w-[30%] mb-4 md:mb-0">
          <Image
            src={image || fallbackImage}
            alt="Hero Image"
            className=" w-full h-[300px] md:h-[500px] rounded-lg shadow-lg"
          />
          <input
            type="file"
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />
          <label
            htmlFor="banner"
            className="absolute bottom-2 right-2 z-20 bg-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <AiOutlineCamera className="text-xl text-gray-800" />
          </label>
        </div>

        {/* Right - Text Areas Section */}
        <div className="w-full md:w-[60%] flex flex-col md:ml-4 md:mr-5">
          {/* Title Textarea */}
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            rows={4}
            className="w-full p-4 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[30px]"
          />

          {/* Subtitle Textarea */}
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="Enter the subtitle"
            rows={4}
            className="w-full p-4 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <br />
          <br />
          <div
            className={`${data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner.image?.url !== image
                ? "cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
              } 
    px-6 py-2 rounded-full text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 text-center`}
            onClick={
              data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>

        </div>
      </div>
    </>
  );
};

export default EditHero;
