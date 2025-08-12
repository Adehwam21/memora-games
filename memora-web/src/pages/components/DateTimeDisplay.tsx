import React, { useEffect, useState } from "react";

export const DateTimeDisplay: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="hidden md:flex flex-col items-start mt-3 md:mt-0 text-gray-600">
      <span className="text-2xl font-bold text-gray-800">{formattedTime} {timeZone}</span>
      <span className="font-semibold text-md">{formattedDate}</span>
    </div>
  );
};
