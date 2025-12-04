import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Sparkles } from "lucide-react";

const AddMenu = () => {
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    type: "breakfast",
    day: "Monday",
    isSpecial: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!menuItem.name || !menuItem.description) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Menu Item Added! ✅",
      description: `${menuItem.name} has been added to ${menuItem.day}'s ${menuItem.type}`
    });

    // Reset form
    setMenuItem({
      name: "",
      description: "",
      type: "breakfast",
      day: "Monday",
      isSpecial: false,
    });
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast', emoji: '🌅' },
    { value: 'lunch', label: 'Lunch', emoji: '☀️' },
    { value: 'dinner', label: 'Dinner', emoji: '🌙' },
    { value: 'snacks', label: 'Snacks', emoji: '🍿' },
  ];

  return (
    <AdminSidebar>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Add <span className="gradient-text">Menu Item</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Create new dishes for the weekly menu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-6">
          {/* Dish Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Dish Name *
            </label>
            <Input
              value={menuItem.name}
              onChange={(e) => setMenuItem({ ...menuItem, name: e.target.value })}
              placeholder="e.g., Paneer Butter Masala"
              className="bg-muted/50"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <Textarea
              value={menuItem.description}
              onChange={(e) => setMenuItem({ ...menuItem, description: e.target.value })}
              placeholder="Brief description of the dish..."
              className="bg-muted/50"
              required
            />
          </div>

          {/* Day Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Day
            </label>
            <div className="flex flex-wrap gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setMenuItem({ ...menuItem, day })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    menuItem.day === day
                      ? 'gradient-bg text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Meal Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Meal Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mealTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setMenuItem({ ...menuItem, type: type.value })}
                  className={`p-4 rounded-xl text-center transition-all ${
                    menuItem.type === type.value
                      ? 'gradient-bg text-primary-foreground shadow-md'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <span className="text-2xl block mb-1">{type.emoji}</span>
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Special Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuItem({ ...menuItem, isSpecial: !menuItem.isSpecial })}
              className={`w-14 h-8 rounded-full transition-all ${
                menuItem.isSpecial ? 'gradient-bg' : 'bg-muted'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-card shadow-md transition-transform ${
                menuItem.isSpecial ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
            <div>
              <span className="text-sm font-medium text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Mark as Special
              </span>
              <span className="text-xs text-muted-foreground">
                Special items will be highlighted in notifications
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button type="submit" variant="hero" className="flex-1 gap-2">
              <Plus className="w-5 h-5" />
              Add to Menu
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setMenuItem({
                name: "",
                description: "",
                type: "breakfast",
                day: "Monday",
                isSpecial: false,
              })}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </Button>
          </div>
        </form>
      </div>
    </AdminSidebar>
  );
};

export default AddMenu;
