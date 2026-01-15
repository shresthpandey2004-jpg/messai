import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { getTodaysMenu, MenuItem } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { Send, Check } from "lucide-react";

interface FeedbackState {
  [key: string]: number;
}

const Feedback = () => {
  const [feedback, setFeedback] = useState<FeedbackState>({});
  const [submitted, setSubmitted] = useState<string[]>([]);
  
  // Get today's menu items (all 4 meals for current day)
  const todayMenu = getTodaysMenu();

  const handleRating = (itemId: string, rating: number) => {
    setFeedback(prev => ({ ...prev, [itemId]: rating }));
  };

  const handleSubmit = (item: MenuItem) => {
    const rating = feedback[item.id];
    if (!rating) {
      toast({
        title: "Please select a rating",
        description: "Tap an emoji to rate the dish",
        variant: "destructive"
      });
      return;
    }

    setSubmitted(prev => [...prev, item.id]);
    toast({
      title: "Feedback Submitted! 🎉",
      description: `You rated ${item.name} ${rating}/5 stars`
    });

    // If rating is low, suggest complaint page
    if (rating <= 2) {
      setTimeout(() => {
        toast({
          title: "Not satisfied?",
          description: "Use our AI Complaint Generator to express your concerns",
        });
      }, 1500);
    }
  };

  const emojis = ['😠', '😕', '😐', '😊', '😍'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Rate <span className="gradient-text">Today's Meals</span>
            </h1>
            <p className="text-muted-foreground">
              Your feedback helps us improve the mess quality
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Showing {todayMenu.length} meals for {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
          </div>
          
          <div className="space-y-6">
            {todayMenu.map((item, index) => {
              const isSubmitted = submitted.includes(item.id);
              const currentRating = feedback[item.id];
              
              return (
                <div 
                  key={item.id} 
                  className="glass-card p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted px-2 py-1 rounded">
                          {item.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.day}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-3">
                      {/* Emoji Rating */}
                      <div className="flex gap-2">
                        {emojis.map((emoji, idx) => {
                          const rating = idx + 1;
                          const isSelected = currentRating === rating;
                          return (
                            <button
                              key={rating}
                              onClick={() => !isSubmitted && handleRating(item.id, rating)}
                              disabled={isSubmitted}
                              className={`text-3xl transition-all duration-200 ${
                                isSelected 
                                  ? 'scale-125 drop-shadow-lg' 
                                  : 'hover:scale-110 opacity-60 hover:opacity-100'
                              } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              {emoji}
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Submit Button */}
                      <Button
                        onClick={() => handleSubmit(item)}
                        disabled={isSubmitted || !currentRating}
                        variant={isSubmitted ? "secondary" : "default"}
                        className="gap-2"
                      >
                        {isSubmitted ? (
                          <>
                            <Check className="w-4 h-4" />
                            Submitted
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
