"use client";
import React, { useEffect, useState } from "react";
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { Minus, Plus, Trash } from "lucide-react";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import Loader from "@/components/loader";

type Props = {};

const EditCategories = (props: Props) => {
  // Fetch data for categories
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<any[]>([]);

  // Effect hook to set initial categories and handle success/error
  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
      refetch(); // Refresh data after initial load
    }
    if (isSuccess) {
      toast.success("Categories updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  // Toggle visibility of category (active/inactive)
  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category._id === id ? { ...category, active: !category.active } : category
      )
    );
  };

  // Handle category name change
  const handleCategoryChange = (id: string, value: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category._id === id ? { ...category, title: value } : category
      )
    );
  };

  // Add a new category
  const newCategoryHandler = () => {
    const newCategory = { _id: Date.now().toString(), title: "", active: true };
    setCategories((prev) => [...prev, newCategory]);
  };

  // Check if any category is unchanged
  const areCategoriesUnchanged = (originalCategories: any[], updatedCategories: any[]) => {
    return JSON.stringify(originalCategories) === JSON.stringify(updatedCategories);
  };

  // Check if any category name is empty
  const isAnyCategoryEmpty = (categories: any[]) => {
    return categories.some((category) => category.title === "");
  };

  // Handle saving the edited categories
  const handleEdit = async () => {
    if (!areCategoriesUnchanged(data.layout.categories, categories) && !isAnyCategoryEmpty(categories)) {
      await editLayout({
        type: "Categories",
        categories: categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] mx-auto p-8 rounded-lg shadow-lg space-y-8 mt-20">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6"> Categories</h1>

          <dl>
            {categories.map((category) => (
              <div key={category._id} className={`border-t first:border-t-0 ${category._id !== categories[0]?._id && "pt-6"}`}>
                {/* Category Name Input */}
                <dt className="flex justify-between items-center">
                  <input
                    type="text"
                    value={category.title}
                    onChange={(e) => handleCategoryChange(category._id, e.target.value)}
                    placeholder="Category Name"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
                  />
                  <button
                    onClick={() => toggleCategory(category._id)}
                    className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    {category.active ? (
                      <Minus className="text-gray-700" size={20} />
                    ) : (
                      <Plus className="text-gray-700" size={20} />
                    )}
                  </button>
                </dt>

                {/* Delete Category Button */}
                {category.active && (
                  <dd className="mt-4 flex flex-col space-y-4">
                    <button
                      onClick={() =>
                        setCategories((prevCategories) => prevCategories.filter((item) => item._id !== category._id))
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

          {/* Add New Category */}
          <div className="flex justify-center mt-4">
            <button
              onClick={newCategoryHandler}
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-all"
            >
              <IoAddCircleOutline size={24} />
              <span>Add New Category</span>
            </button>
          </div>

          {/* Save Button */}
          <div
            className={`mt-6 flex justify-center ${
              areCategoriesUnchanged(data?.layout.categories, categories) ||
              isAnyCategoryEmpty(categories)
                ? "!cursor-not-allowed opacity-50"
                : "!cursor-pointer"
            }`}
          >
            <button
              onClick={
                areCategoriesUnchanged(data?.layout.categories, categories) ||
                isAnyCategoryEmpty(categories)
                  ? () => null
                  : handleEdit
              }
              className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
