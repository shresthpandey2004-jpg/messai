import { Navbar } from "@/components/Navbar";
import { MenuCard } from "@/components/MenuCard";
import { weeklyMenu } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyMenu = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Weekly <span className="gradient-text">Menu</span>
            </h1>
            <p className="text-muted-foreground">
              Plan your meals for the entire week
            </p>
          </div>
          
          <Tabs defaultValue="Monday" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 h-auto p-2 bg-muted/50 rounded-2xl mb-8">
              {days.map((day) => (
                <TabsTrigger 
                  key={day} 
                  value={day}
                  className="data-[state=active]:gradient-bg data-[state=active]:text-primary-foreground rounded-xl px-4 py-2"
                >
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {days.map((day) => {
              const dayMenu = weeklyMenu.filter(item => item.day === day);
              return (
                <TabsContent key={day} value={day} className="animate-fade-in">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dayMenu.map((item, index) => (
                      <div key={item.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                        <MenuCard item={item} showFeedback />
                      </div>
                    ))}
                  </div>
                  {dayMenu.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                      No menu items for {day}
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default WeeklyMenu;
