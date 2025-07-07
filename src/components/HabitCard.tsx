import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, Star } from "lucide-react";
import { useState } from "react";

interface HabitCardProps {
  id: string;
  title: string;
  description: string;
  streak: number;
  completed: boolean;
  category: string;
  targetDays?: number;
  onComplete: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export const HabitCard = ({
  id,
  title,
  description,
  streak,
  completed,
  category,
  targetDays = 30,
  onComplete,
  onViewDetails
}: HabitCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const progress = (streak / targetDays) * 100;
  
  const handleComplete = () => {
    if (!completed) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
      onComplete(id);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'health': return 'bg-secondary text-secondary-foreground';
      case 'productivity': return 'bg-primary text-primary-foreground';
      case 'mindfulness': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={`
      transition-all duration-300 hover:shadow-card cursor-pointer
      ${completed ? 'bg-gradient-success text-white shadow-success' : 'bg-card hover:scale-105'}
      ${isAnimating ? 'animate-bounce-in' : ''}
    `} onClick={() => onViewDetails(id)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={getCategoryColor(category)}>
            {category}
          </Badge>
        </div>
        <CardDescription className={completed ? 'text-white/80' : ''}>
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">{streak} day streak</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {Math.max(0, targetDays - streak)} days to goal
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleComplete();
          }}
          disabled={completed}
          className={`
            w-full transition-all duration-200
            ${completed 
              ? 'bg-white/20 text-white cursor-default' 
              : 'bg-gradient-primary hover:shadow-primary'
            }
          `}
        >
          {completed ? (
            <><Check className="mr-2 h-4 w-4" /> Completed Today</>
          ) : (
            'Mark Complete'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};