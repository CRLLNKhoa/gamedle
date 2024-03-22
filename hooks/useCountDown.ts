import React, { useState, useEffect } from 'react';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(): TimeLeft {
  const calculateTimeLeft = (): TimeLeft => {
    const now: Date = new Date();
    const endOfDay: Date = new Date(now);
    endOfDay.setHours(23, 59, 59, 999); // Set end of day time
    const difference: number = endOfDay.getTime() - now.getTime();
    let timeLeft: TimeLeft = { hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return timeLeft;
}
