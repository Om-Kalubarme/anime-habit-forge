import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { useState } from "react";

interface Quote {
  text: string;
  author: string;
  source: string;
}

const motivationalQuotes: Quote[] = [
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    source: "Disney"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    source: "Philosophy"
  },
  {
    text: "Even if we painstakingly piece together something lost, it doesn't mean things will ever go back to how they were.",
    author: "Howl",
    source: "Howl's Moving Castle"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    source: "History"
  },
  {
    text: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein",
    source: "Science"
  },
  {
    text: "If you want to be strong, learn to fight alone.",
    author: "Vegeta",
    source: "Dragon Ball Z"
  },
  {
    text: "It's not about how hard you hit. It's about how hard you can get hit and keep moving forward.",
    author: "Rocky Balboa",
    source: "Rocky"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    source: "Motivation"
  }
];

export const QuoteCard = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [liked, setLiked] = useState(false);
  
  const quote = motivationalQuotes[currentQuote];
  
  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    setLiked(false);
  };

  return (
    <Card className="bg-gradient-motivational text-white shadow-primary">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Star className="h-8 w-8 text-accent animate-pulse-glow" />
          </div>
          
          <blockquote className="text-lg font-medium leading-relaxed">
            "{quote.text}"
          </blockquote>
          
          <div className="space-y-2">
            <p className="text-sm font-semibold">— {quote.author}</p>
            <p className="text-xs text-white/70">{quote.source}</p>
          </div>
          
          <div className="flex items-center justify-center gap-3 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLiked(!liked)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-current' : ''}`} />
              {liked ? 'Liked' : 'Like'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextQuote}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              New Quote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};