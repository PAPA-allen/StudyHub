import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import { useGetPaystackPublishableKeyQuery } from '@/redux/features/orders/ordersApi';
import React, { FC, useState, useEffect } from 'react';

type Props = {
  setOpen: any;
  data: any;
};

const CheckoutForm: FC<Props> = ({ setOpen, data }: Props) => {
  const [message, setMessage] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const { data: paystackKeyData, isLoading: keyLoading } = useGetPaystackPublishableKeyQuery({});
  const [paystackPublicKey, setPaystackPublicKey] = useState<string>("");
  const [orderReference, setOrderReference] = useState<string>("");

  // Fetch Paystack Publishable Key
  useEffect(() => {
    if (paystackKeyData) {
      setPaystackPublicKey(paystackKeyData?.PublishableKey || "");
    }
  }, [paystackKeyData]);

  // Handle Paystack payment
  const handlePaystackPayment = async () => {
    if (!paystackPublicKey) {
      setMessage("Paystack public key is missing.");
      return;
    }

    setIsLoading(true);

    try {
      // Create a payment intent (which will generate a unique reference)
      const paymentIntentResponse = await createOrder({
        courseId: data._id,
        payment_info: { amount: data.price * 100, currency: 'GHS' },
      });

      if (paymentIntentResponse.error) {
        setMessage("Error creating payment intent.");
        setIsLoading(false);
        return;
      }

      // Get the payment reference from the payment intent
      const reference = paymentIntentResponse?.data?.reference;
      setOrderReference(reference);

      // Initialize Paystack with the public key and open the payment modal
      const paystack = new (window as any).PaystackPop.setup({
        key: paystackPublicKey,
        email: data.userEmail, // Assuming the email is available
        amount: data.price * 100, // Convert to kobo
        currency: 'GHS',
        ref: reference,
        onClose: () => {
          console.log("Payment window closed");
        },
        callback: (response: any) => {
          // Verify the payment after the user returns from Paystack
          if (response.status === 'success') {
            verifyPayment(response.reference, reference);
          } else {
            setMessage("Payment failed.");
          }
        },
      });

      // Open Paystack modal
      paystack.openIframe();
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  // Verify the payment after the user has been redirected back
  const verifyPayment = async (paystackReference: string, orderReference: string) => {
    try {
      // Call backend to verify payment status
      const paymentVerificationResponse = await createOrder({
        courseId: data._id,
        payment_info: { paystackReference, orderReference },
      });

      if (paymentVerificationResponse.error) {
        setMessage("Payment verification failed.");
      } else {
        setMessage("Payment verified successfully.");
        setOpen(false);
      }
    } catch (error) {
      setMessage("Error verifying payment.");
    }
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={(e) => e.preventDefault()}>
      {keyLoading && <div>Loading Paystack key...</div>}

      {/* Payment button */}
      <button
        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
        onClick={handlePaystackPayment}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Pay now with Paystack'}
      </button>

      {message && (
        <div id="payment-message" className="text-red-500 mt-4">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
