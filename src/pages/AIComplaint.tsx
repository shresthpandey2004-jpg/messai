import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { weeklyMenu, complaintTemplates, generateComplaint } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, RefreshCw, Send, Copy, Check } from "lucide-react";

const AIComplaint = () => {
  const [selectedDish, setSelectedDish] = useState<string>("");
  const [rating, setRating] = useState<number>(2);
  const [generatedComplaint, setGeneratedComplaint] = useState<string>("");
  const [customComplaint, setCustomComplaint] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!selectedDish) {
      toast({
        title: "Select a dish",
        description: "Please select the dish you want to complain about",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const dish = weeklyMenu.find(d => d.id === selectedDish);
      if (dish) {
        const baseComplaint = generateComplaint(rating, dish.name);
        const additionalComplaints = complaintTemplates
          .sort(() => Math.random() - 0.5)
          .slice(0, 2)
          .join(" ");
        
        const fullComplaint = `${baseComplaint} ${additionalComplaints}\n\nI kindly request the mess administration to look into this matter and improve the food quality. Thank you.`;
        setGeneratedComplaint(fullComplaint);
        setCustomComplaint(fullComplaint);
      }
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customComplaint);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "Your complaint has been copied"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    toast({
      title: "Complaint Submitted! 📝",
      description: "Your complaint has been sent to the mess administration"
    });
  };

  const emojis = ['😠', '😕', '😐'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI Powered
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complaint <span className="gradient-text">Generator</span>
            </h1>
            <p className="text-muted-foreground">
              Let AI help you express your concerns professionally
            </p>
          </div>
          
          <div className="glass-card p-8 space-y-6">
            {/* Dish Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Select the dish you want to complain about
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {weeklyMenu.slice(0, 9).map((dish) => (
                  <button
                    key={dish.id}
                    onClick={() => setSelectedDish(dish.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedDish === dish.id
                        ? 'border-primary bg-primary/10 shadow-md'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <span className="text-xs text-muted-foreground">{dish.type}</span>
                    <p className="font-medium text-foreground truncate">{dish.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                How was the food quality?
              </label>
              <div className="flex gap-4 justify-center">
                {emojis.map((emoji, idx) => {
                  const value = idx + 1;
                  const labels = ['Terrible', 'Poor', 'Average'];
                  return (
                    <button
                      key={value}
                      onClick={() => setRating(value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                        rating === value
                          ? 'border-primary bg-primary/10 scale-110'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      <span className="text-4xl">{emoji}</span>
                      <span className="text-xs text-muted-foreground">{labels[idx]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleGenerate}
                variant="hero"
                size="lg"
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Complaint'}
              </Button>
            </div>

            {/* Generated Complaint */}
            {generatedComplaint && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-foreground">
                    Generated Complaint
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGenerate}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </Button>
                </div>
                
                <Textarea
                  value={customComplaint}
                  onChange={(e) => setCustomComplaint(e.target.value)}
                  className="min-h-[150px] bg-muted/50"
                  placeholder="Your complaint will appear here..."
                />

                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Complaint
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIComplaint;
