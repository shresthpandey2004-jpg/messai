import { MenuItem } from "@/data/mockData";
import { ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMenuReaction } from "@/contexts/MenuReactionContext";
import { useLikeDislike } from "@/contexts/LikeDislikeContext";

interface MenuCardProps {
  item: MenuItem;
  showFeedback?: boolean;
}

const emojiMap = {
  1: { emoji: "😠", label: "Terrible" },
  2: { emoji: "😕", label: "Bad" },
  3: { emoji: "😐", label: "Okay" },
  4: { emoji: "😊", label: "Good" },
  5: { emoji: "😍", label: "Excellent" }
};

export const MenuCard = ({ item, showFeedback = false }: MenuCardProps) => {
  const { 
    addReaction, 
    getReactionCount, 
    getUserReaction,
    getTotalReactions 
  } = useMenuReaction();
  
  const {
    userVotes,
    toggleLike,
    toggleDislike,
    getLikes,
    getDislikes
  } = useLikeDislike();
  
  const userReaction = getUserReaction(item.id);
  const totalReactions = getTotalReactions(item.id);
  const currentLikes = getLikes(item.id, item.likes);
  const currentDislikes = getDislikes(item.id, item.dislikes);
  const popularity = currentLikes / (currentLikes + currentDislikes) * 100;
  
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
          <button
            onClick={() => toggleLike(item.id, item.likes, item.dislikes)}
            className={cn(
              "flex items-center gap-1 transition-all hover:scale-110",
              userVotes[item.id] === "like" ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
            )}
          >
            <ThumbsUp className={cn("w-4 h-4", userVotes[item.id] === "like" && "fill-primary")} />
            {currentLikes}
          </button>
          <button
            onClick={() => toggleDislike(item.id, item.likes, item.dislikes)}
            className={cn(
              "flex items-center gap-1 transition-all hover:scale-110",
              userVotes[item.id] === "dislike" ? "text-destructive font-bold" : "text-muted-foreground hover:text-destructive"
            )}
          >
            <ThumbsDown className={cn("w-4 h-4", userVotes[item.id] === "dislike" && "fill-destructive")} />
            {currentDislikes}
          </button>
        </div>
        
        {/* Feedback Buttons */}
        {showFeedback && (
          <div className="pt-3 border-t border-border/50">
            <div className="text-xs text-muted-foreground mb-2 flex justify-between items-center">
              <span>Rate this dish</span>
              {totalReactions > 0 && (
                <span className="text-primary font-medium">{totalReactions} reactions</span>
              )}
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => {
                const count = getReactionCount(item.id, rating);
                const isSelected = userReaction === rating;
                
                return (
                  <button
                    key={rating}
                    onClick={() => addReaction(item.id, rating)}
                    className={cn(
                      "flex-1 flex flex-col items-center gap-1 p-2 rounded-lg transition-all hover:bg-muted/50",
                      isSelected && "bg-primary/10 ring-2 ring-primary/50 scale-110"
                    )}
                    title={emojiMap[rating as keyof typeof emojiMap].label}
                  >
                    <span className={cn(
                      "text-2xl transition-transform",
                      isSelected ? "scale-125" : "hover:scale-110"
                    )}>
                      {emojiMap[rating as keyof typeof emojiMap].emoji}
                    </span>
                    {count > 0 && (
                      <span className={cn(
                        "text-xs font-medium",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
