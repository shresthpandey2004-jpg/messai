import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useStudents } from "@/contexts/StudentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Utensils, Mail, Lock, User, Home, Sparkles, Calendar, MessageSquare, TrendingUp, Shield, Zap, CheckCircle2, ArrowRight, QrCode, Phone, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addStudent, getStudentByEmail } = useStudents();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roomNumber: "",
    phone: "",
    course: "",
    year: "1st Year",
  });

  // Check if coming from landing page with signup intent
  useEffect(() => {
    if (location.state?.isSignup) {
      setIsSignup(true);
    }
  }, [location]);

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    if (password.length < 6) return { strength: 33, label: "Weak", color: "bg-red-500" };
    if (password.length < 10) return { strength: 66, label: "Medium", color: "bg-yellow-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (isSignup) {
      if (!formData.name || !formData.email || !formData.password || !formData.roomNumber || !formData.phone || !formData.course) {
        toast.error("Please fill all required fields");
        setIsLoading(false);
        return;
      }
      
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }

      // Check if student already exists
      const existingStudent = getStudentByEmail(formData.email);
      if (existingStudent) {
        toast.error("Email already registered!");
        setIsLoading(false);
        return;
      }
      
      // Add student to the system
      addStudent({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roomNumber: formData.roomNumber,
        course: formData.course,
        year: formData.year,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
        totalMeals: 0,
        pendingPayment: 0,
      });
      
      // Login the user
      login({
        name: formData.name,
        email: formData.email,
        roomNumber: formData.roomNumber,
        role: "student"
      });
      
      toast.success("Account created successfully! 🎉");
      navigate("/home");
    } else {
      if (!formData.email || !formData.password) {
        toast.error("Please enter email and password");
        setIsLoading(false);
        return;
      }
      
      login({
        name: "Student",
        email: formData.email,
        roomNumber: "A-204",
        role: "student"
      });
      
      navigate("/home");
    }
    
    setIsLoading(false);
  };

  const features = [
    { 
      icon: Calendar, 
      title: "Weekly Menu", 
      desc: "View complete weekly meal schedule with all 4 meals per day",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: MessageSquare, 
      title: "Feedback System", 
      desc: "Rate meals with emoji reactions and provide detailed feedback",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: Sparkles, 
      title: "AI Complaints", 
      desc: "Generate professional complaints automatically using AI",
      color: "from-orange-500 to-red-500"
    },
    { 
      icon: QrCode, 
      title: "QR Entry", 
      desc: "Quick mess entry with personalized QR code scanning",
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: TrendingUp, 
      title: "Analytics", 
      desc: "Track your meal patterns, attendance and spending habits",
      color: "from-indigo-500 to-purple-500"
    },
    { 
      icon: Shield, 
      title: "Secure Payments", 
      desc: "Safe and encrypted payment processing for monthly bills",
      color: "from-teal-500 to-cyan-500"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <div className="hidden lg:block space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
                  <Utensils className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text">MessAI</h1>
                  <p className="text-muted-foreground">Smart Hostel Mess System</p>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                Manage Your Mess Experience{" "}
                <span className="gradient-text">Effortlessly</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Complete digital solution for hostel mess management. Everything you need in one powerful platform.
              </p>
            </div>

            {/* Features Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Key Features</h3>
              <div className="grid gap-4">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="glass-card p-4 hover:scale-[1.02] transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        "bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform",
                        feature.color
                      )}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">What You Get</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold gradient-text">28</div>
                  <div className="text-xs text-muted-foreground mt-1">Weekly Meals</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">4</div>
                  <div className="text-xs text-muted-foreground mt-1">Meals Per Day</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">24/7</div>
                  <div className="text-xs text-muted-foreground mt-1">Access</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <Card className="w-full shadow-2xl border-2">
            <CardHeader className="text-center space-y-4">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold gradient-text">MessAI</span>
              </div>
              
              <CardTitle className="text-3xl">
                {isSignup ? "Create Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription className="text-base">
                {isSignup 
                  ? "Join MessAI to start managing your mess experience" 
                  : "Login to access your personalized mess dashboard"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Signup Fields */}
                {isSignup && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required={isSignup}
                        className="h-11"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required={isSignup}
                          className="h-11"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course" className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Course
                      </Label>
                      <Input
                        id="course"
                        placeholder="e.g., B.Tech CSE"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        required={isSignup}
                        className="h-11"
                      />
                    </div>
                  </>
                )}
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>
                
                {/* Password */}
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
                    className="h-11"
                  />
                  {/* Password Strength */}
                  {isSignup && formData.password && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Password Strength</span>
                        <span className={cn("font-medium", 
                          passwordStrength.strength === 100 ? "text-green-600" :
                          passwordStrength.strength === 66 ? "text-yellow-600" : "text-red-600"
                        )}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full transition-all duration-300", passwordStrength.color)}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                {!isSignup && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                      onClick={() => toast.info("Contact admin to reset password")}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base" 
                  variant="hero"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {isSignup ? "Creating Account..." : "Logging in..."}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {isSignup ? "Create Account" : "Login"}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {isSignup ? "Already have an account?" : "New to MessAI?"}
                    </span>
                  </div>
                </div>

                {/* Toggle Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setFormData({ name: "", email: "", password: "", roomNumber: "", phone: "", course: "", year: "1st Year" });
                  }}
                >
                  {isSignup ? "Login to existing account" : "Create new account"}
                </Button>

                {/* Demo Info */}
                {!isSignup && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      Demo: Use any email and password to login
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
