'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
  title?: string;
}

export function CountdownTimer({ targetDate, title = "Next Drop In" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };

    // Set initial time left on the client
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft?.days ?? 0 },
    { label: "Hours", value: timeLeft?.hours ?? 0 },
    { label: "Minutes", value: timeLeft?.minutes ?? 0 },
    { label: "Seconds", value: timeLeft?.seconds ?? 0 },
  ];
  
  if (!timeLeft) {
    return (
      <div className="rounded-2xl p-8 bg-card border">
        <h3 className="text-center mb-8 gradient-text text-2xl font-bold">{title}</h3>
        <div className="grid grid-cols-4 gap-4">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="text-center">
              <div className="bg-background rounded-lg p-4 mb-2">
                <span className="block text-4xl font-bold tabular-nums">
                  --
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{unit.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-8 bg-card border">
      <h3 className="text-center mb-8 gradient-text text-2xl font-bold">{title}</h3>
      <div className="grid grid-cols-4 gap-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="bg-background rounded-lg p-4 mb-2">
              <motion.span
                key={unit.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="block text-4xl font-bold tabular-nums"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>
            </div>
            <p className="text-sm text-muted-foreground">{unit.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
