import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: Date;
}

export const AIAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm ARIA, your AI learning companion. I can adapt to your learning style and help you navigate through your ThinkBridge journey. What would you like to explore today?",
      isAI: true,
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isAI: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you're interested in that topic. Let me analyze your learning pattern and suggest the optimal path forward. Based on your progress, I recommend focusing on the fundamentals first.",
        isAI: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* AI Orb */}
      <div 
        className={`ai-assistant rounded-full p-4 cursor-pointer transition-all duration-500 ${
          isExpanded ? 'opacity-50' : 'opacity-100 animate-pulse-glow'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Circle className="w-8 h-8 text-primary animate-float" />
      </div>

      {/* Expanded Chat Interface */}
      {isExpanded && (
        <Card className="absolute bottom-20 right-0 w-96 h-96 floating-card">
          <div className="flex flex-col h-full p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/30">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow"></div>
              <h3 className="font-semibold text-foreground">ARIA</h3>
              <span className="text-xs text-muted-foreground ml-auto">AI Learning Companion</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.isAI
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-secondary/10 border border-secondary/20 ml-8"
                  }`}
                >
                  <p className="text-sm text-foreground">{message.text}</p>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask ARIA anything..."
                className="flex-1 px-3 py-2 bg-input border border-border/30 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary-glow"
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};