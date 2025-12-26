'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endTime: Date | string;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime, className = '' }) => {
  const calculateTimeRemaining = (): TimeRemaining => {
    const end = typeof endTime === 'string' ? new Date(endTime) : endTime;
    const now = new Date();
    const total = end.getTime() - now.getTime();

    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds, total };
  };

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeRemaining.total <= 0) {
    return (
      <div className={`text-gray-400 text-sm ${className}`}>
        已结束
      </div>
    );
  }

  return (
    <div className={`font-mono ${className}`}>
      <div className="flex items-center gap-1 text-[#F3BA2F]">
        {timeRemaining.days > 0 && (
          <>
            <span className="font-bold">{timeRemaining.days}</span>
            <span className="text-xs text-gray-400">天</span>
          </>
        )}
        <span className="font-bold">{String(timeRemaining.hours).padStart(2, '0')}</span>
        <span className="text-xs text-gray-400">:</span>
        <span className="font-bold">{String(timeRemaining.minutes).padStart(2, '0')}</span>
        <span className="text-xs text-gray-400">:</span>
        <span className="font-bold">{String(timeRemaining.seconds).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

