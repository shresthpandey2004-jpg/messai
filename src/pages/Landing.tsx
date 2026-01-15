import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Utensils, 
  Sparkles, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Shield, 
  Zap, 
  QrCode,
  Bell,
  CreditCard,
  Users,
  ChevronRight,
  Check,
  ArrowRight,
  Star,
  Clock,
  Smartphone,
  BarChart3
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/login", { state: { isSignup: true } });
  };

  const features = [
    {
      icon: Calendar,
      title: "Smart Menu Planning",
      description: "Access complete weekly menu with all 4 meals per day. Plan your week ahead and never miss your favorite dishes.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageSquare,
      title: "Interactive Feedback",
      description: "Rate meals with emoji reactions in real-time. Your feedback directly impacts menu improvements.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Complaints",
      description: "Generate professional, well-structured complaints automatically. AI helps you express concerns effectively.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: QrCode,
      title: "Quick QR Entry",
      description: "Skip the queues with personalized QR codes. Fast, contactless mess entry for seamless experience.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Personal Analytics",
      description: "Track your meal patterns, attendance records, and spending habits with detailed insights and charts.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Safe and encrypted payment processing. View bills, payment history, and manage transactions securely.",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const benefits = [
    { icon: Clock, text: "Save time with digital booking" },
    { icon: Smartphone, text: "Access from anywhere, anytime" },
    { icon: BarChart3, text: "Data-driven meal improvements" },
    { icon: Bell, text: "Real-time notifications" },
    { icon: Users, text: "Community feedback system" },
    { icon: CreditCard, text: "Transparent billing" }
  ];

  const stats = [
    { number: "28", label: "Weekly Meals", sublabel: "Breakfast, Lunch, Snacks, Dinner" },
    { number: "4", label: "Meals Per Day", sublabel: "Complete nutrition coverage" },
    { number: "24/7", label: "Platform Access", sublabel: "Manage anytime, anywhere" },
    { number: "100%", label: "Digital", sublabel: "Paperless & eco-friendly" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          {/* Navbar */}
          <nav className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
                <Utensils className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">MessAI</h1>
                <p className="text-xs text-muted-foreground">Smart Mess System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="lg">
                  Login
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="hero" size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Mess Management
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Your Hostel Mess,{" "}
              <span className="gradient-text">Reimagined</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of hostel mess management. Smart, efficient, and designed for students who value their time and preferences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full sm:w-auto gap-2 text-lg h-14 px-8"
                onClick={handleCreateAccount}
              >
                Create Account
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8">
                  Login to Account
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-card p-6 text-center hover:scale-105 transition-transform">
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need in{" "}
              <span className="gradient-text">One Platform</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make your mess experience seamless and enjoyable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">{feature.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-foreground mb-4">
                Why Students{" "}
                <span className="gradient-text">Love MessAI</span>
              </h3>
              <p className="text-xl text-muted-foreground">
                Built with students in mind, designed for efficiency
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4 glass-card p-4 hover:scale-105 transition-transform">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-foreground mb-4">
                Get Started in{" "}
                <span className="gradient-text">3 Simple Steps</span>
              </h3>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Create Your Account",
                  description: "Sign up with your college email and room number. Quick and easy registration process."
                },
                {
                  step: "02",
                  title: "Explore Features",
                  description: "View weekly menus, book meals, give feedback, and track your mess activity."
                },
                {
                  step: "03",
                  title: "Enjoy Seamless Experience",
                  description: "Use QR codes for entry, manage payments, and stay updated with notifications."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start glass-card p-6 hover:scale-[1.02] transition-transform">
                  <div className="text-6xl font-bold gradient-text opacity-20">{item.step}</div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-lg">{item.description}</p>
                  </div>
                  <Check className="w-8 h-8 text-primary flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground">
              Ready to Transform Your{" "}
              <span className="gradient-text">Mess Experience?</span>
            </h3>
            <p className="text-xl text-muted-foreground">
              Join hundreds of students already using MessAI for a better hostel life
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full sm:w-auto gap-2 text-lg h-14 px-8"
                onClick={handleCreateAccount}
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required • Free forever • Setup in 2 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-bold gradient-text">MessAI</div>
                <div className="text-xs text-muted-foreground">Smart Hostel Mess System</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 MessAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
