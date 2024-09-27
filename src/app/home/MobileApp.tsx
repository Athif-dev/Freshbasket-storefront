import Image from "next/image";
import React from "react";

function mobileApp() {
  return (
    <div className="bg-[url('/Assets/hero-bg.png')] bg-cover bg-center h-[23vh] md:h-[25vh] lg:h-[30vh] xl:h-[90vh] w-full font-poppins">
      <div className="container flex justify-between items-center">
        <div className="w-[50%] ">
          <h2 className="lg:text-[2.8rem] xl:text-[3.5rem] font-semibold text-custom-black leading-snug">
            Shop Faster With FreshBasket App
          </h2>
          <p className="text-xs lg:text-lg xl:text-lg text-gray-500 my-2 lg:my-5 xl:my-10">
            Available on both IOS & Android
          </p>
          <div className="flex flex-wrap items-center gap-1 md:gap-4">
            <div className="w-[90px] sm:w-[160px] md:w-[180px] lg:w-[150px] xl:w-[200px] cursor-pointer">
              <Image
                src="/Assets/appStore.svg"
                width={200}
                height={200}
                alt="appstore-logo"
                className="object-contain w-full h-auto"
              />
            </div>
            <div className="w-[93px] sm:w-[160px] md:w-[180px] lg:w-[150px] xl:w-[215px] cursor-pointer">
              <Image
                src="/Assets/playStore.svg"
                width={200}
                height={200}
                alt="playstore-logo"
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="w-[180px] sm:w-[160px] md:w-[180px] lg:w-[350px] xl:w-[600px]">
            <Image
              src="Assets/mobileMockup.svg"
              width={600}
              height={600}
              alt="mockup"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default mobileApp;
