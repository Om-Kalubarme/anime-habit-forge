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
  
  const quote = motivationalQuotes[currentQuote];
  
  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
  };

  return (
    <div className="bg-gradient-motivational text-white rounded-3xl p-8 text-center">
      <blockquote className="text-xl font-medium leading-relaxed mb-4">
        "{quote.text}"
      </blockquote>
      
      <div className="mb-4">
        <p className="text-sm font-semibold">— {quote.author}</p>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={nextQuote}
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        New Quote
      </Button>
    </div>
  );
};