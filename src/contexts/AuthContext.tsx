import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  roomNumber: string;
  role: "student" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("messai_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    // No default user - user must login
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("messai_user", JSON.stringify(userData));
    toast.success(`Welcome back, ${userData.name}! 👋`, {
      description: "You have successfully logged in",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("messai_user");
    sessionStorage.clear();
    toast.success("Logged out successfully! 👋", {
      description: "See you soon!",
    });
    navigate("/");
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("messai_user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully! ✅", {
        description: "Your changes have been saved",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
