"use client";
import React from "react";
import Image from "next/image";

function PaymentSucessful({ paymentId }: { paymentId: string | null }) {
  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <div className="shadow-xl border text-center mt-20 rounded pb-10">
        <Image
          src="/Assets/payment-sucess.gif"
          width={400}
          height={400}
          alt="sucess"
        />
        <h1 className="text-2xl font-medium font-poppins text-custom-black">
          Payment Sucessful!
        </h1>

        {paymentId && (
          <p className="text-gray-500 text-xs mt-5 font-medium">
            Payment ID : {paymentId}
          </p>
        )}
      </div>
    </div>
  );
}

export default PaymentSucessful;
