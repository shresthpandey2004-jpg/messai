import { Navbar } from "@/components/Navbar";
import { NotificationBanner } from "@/components/NotificationBanner";
import { MenuCard } from "@/components/MenuCard";
import { Button } from "@/components/ui/button";
import { getTodaysMenu, getSpecialDishes, getRecommendedDishes, weeklyMenu } from "@/data/mockData";
import { Link } from "react-router-dom";
import { ArrowRight, Utensils, Star, Calendar, MessageSquare } from "lucide-react";

const Index = () => {
  const todaysMenu = getTodaysMenu();
  const specialDishes = getSpecialDishes();
  const recommendedDishes = getRecommendedDishes(weeklyMenu);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <NotificationBanner specialDishes={specialDishes} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 hero-gradient">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Utensils className="w-4 h-4" />
            Smart Hostel Mess Management
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Welcome to{" "}
            <span className="gradient-text">MessAI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            AI-powered hostel mess system for smarter dining. View menus, give feedback, 
            book meals, and let AI handle your complaints!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/menu">
              <Button variant="hero" size="xl" className="gap-2">
                <Calendar className="w-5 h-5" />
                View Weekly Menu
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/feedback">
              <Button variant="glass" size="xl" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                Give Feedback
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Today's Menu */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Today's Menu
              </h2>
              <p className="text-muted-foreground mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <Link to="/menu">
              <Button variant="outline" className="gap-2">
                See All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysMenu.map((item, index) => (
              <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <MenuCard item={item} showFeedback />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Dishes */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              AI Recommended
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Most Popular Dishes
            </h2>
            <p className="text-muted-foreground mt-2">
              Based on student feedback and ratings
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {recommendedDishes.map((item, index) => (
              <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            Quick Actions
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, title: "Book Meal", desc: "Pre-book your meals in advance", link: "/booking", color: "bg-primary/10 text-primary" },
              { icon: MessageSquare, title: "Give Feedback", desc: "Rate today's food quality", link: "/feedback", color: "bg-accent text-accent-foreground" },
              { icon: Star, title: "AI Complaints", desc: "Auto-generate complaints", link: "/complaint", color: "bg-destructive/10 text-destructive" },
              { icon: Utensils, title: "My Account", desc: "View bills & attendance", link: "/account", color: "bg-secondary text-secondary-foreground" },
            ].map((action, index) => (
              <Link key={action.title} to={action.link}>
                <div className="glass-card-hover p-6 text-center h-full animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center mx-auto mb-4`}>
                    <action.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            Made with <span className="text-destructive">❤</span> for Hostel Students
          </p>
          <p className="text-sm mt-2">© 2024 MessAI - Smart Hostel Mess System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
