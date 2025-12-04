import { MenuItem } from "@/data/mockData";
import { ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
  onFeedback?: (rating: number) => void;
  showFeedback?: boolean;
}

export const MenuCard = ({ item, onFeedback, showFeedback = false }: MenuCardProps) => {
  const popularity = item.likes / (item.likes + item.dislikes) * 100;
  
  return (
    <div className={cn(
      "glass-card-hover p-5 relative overflow-hidden",
      item.isSpecial && "ring-2 ring-primary/30"
    )}>
      {item.isSpecial && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
          <Sparkles className="w-3 h-3" />
          Special
        </div>
      )}
      
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {item.type}
          </span>
          <h3 className="text-lg font-semibold text-foreground mt-1">{item.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
        </div>
        
        {/* Popularity Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Popularity</span>
            <span>{Math.round(popularity)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full gradient-bg rounded-full transition-all duration-500"
              style={{ width: `${popularity}%` }}
            />
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-primary">
            <ThumbsUp className="w-4 h-4" />
            {item.likes}
          </span>
          <span className="flex items-center gap-1 text-destructive">
            <ThumbsDown className="w-4 h-4" />
            {item.dislikes}
          </span>
        </div>
        
        {/* Feedback Buttons */}
        {showFeedback && (
          <div className="flex gap-2 pt-2 border-t border-border/50">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onFeedback?.(rating)}
                className="flex-1 text-2xl hover:scale-125 transition-transform"
              >
                {rating === 1 && "😠"}
                {rating === 2 && "😕"}
                {rating === 3 && "😐"}
                {rating === 4 && "😊"}
                {rating === 5 && "😍"}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
