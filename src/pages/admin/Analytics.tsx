import { AdminSidebar } from "@/components/AdminSidebar";
import { weeklyMenu } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Download, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Analytics = () => {
  // Prepare data for charts
  const dishData = weeklyMenu
    .sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes))
    .slice(0, 10)
    .map(dish => ({
      name: dish.name.length > 12 ? dish.name.substring(0, 12) + '...' : dish.name,
      likes: dish.likes,
      dislikes: dish.dislikes,
    }));

  const totalLikes = weeklyMenu.reduce((acc, item) => acc + item.likes, 0);
  const totalDislikes = weeklyMenu.reduce((acc, item) => acc + item.dislikes, 0);

  const satisfactionData = [
    { name: 'Likes', value: totalLikes, color: 'hsl(142, 71%, 45%)' },
    { name: 'Dislikes', value: totalDislikes, color: 'hsl(0, 84%, 60%)' },
  ];

  const mealTypeData = ['breakfast', 'lunch', 'dinner', 'snacks'].map(type => {
    const items = weeklyMenu.filter(item => item.type === type);
    const likes = items.reduce((acc, item) => acc + item.likes, 0);
    const dislikes = items.reduce((acc, item) => acc + item.dislikes, 0);
    return {
      name: type.charAt(0).toUpperCase() + type.slice(1),
      likes,
      dislikes,
      satisfaction: ((likes / (likes + dislikes)) * 100).toFixed(1),
    };
  });

  return (
    <AdminSidebar>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Feedback <span className="gradient-text">Analytics</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Insights from student feedback and ratings
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Likes", value: totalLikes, icon: ThumbsUp, color: "text-primary" },
            { label: "Total Dislikes", value: totalDislikes, icon: ThumbsDown, color: "text-destructive" },
            { label: "Total Feedback", value: totalLikes + totalDislikes, icon: null, color: "text-foreground" },
            { label: "Satisfaction", value: `${((totalLikes / (totalLikes + totalDislikes)) * 100).toFixed(1)}%`, icon: null, color: "text-primary" },
          ].map((stat, idx) => (
            <div key={stat.label} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color} flex items-center gap-2`}>
                {stat.icon && <stat.icon className="w-5 h-5" />}
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Dish Popularity Chart */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Dish Popularity (Likes vs Dislikes)
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dishData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" width={100} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="likes" fill="hsl(142, 71%, 45%)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="dislikes" fill="hsl(0, 84%, 60%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Satisfaction Pie Chart */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Overall Satisfaction
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Meal Type Analysis */}
          <div className="glass-card p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Satisfaction by Meal Type
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mealTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="likes" name="Likes" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="dislikes" name="Dislikes" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default Analytics;
