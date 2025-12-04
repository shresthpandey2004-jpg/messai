import { AdminSidebar } from "@/components/AdminSidebar";
import { weeklyMenu, mockBookings } from "@/data/mockData";
import { 
  Users, 
  Utensils, 
  TrendingUp, 
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Calendar
} from "lucide-react";

const AdminDashboard = () => {
  const totalLikes = weeklyMenu.reduce((acc, item) => acc + item.likes, 0);
  const totalDislikes = weeklyMenu.reduce((acc, item) => acc + item.dislikes, 0);
  const satisfactionRate = (totalLikes / (totalLikes + totalDislikes) * 100).toFixed(1);

  const stats = [
    { label: "Total Students", value: "245", icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Menu Items", value: weeklyMenu.length.toString(), icon: Utensils, color: "bg-accent text-accent-foreground" },
    { label: "Satisfaction Rate", value: `${satisfactionRate}%`, icon: TrendingUp, color: "bg-primary/10 text-primary" },
    { label: "Pending Complaints", value: "12", icon: MessageSquare, color: "bg-destructive/10 text-destructive" },
  ];

  const topDishes = [...weeklyMenu]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  return (
    <AdminSidebar>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, <span className="gradient-text">Admin</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your mess today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="glass-card p-5 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Dishes */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Top Performing Dishes
            </h2>
            <div className="space-y-3">
              {topDishes.map((dish, idx) => (
                <div key={dish.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30">
                  <span className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{dish.name}</p>
                    <p className="text-xs text-muted-foreground">{dish.day} - {dish.type}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-primary">
                      <ThumbsUp className="w-4 h-4" />
                      {dish.likes}
                    </span>
                    <span className="flex items-center gap-1 text-destructive">
                      <ThumbsDown className="w-4 h-4" />
                      {dish.dislikes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Bookings */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Meal Bookings
            </h2>
            <div className="space-y-4">
              {['breakfast', 'lunch', 'dinner'].map((meal, idx) => {
                const count = Math.floor(Math.random() * 50) + 180;
                const percentage = (count / 245 * 100).toFixed(0);
                const emojis = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' };
                
                return (
                  <div key={meal}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2 text-foreground capitalize">
                        <span>{emojis[meal as keyof typeof emojis]}</span>
                        {meal}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {count} students ({percentage}%)
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-bg rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%`, animationDelay: `${idx * 200}ms` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">612</p>
                <p className="text-xs text-muted-foreground">Total Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">98%</p>
                <p className="text-xs text-muted-foreground">Attendance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">₹34,272</p>
                <p className="text-xs text-muted-foreground">Revenue</p>
              </div>
            </div>
          </div>

          {/* Recent Complaints */}
          <div className="glass-card p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-destructive" />
              Recent Complaints
            </h2>
            <div className="space-y-3">
              {[
                { text: "Regarding Dal Rice: Food was too oily today.", time: "2 hours ago", status: "pending" },
                { text: "Regarding Upma: Chapati was hard and stale.", time: "5 hours ago", status: "pending" },
                { text: "Regarding Mixed Veg: Vegetables were overcooked.", time: "1 day ago", status: "resolved" },
              ].map((complaint, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                  <div className={`w-2 h-2 rounded-full mt-2 ${complaint.status === 'pending' ? 'bg-destructive' : 'bg-primary'}`} />
                  <div className="flex-1">
                    <p className="text-foreground text-sm">{complaint.text}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">{complaint.time}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        complaint.status === 'pending' 
                          ? 'bg-destructive/10 text-destructive' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default AdminDashboard;
