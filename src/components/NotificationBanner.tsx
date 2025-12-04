import { Sparkles, Bell } from "lucide-react";
import { MenuItem } from "@/data/mockData";
import { useEffect, useState } from "react";

interface NotificationBannerProps {
  specialDishes: MenuItem[];
}

export const NotificationBanner = ({ specialDishes }: NotificationBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (specialDishes.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % specialDishes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [specialDishes.length]);

  if (specialDishes.length === 0) return null;

  const currentDish = specialDishes[currentIndex];

  return (
    <div className="gradient-bg text-primary-foreground py-3 px-4 animate-slide-in-right">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Bell className="w-5 h-5 animate-pulse-soft" />
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">Special Today:</span>
          <span className="font-bold">{currentDish.name}</span>
          <span className="text-primary-foreground/80">({currentDish.day} - {currentDish.type})</span>
        </div>
        <Sparkles className="w-4 h-4" />
      </div>
    </div>
  );
};
