import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface Reaction {
  menuItemId: string;
  rating: number; // 1-5 (1=😠, 2=😕, 3=😐, 4=😊, 5=😍)
  timestamp: string;
}

interface ReactionCounts {
  [menuItemId: string]: {
    1: number; // 😠
    2: number; // 😕
    3: number; // 😐
    4: number; // 😊
    5: number; // 😍
  };
}

interface UserReactions {
  [menuItemId: string]: number; // rating given by user
}

interface MenuReactionContextType {
  reactionCounts: ReactionCounts;
  userReactions: UserReactions;
  addReaction: (menuItemId: string, rating: number) => void;
  removeReaction: (menuItemId: string) => void;
  getTotalReactions: (menuItemId: string) => number;
  getReactionCount: (menuItemId: string, rating: number) => number;
  hasUserReacted: (menuItemId: string) => boolean;
  getUserReaction: (menuItemId: string) => number | null;
}

const MenuReactionContext = createContext<MenuReactionContextType | undefined>(undefined);

const STORAGE_KEY = "messai_menu_reactions";
const USER_REACTIONS_KEY = "messai_user_reactions";

export const MenuReactionProvider = ({ children }: { children: ReactNode }) => {
  const [reactionCounts, setReactionCounts] = useState<ReactionCounts>({});
  const [userReactions, setUserReactions] = useState<UserReactions>({});

  // Load from localStorage on mount
  useEffect(() => {
    const savedCounts = localStorage.getItem(STORAGE_KEY);
    const savedUserReactions = localStorage.getItem(USER_REACTIONS_KEY);
    
    if (savedCounts) {
      setReactionCounts(JSON.parse(savedCounts));
    }
    
    if (savedUserReactions) {
      setUserReactions(JSON.parse(savedUserReactions));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reactionCounts));
  }, [reactionCounts]);

  useEffect(() => {
    localStorage.setItem(USER_REACTIONS_KEY, JSON.stringify(userReactions));
  }, [userReactions]);

  const addReaction = (menuItemId: string, rating: number) => {
    // Check if user already reacted
    const previousRating = userReactions[menuItemId];
    
    if (previousRating === rating) {
      // Same rating clicked - remove it
      removeReaction(menuItemId);
      return;
    }

    // Initialize counts if not exists
    if (!reactionCounts[menuItemId]) {
      reactionCounts[menuItemId] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    }

    setReactionCounts(prev => {
      const newCounts = { ...prev };
      
      // Remove previous reaction count
      if (previousRating) {
        newCounts[menuItemId][previousRating as 1 | 2 | 3 | 4 | 5]--;
      }
      
      // Add new reaction count
      if (!newCounts[menuItemId]) {
        newCounts[menuItemId] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      }
      newCounts[menuItemId][rating as 1 | 2 | 3 | 4 | 5]++;
      
      return newCounts;
    });

    setUserReactions(prev => ({
      ...prev,
      [menuItemId]: rating
    }));

    const emojiMap = {
      1: "😠 Terrible",
      2: "😕 Bad",
      3: "😐 Okay",
      4: "😊 Good",
      5: "😍 Excellent"
    };

    toast.success(`Rated ${emojiMap[rating as 1 | 2 | 3 | 4 | 5]}!`, {
      description: previousRating ? "Your rating has been updated" : "Thanks for your feedback",
    });
  };

  const removeReaction = (menuItemId: string) => {
    const previousRating = userReactions[menuItemId];
    
    if (!previousRating) return;

    setReactionCounts(prev => {
      const newCounts = { ...prev };
      if (newCounts[menuItemId]) {
        newCounts[menuItemId][previousRating as 1 | 2 | 3 | 4 | 5]--;
      }
      return newCounts;
    });

    setUserReactions(prev => {
      const newReactions = { ...prev };
      delete newReactions[menuItemId];
      return newReactions;
    });

    toast.info("Rating removed", {
      description: "Your feedback has been removed",
    });
  };

  const getTotalReactions = (menuItemId: string): number => {
    if (!reactionCounts[menuItemId]) return 0;
    
    return Object.values(reactionCounts[menuItemId]).reduce((sum, count) => sum + count, 0);
  };

  const getReactionCount = (menuItemId: string, rating: number): number => {
    if (!reactionCounts[menuItemId]) return 0;
    return reactionCounts[menuItemId][rating as 1 | 2 | 3 | 4 | 5] || 0;
  };

  const hasUserReacted = (menuItemId: string): boolean => {
    return !!userReactions[menuItemId];
  };

  const getUserReaction = (menuItemId: string): number | null => {
    return userReactions[menuItemId] || null;
  };

  return (
    <MenuReactionContext.Provider
      value={{
        reactionCounts,
        userReactions,
        addReaction,
        removeReaction,
        getTotalReactions,
        getReactionCount,
        hasUserReacted,
        getUserReaction,
      }}
    >
      {children}
    </MenuReactionContext.Provider>
  );
};

export const useMenuReaction = () => {
  const context = useContext(MenuReactionContext);
  if (context === undefined) {
    throw new Error("useMenuReaction must be used within a MenuReactionProvider");
  }
  return context;
};
