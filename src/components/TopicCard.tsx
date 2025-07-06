import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleDot, Star, Circle } from "lucide-react";

interface TopicCardProps {
  title: string;
  description: string;
  progress: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  topics: string[];
  isActive?: boolean;
  onStart: () => void;
}

export const TopicCard = ({
  title,
  description,
  progress,
  difficulty,
  estimatedTime,
  topics,
  isActive = false,
  onStart,
}: TopicCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-accent bg-accent/10 border-accent/20";
      case "Intermediate":
        return "text-secondary bg-secondary/10 border-secondary/20";
      case "Advanced":
        return "text-primary bg-primary/10 border-primary/20";
      default:
        return "text-muted-foreground bg-muted/10 border-muted/20";
    }
  };

  const getProgressIcon = () => {
    if (progress === 0) return <Circle className="w-4 h-4 text-muted-foreground" />;
    if (progress === 100) return <Star className="w-4 h-4 text-accent fill-current" />;
    return <CircleDot className="w-4 h-4 text-primary animate-pulse" />;
  };

  return (
    <Card className={`floating-card p-6 transition-all duration-300 ${
      isActive ? "ring-2 ring-primary scale-105" : ""
    }`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getProgressIcon()}
              <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            {estimatedTime}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground">{description}</p>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500 shimmer-effect"
              style={{
                background: "var(--gradient-progress)",
                width: `${progress}%`
              }}
            ></div>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Key Topics</h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted/30 text-muted-foreground border border-border/30"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onStart}
          className="w-full bg-primary text-primary-foreground hover:bg-primary-glow transition-all duration-300"
        >
          {progress === 0 ? "Start Learning" : progress === 100 ? "Review" : "Continue"}
        </Button>
      </div>
    </Card>
  );
};