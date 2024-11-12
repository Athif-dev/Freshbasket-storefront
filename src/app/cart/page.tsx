"use client";
import { useEffect, useState } from "react";
import { loadRazorpayScript } from "../lib/razorpay";
import { useRouter } from "next/navigation";
import PaymentSucessful from "../components/PaymentSucessful";
import Image from "next/image";
import PaymentFailed from "../components/PaymentFailed";
import Signin from "../components/Signin/Signin";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReduxProvider from "../store/reduxProvider";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function page() {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(180);
  const [finalPrice, setFinalPrice] = useState(price);

  const [paymentID, SetPaymentID] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);
  const [showsignup, setShowsignup] = useState(false);

  const isCartEmpty = true;

  if (quantity < 1) {
    setQuantity(1);
  }
  if (finalPrice < price) {
    setFinalPrice(price);
  }

  const handlePriceIncrement = () => {
    if (quantity === 1) {
      setFinalPrice(price);
    }
    setFinalPrice(price * quantity);
  };
  const handlePriceDecrement = () => {
    if (quantity === 1) {
      setFinalPrice(price);
    }
    setFinalPrice(finalPrice - price);
  };
  const router = useRouter();

  useEffect(() => {
    if (isPaymentSuccessful) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isPaymentSuccessful, router]);

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 180,
            currency: "INR",
            receipt: "receipt_order_1234",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create an order");
      }

      const orderData = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "FreshBasket",
        description: "Test Transaction",
        image: "/Assets/Logo.svg",
        order_id: orderData.id,
        handler: (response: any) => {
          SetPaymentID(response.razorpay_payment_id);
          setIsPaymentSuccessful(true);
          // alert(`Payment ID: ${response.razorpay_payment_id}`);
          // alert(`Order ID: ${response.razorpay_order_id}`);
          // alert(`Signature: ${response.razorpay_signature}`);
        },
        prefill: {
          name: "",
          email: "athifcodewiz@gmail.com",
          contact: "9786768612",
        },
        notes: {
          address: "FreshBasket Store",
        },
        theme: {
          color: "#3BB77E",
        },
      };

      const rzp = new (window as any).Razorpay(options);

      // Handle payment failure
      rzp.on("payment.failed", (response: any) => {
        setErrorMessage(response.error.description);
        setIsPaymentFailed(true);
        // alert(`Payment Failed!`);
        // console.error("Payment failed:", response.error);
        // alert(`Error: ${response.error.description}`);
      });

      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Oops! Something went wrong, payment failed.");
    }
  };

  return (
    <>
      {isPaymentSuccessful ? (
        <div className="mt-[3.6rem] sm:mt-[8.8rem] container h-[70vh] lg:h-[50vh] xl:h-[80vh] font-poppins">
          <PaymentSucessful paymentId={paymentID} />
        </div>
      ) : isPaymentFailed ? (
        <div className="mt-[3.6rem] sm:mt-[8.8rem] container h-[70vh] lg:h-[50vh] xl:h-[80vh] font-poppins">
          <PaymentFailed errorMessage={errorMessage} />
        </div>
      ) : isCartEmpty ? (
        <div className="mt-[3.6rem] sm:mt-[12rem] sm:mb-[5rem] container h-max lg:h-max xl:h-max pb-8 font-poppins text-center lg:border lg:w-[60%] lg:shadow-md">
          <Image
            src="/Assets/empty-cart.png"
            width={400}
            height={400}
            alt="empty-cart"
            className="m-auto object-contain"
          />
          <h2 className="text-xl">Missing Cart items?</h2>
          <p className="text-sm mt-1">
            Login to see the items you added previously
          </p>
            <button
              className="w-[40%] bg-main-green text-white py-2 rounded mt-3"
              onClick={() => setShowsignup(true)}
            >
              Login
            </button>
        </div>
      ) : (
        <div className="mt-[3.6rem] sm:mt-[8.8rem] container lg:flex gap-10 h-[70vh] lg:h-[50vh] xl:h-[80vh] font-poppins">
          <div className="lg:w-[65%]">
            <div className="flex justify-between items-center pt-12">
              <h2 className="font-poppins font-semibold text-custom-black text-2xl">
                Cart
              </h2>
              <h2 className="font-poppins font-semibold text-custom-black text-2xl">
                3 Items
              </h2>
            </div>
            <hr className="w-full border border-gray-300 my-5" />
            <table className="min-w-full">
              <thead className="text-gray-500">
                <tr>
                  <th className=" py-2 text-left text-sm font-medium">
                    Product Details
                  </th>
                  <th className="text-left text-sm font-medium">Quantity</th>
                  <th className="text-left text-sm font-medium">Price</th>
                  <th className="text-left text-sm font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="flex">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-[80px] h-[70px] lg:w-[100px] lg:h-[70px] xl:w-[100px] xl:h-[70px]">
                        <Image
                          src="/Assets/product.svg"
                          width={500}
                          height={500}
                          alt="product"
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-sm">Radish, 500 g</h2>
                        <p className="text-xs mt-1 text-red-800 cursor-pointer">
                          Remove
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-5 py-2 px-1 w-1/2 bg-gray-100">
                      <button
                        onClick={() => {
                          setQuantity(quantity - 1);
                          handlePriceDecrement();
                        }}
                        className="text-sm text-custom-black font-medium"
                      >
                        -
                      </button>
                      <p className="text-sm text-custom-black font-medium">
                        {quantity}
                      </p>

                      <button
                        onClick={() => {
                          setQuantity(quantity + 1);
                          handlePriceIncrement();
                        }}
                        className="text-sm text-custom-black font-medium"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm text-gray-500 font-light">
                      ${finalPrice}
                    </p>
                  </td>
                  <td>
                    <p className="text-sm text-custom-black font-meduim">
                      ${finalPrice}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="lg:w-[35%] bg-gray-100 pt-12 pb-10 px-10">
            <h2 className="font-poppins font-semibold text-custom-black text-2xl">
              Order Summary
            </h2>
            <hr className="w-full border border-gray-300 my-5" />
            <div className="flex justify-between items-center ">
              <h2 className="text-sm font-medium">Items 3</h2>
              <h2 className="text-sm font-medium">$180.00</h2>
            </div>
            <div className="flex justify-between pt-5 text-gray-600 text-sm">
              <p className="font-light">Subtotal</p>
              <p className="font-light">$170.00</p>
            </div>
            <div className="flex justify-between pt-1 text-gray-600 text-sm">
              <p className="font-light">Shipping</p>
              <p className="font-light">$0.00</p>
            </div>
            <div className="flex justify-between pt-1 text-gray-600 text-sm">
              <p className="font-light">Taxes</p>
              <p className="font-light">$10.00</p>
            </div>
            <hr className="w-full border border-gray-300 my-5" />
            <div className="flex justify-between pt-1 ">
              <p className="font-light text-gray-600 text-sm">Total Cost</p>
              <p className="font-medium text-custom-black text-base">$180.00</p>
            </div>
            <hr className="w-full border border-gray-300 my-5" />

            <button
              className="w-full bg-main-green py-1.5 text-white rounded"
              onClick={handlePayment}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {showsignup ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className=" relative">
            <button
              className="absolute top-2 right-2 text-white"
              onClick={() => setShowsignup(false)}
            >
              <CloseRoundedIcon />
            </button>
            <ReduxProvider>
              <Signin />
            </ReduxProvider>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default page;
