import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Header = () => {
  return (
    <Card className="floating-card mb-8">
      <div className="flex items-center justify-between p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Think<span className="text-primary">Bridge</span>
          </h1>
          <p className="text-muted-foreground">AI-Powered Adaptive Learning Platform</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Neural Activity Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm text-muted-foreground">AI Active</span>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Alex Chen</p>
              <p className="text-xs text-muted-foreground">Neural Networks Track</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
              <span className="text-primary font-semibold">AC</span>
            </div>
          </div>
          
          <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
            Settings
          </Button>
        </div>
      </div>
    </Card>
  );
};