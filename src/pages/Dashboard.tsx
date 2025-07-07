import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HabitCard } from "@/components/HabitCard";
import { QuoteCard } from "@/components/QuoteCard";
import { StatsCard } from "@/components/StatsCard";
import { toast } from "@/hooks/use-toast";
import { Clock, Heart, Star, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import growthImage from "@/assets/growth-illustration.jpg";

interface Habit {
  id: string;
  title: string;
  description: string;
  category: string;
  streak: number;
  completed: boolean;
  createdAt: Date;
  completedDates: string[];
  targetDays: number;
}

export const Dashboard = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Morning Exercise',
      description: 'Start the day with 30 minutes of physical activity',
      category: 'Health',
      streak: 12,
      completed: false,
      createdAt: new Date('2024-01-01'),
      completedDates: [],
      targetDays: 30
    },
    {
      id: '2',
      title: 'Read for 20 minutes',
      description: 'Expand knowledge through daily reading',
      category: 'Productivity',
      streak: 8,
      completed: true,
      createdAt: new Date('2024-01-05'),
      completedDates: [],
      targetDays: 21
    },
    {
      id: '3',
      title: 'Meditation',
      description: 'Practice mindfulness and reduce stress',
      category: 'Mindfulness',
      streak: 5,
      completed: false,
      createdAt: new Date('2024-01-10'),
      completedDates: [],
      targetDays: 30
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    category: '',
    targetDays: 30
  });

  const handleCompleteHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completed: true, 
            streak: habit.streak + 1,
            completedDates: [...habit.completedDates, new Date().toISOString()]
          }
        : habit
    ));
    
    toast({
      title: "Habit Completed! 🎉",
      description: "Great job staying consistent with your goals!",
    });
  };

  const handleAddHabit = () => {
    if (!newHabit.title || !newHabit.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in the habit title and category.",
        variant: "destructive"
      });
      return;
    }

    const habit: Habit = {
      id: Date.now().toString(),
      title: newHabit.title,
      description: newHabit.description,
      category: newHabit.category,
      streak: 0,
      completed: false,
      createdAt: new Date(),
      completedDates: [],
      targetDays: newHabit.targetDays
    };

    setHabits(prev => [...prev, habit]);
    setNewHabit({ title: '', description: '', category: '', targetDays: 30 });
    setIsAddDialogOpen(false);
    
    toast({
      title: "New Habit Added! 🌟",
      description: "Your journey to building this habit starts now!",
    });
  };

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const completedToday = habits.filter(habit => habit.completed).length;
  const averageStreak = habits.length > 0 ? Math.round(totalStreak / habits.length) : 0;

  // Reset completed status at midnight (simplified)
  useEffect(() => {
    const resetDaily = () => {
      setHabits(prev => prev.map(habit => ({ ...habit, completed: false })));
    };
    
    // This would normally be done with a proper date check
    const interval = setInterval(resetDaily, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Quote Section */}
      <div className="container mx-auto p-6 pt-8">
        <QuoteCard />
      </div>

      <div className="container mx-auto p-6 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total Streak Days"
            value={totalStreak}
            description="Across all habits"
            icon={<Star className="h-4 w-4" />}
            trend="up"
            change="+12%"
          />
          <StatsCard
            title="Completed Today"
            value={`${completedToday}/${habits.length}`}
            description="Daily progress"
            icon={<Clock className="h-4 w-4" />}
            trend={completedToday === habits.length ? 'up' : 'neutral'}
          />
          <StatsCard
            title="Average Streak"
            value={averageStreak}
            description="Days per habit"
            icon={<Calendar className="h-4 w-4" />}
            trend="up"
          />
          <StatsCard
            title="Active Habits"
            value={habits.length}
            description="Building consistency"
            icon={<Heart className="h-4 w-4" />}
            trend="up"
          />
        </div>

        {/* Action Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Today's Habits</h2>
            <p className="text-muted-foreground">Keep up the momentum!</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:shadow-primary">
                Add New Habit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Habit</DialogTitle>
                <DialogDescription>
                  Start building a new positive habit today!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Habit Title</Label>
                  <Input
                    id="title"
                    value={newHabit.title}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Morning Exercise"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newHabit.description}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Why is this habit important to you?"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newHabit.category} onValueChange={(value) => setNewHabit(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Productivity">Productivity</SelectItem>
                      <SelectItem value="Mindfulness">Mindfulness</SelectItem>
                      <SelectItem value="Learning">Learning</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetDays">Target Days</Label>
                  <Input
                    id="targetDays"
                    type="number"
                    value={newHabit.targetDays}
                    onChange={(e) => setNewHabit(prev => ({ ...prev, targetDays: parseInt(e.target.value) || 30 }))}
                    min="1"
                    max="365"
                  />
                </div>
                <Button onClick={handleAddHabit} className="w-full bg-gradient-primary">
                  Create Habit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Habits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map(habit => (
            <HabitCard
              key={habit.id}
              {...habit}
              onComplete={handleCompleteHabit}
              onViewDetails={(id) => {
                toast({
                  title: "Habit Details",
                  description: "Detailed view coming soon!",
                });
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
};