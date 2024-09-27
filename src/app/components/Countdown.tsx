import React, { useEffect, useState } from "react";

const Countdown: React.FC = () => {
  const initialTime = 11 * 60 * 60 * 1000; // 11 hours in milliseconds

  const calculateTimeLeft = (endTime: number) => {
    const now = new Date().getTime();
    const difference = endTime - now;

    let timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return timeLeft;
  };

  const [endTime, setEndTime] = useState(new Date().getTime() + initialTime);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endTime);
      setTimeLeft(newTimeLeft);

      // Reset timer when it reaches 0
      if (
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setEndTime(new Date().getTime() + initialTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div>
      <div className="bg-red-500 text-white py-1.5 px-2">
        <h2 className="font-poppins font-light text-sm sm:text-base">
          Expires in: {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
        </h2>
      </div>
    </div>
  );
};

export default Countdown;
