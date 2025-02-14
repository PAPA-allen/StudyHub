import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@/components/ui/button';
import { AiOutlineDelete } from "react-icons/ai";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pencil } from 'lucide-react';
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/courseApi';
import Loader from '@/components/loader';
import { format } from "timeago.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from 'sonner';
import Link from 'next/link';


type Props = {};

const AllCourses = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, error, isSuccess, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteCourse, { isSuccess: deleteSuccess, error: errorDelete }] = useDeleteCourseMutation()
  const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle dark mode

  // Toggle between light and dark mode
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);


  const handleDelete = async () => {
    const id = courseId;
    deleteCourse(id)
    setOpen(!open)
    refetch();
  }
  const columns = [
    { field: "id", headerName: "_id", flex: 0.3 },
    { field: "title", headerName: "Course Title", flex: 0.5 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit", headerName: "Edit", flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button asChild>
              <Link href={`/admin/edit-course/${params.row.id}`}>
              <Pencil />
              </Link>
              
            </Button>
          </>
        );
      }
    },
    {
      field: "delete", headerName: "Delete", flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button onClick={() => {
              setOpen(!open);
              setCourseId(params.row.id);
            }}>
              <AiOutlineDelete />
            </Button>
          </>
        );
      }
    },
  ];
  const rows: any = [];

  {
    data && data.courses.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.name,
        purchased: item.purchased,
        ratings: item.ratings,
        created_at: format(item.createdAt)
      })
    })
  }

  useEffect(()=>{
    if (deleteSuccess) {
      refetch()
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  },[deleteSuccess, error])

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light', // Toggle between dark and light mode
      background: {
        default: isDarkMode ? '#121212' : '#fff',
      },
      text: {
        primary: isDarkMode ? '#fff' : '#000', // Set primary text color to white in dark mode
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="mt-[70px]">
        {
          isLoading ? (
            <Loader />
          ) : (
            <Box
              m="20px"
              height="100%"
              sx={{
                backgroundColor: isDarkMode ? '#121212' : '#fff', // Background color of the container
                color: isDarkMode ? '#fff' : '#000', // Text color inside the box
                borderRadius: '8px', // Optional: Adding border-radius to the box
              }}
            >
              <Box
                m="40px 0 0 0"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                    outline: "none",
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', // Grid background color
                    color: isDarkMode ? '#fff' : '#000', // Text color in grid cells
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: isDarkMode ? '#333' : '#f5f5f5', // Header background
                    color: isDarkMode ? '#fff' : '#000', // Header text color
                  },
                  "& .MuiDataGrid-row": {
                    backgroundColor: isDarkMode ? '#333' : '#fff', // Row background color
                    "&:hover": {
                      backgroundColor: isDarkMode ? '#444' : '#f5f5f5', // Hover effect on row
                    },
                  },
                  "& .MuiDataGrid-cell": {
                    color: isDarkMode ? '#fff' : '#000', // Cell text color
                  },
                  "& .MuiCheckbox-root": {
                    color: isDarkMode ? '#fff' : '#000', // Checkbox color
                  },
                }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </Box>
              {open && (
                <Dialog open={open} onOpenChange={setOpen}>

                  <DialogTrigger asChild>
                    {/* <Button variant="outline">Edit Profile</Button> */}
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    </DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </DialogDescription>
                    <div className="flex items-center justify-between">
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(!open)}>Cancel</Button>
                      </DialogFooter>
                      <DialogFooter>
                        <Button type="submit" variant="destructive" onClick={handleDelete}>Delete</Button>

                      </DialogFooter>
                    </div>

                  </DialogContent>
                </Dialog>

              )}
            </Box>
          )
        }

      </div>
    </ThemeProvider>
  );
};

export default AllCourses;
