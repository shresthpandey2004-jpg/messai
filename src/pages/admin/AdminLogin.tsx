import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Shield, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock authentication
    if (email === "shresth@messai.com" && password === "shresth1812") {
      toast({
        title: "Welcome, Admin! 🎉",
        description: "Login successful"
      });
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your email and password",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="glass-card p-8 w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Access the MessAI Admin Dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@messai.com"
              className="bg-muted/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-muted/50 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="hero" className="w-full" size="lg">
            Login to Dashboard
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl text-sm">
          <p className="text-muted-foreground text-center">
            <strong>Demo Credentials:</strong><br />
            Email: admin@messai.com<br />
            Password: admin123
          </p>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-primary hover:underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
