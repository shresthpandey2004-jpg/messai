import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home, 
  Calendar, 
  MessageSquare, 
  AlertTriangle, 
  CalendarCheck, 
  User, 
  Shield,
  Menu,
  X,
  LogOut
} from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/menu", label: "Weekly Menu", icon: Calendar },
  { path: "/feedback", label: "Feedback", icon: MessageSquare },
  { path: "/complaint", label: "AI Complaints", icon: AlertTriangle },
  { path: "/booking", label: "Book Meal", icon: CalendarCheck },
  { path: "/account", label: "My Account", icon: User },
];

export const Navbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl gradient-text">MessAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2",
                      isActive && "shadow-md"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <Link to="/admin">
              <Button variant="outline" size="sm" className="ml-2 gap-2">
                <Shield className="w-4 h-4" />
                Admin
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start gap-3 mt-2">
                  <Shield className="w-5 h-5" />
                  Admin Panel
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 mt-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
