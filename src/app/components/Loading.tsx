import React from "react";
import Image from "next/image";

function Loading() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Image
        src="/Assets/loading.gif"
        alt="loading"
        width={60}
        height={60}
      />
    </div>
  );
}

export default Loading;
