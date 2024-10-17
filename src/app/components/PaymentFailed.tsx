import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function PaymentFailed({ errorMessage }: { errorMessage: string | null }) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <div className="shadow-xl border text-center mt-20 rounded p-20 flex flex-col justify-center items-center">
        <Image
          src="/Assets/payment_fail.png"
          width={100}
          height={100}
          alt="sucess"
        />
        <h1 className="text-2xl mt-5 font-medium font-poppins text-custom-black">
          Oops! Payment Failed
        </h1>
        {errorMessage && (
          <p className="text-gray-500 text-xs mt-2 font-medium">
            Payment Error : {errorMessage}
          </p>
        )}
        <button
          className="border border-custom-black w-full py-1 mt-6 text-base rounded-2xl"
          onClick={() => router.push("/home")}
        >
          Conntinue Shopping
        </button>
      </div>
    </div>
  );
}

export default PaymentFailed;
