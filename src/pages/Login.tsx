import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Mail, Lock, User, Home } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roomNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignup) {
      // Signup logic
      if (!formData.name || !formData.email || !formData.password || !formData.roomNumber) {
        toast.error("Please fill all fields");
        return;
      }
      
      login({
        name: formData.name,
        email: formData.email,
        roomNumber: formData.roomNumber,
        role: "student"
      });
      
      navigate("/");
    } else {
      // Login logic
      if (!formData.email || !formData.password) {
        toast.error("Please enter email and password");
        return;
      }
      
      // Demo login - accept any credentials
      login({
        name: "Rahul Sharma",
        email: formData.email,
        roomNumber: "A-204",
        role: "student"
      });
      
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center">
              <Utensils className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">MessAI</h1>
              <p className="text-muted-foreground">Smart Hostel Mess System</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Welcome to the Future of Mess Management
            </h2>
            <p className="text-muted-foreground text-lg">
              AI-powered system to manage your hostel mess experience. View menus, give feedback, book meals, and track your expenses - all in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <div className="text-3xl font-bold gradient-text">28</div>
              <div className="text-sm text-muted-foreground">Weekly Meals</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-3xl font-bold gradient-text">AI</div>
              <div className="text-sm text-muted-foreground">Powered System</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-3xl font-bold gradient-text">24/7</div>
              <div className="text-sm text-muted-foreground">Access</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-3xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground">Digital</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold gradient-text">MessAI</span>
            </div>
            <CardTitle className="text-2xl">
              {isSignup ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription>
              {isSignup 
                ? "Sign up to start managing your mess experience" 
                : "Login to access your mess account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required={isSignup}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room" className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Room Number
                    </Label>
                    <Input
                      id="room"
                      placeholder="e.g., A-204"
                      value={formData.roomNumber}
                      onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                      required={isSignup}
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" variant="hero">
                {isSignup ? "Sign Up" : "Login"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  {isSignup ? "Already have an account?" : "Don't have an account?"}
                </span>
                {" "}
                <button
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-primary hover:underline font-medium"
                >
                  {isSignup ? "Login" : "Sign Up"}
                </button>
              </div>

              {!isSignup && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mt-4">
                    Demo: Use any email and password to login
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
