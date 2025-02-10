"use client";

import Heading from '@/app/utils/Heading';
import Loader from '@/components/loader';
import { useGetCourseDetailsQuery } from '@/redux/features/courses/courseApi';
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import CourseDetails from './CourseDetails';
import Footer from '../route/Footer';
import { useCreatePaymentIntentMutation, useGetPaystackPublishableKeyQuery } from '@/redux/features/orders/ordersApi';


type Props = {
    id: string
}
const CourseDetailsPage = ({ id }: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCourseDetailsQuery(id);
    const { data: config } = useGetPaystackPublishableKeyQuery({});;
    const [clientSecret, setClientSecret] = useState('');
    const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation();

  
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Heading
                            title={data.course.name + "-StudyHub"}
                            description={"Studyhub is a place to learn and enrich your knowledge"}
                            keywords={data?.course?.tags} />
                        <Header
                            route={route}
                            setRoute={setRoute}
                            open={open}
                            setOpen={setOpen}
                            activeItem={1} />
                   
                       
                                <CourseDetails
                                        data={data.course}  />
                         
                    




                        <Footer />
                    </div>
                )
            }
        </>
    )
}

export default CourseDetailsPage