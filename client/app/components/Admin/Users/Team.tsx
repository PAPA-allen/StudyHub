import React, { FC, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@/components/ui/button';
import { AiOutlineDelete } from "react-icons/ai";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Mail, Pencil, Plus } from 'lucide-react';
import { useGetAllCoursesQuery } from '@/redux/features/courses/courseApi';
import Loader from '@/components/loader';
import { format } from "timeago.js"
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi';
import { updateUserRole } from '../../../../../server/controllers/user.controller';
import { toast } from 'sonner';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"

type Props = {
    isTeam: boolean
};

const Team: FC<Props> = ({ isTeam, }) => {
    const [active, setActive] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("admin");
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const { isLoading, refetch, data } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
    const [updateUserRole, { isSuccess, error: updateError }] = useUpdateUserRoleMutation();
    const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation();
    const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle dark mode

    // Toggle between light and dark mode
    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    const handleDelete = async () => {
        const id = userId;
        await deleteUser(id);
        setOpen(!open)
        refetch();
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await updateUserRole({ email, role });
        setActive(false);
        refetch()
    };
    useEffect(() => {
        if (updateError) {
            if ("data" in updateError) {
                const errorData = updateError as any;
                toast.error(errorData?.data?.message);
            }
        }
        if (isSuccess) {
            refetch();
            toast.success("User role updated successfully");
            setActive(false);

            if (deleteSuccess) {
                refetch();
                toast.success("Deleted successfully");
                setOpen(false);
            }

            if (deleteError) {
                if ("data" in deleteError) {
                    const errorData = deleteError as any;
                    toast.error(errorData?.data?.message);
                }
            }
        }
    },
        [updateError, isSuccess, deleteError, deleteSuccess]);


    const columns = [
        { field: "id", headerName: "_id", flex: 0.3 },
        { field: "title", headerName: "Name", flex: 0.5 },
        { field: "email", headerName: "Email", flex: 0.5 },
        { field: "role", headerName: "Role", flex: 0.5 },
        { field: "courses", headerName: "Purchased Items", flex: 0.5 },
        { field: "created_at", headerName: "Joined At", flex: 0.5 },
        {
            field: " ", headerName: "Mail", flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button asChild>
                            <a
                                href={`mailto:${params.row.email}`}>
                                <Mail />
                            </a>
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
                            setUserId(params.row.id);
                        }}>
                            <AiOutlineDelete />
                        </Button>
                    </>
                );
            }
        },
    ];
    const rows: any = [];

    if (isTeam) {
        const newData = data && data.users.filter((item: any) => item.role === "admin")
        newData && newData.forEach((item: any) => {
            rows.push({
                id: item._id,
                title: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt)
            })
        })
    } else {
        data && data.users.forEach((item: any) => {
            rows.push({
                id: item._id,
                title: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt)
            })
        })
    }


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
                            <div className="w-full flex justify-end">
                                <Button onClick={() => setActive(!active)}> <Plus /> Add New Member</Button>
                            </div>
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
                            {active && (
                                <Dialog open={active} onOpenChange={setActive}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Update User</DialogTitle>
                                            <DialogDescription />
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit}>
                                            <CardHeader>
                                                <CardTitle>Update User Information</CardTitle>
                                                <CardDescription>Update the user's email and role.</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid gap-4">
                                                    {/* Email Field */}
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={email}  // Bind to the email state
                                                            onChange={(e) => setEmail(e.target.value)}  // Update email when typed
                                                            required
                                                        />
                                                    </div>

                                                    {/* Role Field */}
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Label htmlFor="role">Role</Label>
                                                        <Select value={role} onValueChange={setRole}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Role" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="admin">Admin</SelectItem>
                                                                <SelectItem value="user">User</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex justify-between">
                                                <Button variant="outline" onClick={() => setActive(false)}>Cancel</Button>
                                                <Button type="submit">Update User</Button>
                                            </CardFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            )}
                            {open && (
                                <Dialog open={open} onOpenChange={setOpen}>

                                    <DialogTrigger asChild>
                                        <Button variant="outline">Edit Profile</Button>
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

export default Team;
