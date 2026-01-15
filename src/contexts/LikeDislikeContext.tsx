import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface LikeDislikeState {
  [menuItemId: string]: "like" | "dislike" | null;
}

interface LikeDislikeCounts {
  [menuItemId: string]: {
    likes: number;
    dislikes: number;
  };
}

interface LikeDislikeContextType {
  userVotes: LikeDislikeState;
  counts: LikeDislikeCounts;
  toggleLike: (menuItemId: string, initialLikes: number, initialDislikes: number) => void;
  toggleDislike: (menuItemId: string, initialLikes: number, initialDislikes: number) => void;
  getLikes: (menuItemId: string, initialLikes: number) => number;
  getDislikes: (menuItemId: string, initialDislikes: number) => number;
}

const LikeDislikeContext = createContext<LikeDislikeContextType | undefined>(undefined);

const STORAGE_KEY = "messai_like_dislike";
const COUNTS_KEY = "messai_like_dislike_counts";

export const LikeDislikeProvider = ({ children }: { children: ReactNode }) => {
  const [userVotes, setUserVotes] = useState<LikeDislikeState>({});
  const [counts, setCounts] = useState<LikeDislikeCounts>({});

  // Load from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem(STORAGE_KEY);
    const savedCounts = localStorage.getItem(COUNTS_KEY);
    
    if (savedVotes) {
      setUserVotes(JSON.parse(savedVotes));
    }
    if (savedCounts) {
      setCounts(JSON.parse(savedCounts));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userVotes));
  }, [userVotes]);

  useEffect(() => {
    localStorage.setItem(COUNTS_KEY, JSON.stringify(counts));
  }, [counts]);

  const toggleLike = (menuItemId: string, initialLikes: number, initialDislikes: number) => {
    const currentVote = userVotes[menuItemId];
    
    // Initialize counts if not exists
    if (!counts[menuItemId]) {
      counts[menuItemId] = { likes: initialLikes, dislikes: initialDislikes };
    }

    setUserVotes(prev => {
      const newVotes = { ...prev };
      
      if (currentVote === "like") {
        // Remove like
        delete newVotes[menuItemId];
        setCounts(prevCounts => ({
          ...prevCounts,
          [menuItemId]: {
            ...prevCounts[menuItemId],
            likes: prevCounts[menuItemId].likes - 1
          }
        }));
        toast.info("Like removed");
      } else {
        // Add like
        newVotes[menuItemId] = "like";
        setCounts(prevCounts => {
          const current = prevCounts[menuItemId] || { likes: initialLikes, dislikes: initialDislikes };
          return {
            ...prevCounts,
            [menuItemId]: {
              likes: current.likes + (currentVote === "dislike" ? 0 : 1),
              dislikes: currentVote === "dislike" ? current.dislikes - 1 : current.dislikes
            }
          };
        });
        toast.success("Liked! 👍");
      }
      
      return newVotes;
    });
  };

  const toggleDislike = (menuItemId: string, initialLikes: number, initialDislikes: number) => {
    const currentVote = userVotes[menuItemId];
    
    // Initialize counts if not exists
    if (!counts[menuItemId]) {
      counts[menuItemId] = { likes: initialLikes, dislikes: initialDislikes };
    }

    setUserVotes(prev => {
      const newVotes = { ...prev };
      
      if (currentVote === "dislike") {
        // Remove dislike
        delete newVotes[menuItemId];
        setCounts(prevCounts => ({
          ...prevCounts,
          [menuItemId]: {
            ...prevCounts[menuItemId],
            dislikes: prevCounts[menuItemId].dislikes - 1
          }
        }));
        toast.info("Dislike removed");
      } else {
        // Add dislike
        newVotes[menuItemId] = "dislike";
        setCounts(prevCounts => {
          const current = prevCounts[menuItemId] || { likes: initialLikes, dislikes: initialDislikes };
          return {
            ...prevCounts,
            [menuItemId]: {
              likes: currentVote === "like" ? current.likes - 1 : current.likes,
              dislikes: current.dislikes + (currentVote === "like" ? 0 : 1)
            }
          };
        });
        toast.error("Disliked 👎");
      }
      
      return newVotes;
    });
  };

  const getLikes = (menuItemId: string, initialLikes: number): number => {
    return counts[menuItemId]?.likes ?? initialLikes;
  };

  const getDislikes = (menuItemId: string, initialDislikes: number): number => {
    return counts[menuItemId]?.dislikes ?? initialDislikes;
  };

  return (
    <LikeDislikeContext.Provider
      value={{
        userVotes,
        counts,
        toggleLike,
        toggleDislike,
        getLikes,
        getDislikes,
      }}
    >
      {children}
    </LikeDislikeContext.Provider>
  );
};

export const useLikeDislike = () => {
  const context = useContext(LikeDislikeContext);
  if (context === undefined) {
    throw new Error("useLikeDislike must be used within a LikeDislikeProvider");
  }
  return context;
};
