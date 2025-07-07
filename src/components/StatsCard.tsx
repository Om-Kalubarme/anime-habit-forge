import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export const StatsCard = ({ 
  title, 
  value, 
  description, 
  change, 
  trend = 'neutral',
  icon 
}: StatsCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'bg-secondary text-secondary-foreground';
      case 'down': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-card hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {value}
        </div>
        <div className="flex items-center justify-between mt-2">
          <CardDescription>{description}</CardDescription>
          {change && (
            <Badge className={`text-xs ${getTrendColor()}`}>
              {change}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};