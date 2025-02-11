import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
};

const CheckoutForm = ({ setOpen, data,  }: Props) => {
    const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
    const [loadUser, setLoadUser] = useState(false);
    const { } = useLoadUserQuery({ skip: loadUser ? false : true });
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (orderData) {
            setLoadUser(true)
            redirect(`/course-access/${data._id}`)
        }
        console.log("san",orderData)
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    },[orderData, error])
  
  // Configuration for Paystack
  const config = {
    reference: (new Date()).getTime().toString(),
    email: user?.email,
    amount: data?.price * 100,
    publicKey: process.env.NEXT_PUBLIC_PUBLICKEY as string,
    currency: "GHS",
  };
  // Success callback
  const onSuccess = (reference: any) => {
    console.log('Payment Successful: ', reference);

    // Call the createOrder function after successful payment
    createOrder({
      courseId: data._id,
      paymentInfo: reference, // This can be adjusted based on the structure of your payment data
    });
      setIsLoading(false);
    setOpen(false);
    
    // localStorage.setItem(course-${data._id}-purchased, 'true');
    // redirect("/");
  };

  const onClose = () => {
    console.log('Payment dialog closed');
    setOpen(false);  // Close the modal when the user cancels the payment
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Checkout Form</h2>
      <p className=" text-lg mb-6 text-center">Please proceed to payment</p>
  
      <button
        onClick={() => initializePayment({ onSuccess, onClose })}
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Pay with Paystack
      </button>
      
      {/* Optionally, you can add a footer or extra information */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>By continuing, you agree to our Terms and Conditions.</p>
      </div>
    </div>
  );
};

export default CheckoutForm;