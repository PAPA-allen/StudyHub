"use client";
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FaDownload } from 'react-icons/fa'; // Example icons
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { useGetAllCoursesQuery } from '@/redux/features/courses/courseApi';
import { format } from 'timeago.js';
import Papa from 'papaparse';
import Loader from '@/components/loader';

type Props = {
  isDashboard: boolean;
};

const AllInvoices = (props: Props) => {
  const { data, isLoading } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  
  const [orderData, setOrderData] = useState<any>([]);

  // Map the data when available
  useEffect(() => {
    if (data) {
      const tab = data.orders.map((item: any) => {
        // Find the user and course based on the IDs in the order
        const user = usersData?.users.find((user: any) => user._id === item.userId);
        const course = coursesData?.courses.find((course: any) => course._id === item.courseId);

        // Return the structured data for the invoice
        return {
          id: item._id,
          userName: user?.name,
          userEmail: user?.email,
          courseTitle: course?.name,
          price: "₵" + course?.price,
          createdAt: format(item.createdAt),
        };
      });

      // Set the order data to be used in the table
      setOrderData(tab);
    }
  }, [data, usersData, coursesData]);

  // CSV download function
  const downloadCSV = () => {
    const csvData = orderData.map((invoice: any) => ({
      ID: invoice.id,
      Name: invoice.userName,
      Email: invoice.userEmail,
      'Course Title': invoice.courseTitle,
      Price: invoice.price,
      'Created At': invoice.createdAt,
    }));

    // Using PapaParse to generate CSV and trigger download
    const csv = Papa.unparse(csvData);

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.target = '_blank';
    link.download = 'invoices.csv';
    link.click();
  };

  return (
  <>
    {
      isLoading?(
        <Loader/>
      ): (
        <Box className="p-6 space-y-6">
      <Typography variant="h4" className="text-gray-800 font-semibold">All Invoices</Typography>
      
      <Card className="shadow-lg p-4">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="text-gray-600">Invoice List</Typography>
            <div className="flex gap-4">
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaDownload />}
                className="hover:bg-blue-600 text-sm lg:text-base flex items-center gap-2"
                onClick={downloadCSV} // Trigger CSV download on click
              >
                <span className="hidden sm:inline">Download CSV</span>
              </Button>
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-semibold text-gray-700">ID</TableCell>
                  <TableCell className="font-semibold text-gray-700">Name</TableCell>
                  <TableCell className="font-semibold text-gray-700">Email</TableCell>
                  <TableCell className="font-semibold text-gray-700">Course Title</TableCell>
                  <TableCell className="font-semibold text-gray-700">Price</TableCell>
                  <TableCell className="font-semibold text-gray-700">Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData?.map((invoice: any) => (
                  <TableRow key={invoice.id} className="hover:bg-gray-100">
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.userName}</TableCell>
                    <TableCell>{invoice.userEmail}</TableCell>
                    <TableCell>{invoice.courseTitle}</TableCell>
                    <TableCell>{invoice.price}</TableCell>
                    <TableCell>{invoice.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
          )
        
    }
    </>
  );
};

export default AllInvoices;
