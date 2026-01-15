import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Calendar, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingSlot {
  date: string;
  breakfast: boolean;
  lunch: boolean;
  snacks: boolean;
  dinner: boolean;
}

const MealBooking = () => {
  const [bookings, setBookings] = useState<BookingSlot[]>(() => {
    // Generate next 7 days
    const dates: BookingSlot[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        breakfast: true,
        lunch: true,
        snacks: true,
        dinner: true,
      });
    }
    return dates;
  });

  const toggleMeal = (dateIndex: number, meal: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    setBookings(prev => {
      const updated = [...prev];
      updated[dateIndex] = {
        ...updated[dateIndex],
        [meal]: !updated[dateIndex][meal],
      };
      return updated;
    });
  };

  const handleSave = () => {
    toast({
      title: "Bookings Saved! ✅",
      description: "Your meal preferences have been updated",
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
    };
  };

  const meals = ['breakfast', 'lunch', 'snacks', 'dinner'] as const;
  const mealEmojis = { breakfast: '🌅', lunch: '☀️', snacks: '☕', dinner: '🌙' };
  const mealTimes = { 
    breakfast: '7:30 - 9:00 AM', 
    lunch: '12:30 - 2:00 PM', 
    snacks: '4:00 - 5:30 PM',
    dinner: '7:30 - 9:00 PM' 
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="gradient-text">Pre-Book</span> Your Meals
            </h1>
            <p className="text-muted-foreground">
              Mark your attendance in advance to avoid food wastage
            </p>
          </div>
          
          <div className="glass-card p-6 md:p-8">
            {/* Header */}
            <div className="grid grid-cols-5 gap-2 md:gap-4 mb-6 text-center">
              <div className="text-sm font-medium text-muted-foreground">Date</div>
              {meals.map(meal => (
                <div key={meal} className="text-sm font-medium text-foreground capitalize">
                  <span className="mr-1">{mealEmojis[meal]}</span>
                  <span className="hidden md:inline">{meal}</span>
                  <div className="text-xs text-muted-foreground hidden lg:block">{mealTimes[meal]}</div>
                </div>
              ))}
            </div>
            
            {/* Booking Grid */}
            <div className="space-y-3">
              {bookings.map((booking, idx) => {
                const { day, date, month } = formatDate(booking.date);
                const isToday = idx === 0;
                
                return (
                  <div
                    key={booking.date}
                    className={cn(
                      "grid grid-cols-5 gap-2 md:gap-4 items-center p-3 rounded-xl transition-all",
                      isToday ? "bg-primary/10 border border-primary/30" : "bg-muted/30 hover:bg-muted/50"
                    )}
                  >
                    {/* Date */}
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{day}</div>
                      <div className="text-sm text-muted-foreground">
                        {date} {month}
                      </div>
                      {isToday && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </div>
                    
                    {/* Meal Toggles */}
                    {meals.map(meal => (
                      <div key={meal} className="flex justify-center">
                        <button
                          onClick={() => toggleMeal(idx, meal)}
                          className={cn(
                            "w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                            booking[meal]
                              ? "gradient-bg text-primary-foreground shadow-lg hover:scale-105"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          )}
                        >
                          {booking[meal] ? (
                            <Check className="w-5 h-5 md:w-6 md:h-6" />
                          ) : (
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-sm text-muted-foreground">
                    Meals booked this week
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {bookings.reduce((acc, b) => acc + (b.breakfast ? 1 : 0) + (b.lunch ? 1 : 0) + (b.snacks ? 1 : 0) + (b.dinner ? 1 : 0), 0)}
                    <span className="text-muted-foreground text-lg"> / 28</span>
                  </p>
                </div>
                
                <Button onClick={handleSave} variant="hero" size="lg" className="gap-2">
                  <Calendar className="w-5 h-5" />
                  Save Bookings
                </Button>
              </div>
            </div>
          </div>
          
          {/* Info Card */}
          <div className="glass-card p-6 mt-6">
            <h3 className="font-semibold text-foreground mb-2">💡 Quick Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Mark meals as present (✓) if you plan to eat</li>
              <li>• Mark absent (✗) if you'll skip a meal</li>
              <li>• You can change bookings until 6 hours before the meal</li>
              <li>• Unused bookings won't be charged</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MealBooking;
