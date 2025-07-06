import { useState } from "react";
import { Header } from "@/components/Header";
import { LearningPath } from "@/components/LearningPath";
import { TopicCard } from "@/components/TopicCard";
import { AIAssistant } from "@/components/AIAssistant";
import neuralBackground from "@/assets/neural-background.jpg";

const mockTopics = [
  {
    title: "Neural Network Fundamentals",
    description: "Master the core concepts of artificial neural networks, from perceptrons to deep architectures.",
    progress: 65,
    difficulty: "Beginner" as const,
    estimatedTime: "2-3 weeks",
    topics: ["Perceptrons", "Backpropagation", "Gradient Descent", "Activation Functions"],
  },
  {
    title: "Deep Learning Applications",
    description: "Explore practical applications of deep learning in computer vision and natural language processing.",
    progress: 0,
    difficulty: "Intermediate" as const,
    estimatedTime: "3-4 weeks",
    topics: ["CNNs", "RNNs", "Transfer Learning", "Model Deployment"],
  },
  {
    title: "Advanced AI Architectures",
    description: "Dive deep into transformer models, attention mechanisms, and cutting-edge AI research.",
    progress: 25,
    difficulty: "Advanced" as const,
    estimatedTime: "4-6 weeks",
    topics: ["Transformers", "Attention", "BERT", "GPT Architecture"],
  },
];

const Index = () => {
  const [activeView, setActiveView] = useState<"overview" | "path">("overview");

  const handleStartTopic = (topicTitle: string) => {
    console.log(`Starting topic: ${topicTitle}`);
    setActiveView("path");
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `url(${neuralBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        <Header />
        
        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveView("overview")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeView === "overview"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            Learning Overview
          </button>
          <button
            onClick={() => setActiveView("path")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeView === "path"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            Interactive Path
          </button>
        </div>

        {/* Content */}
        {activeView === "overview" ? (
          <div className="space-y-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold text-foreground">
                Your Learning <span className="text-primary">Journey</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Embark on an adaptive AI-powered learning experience tailored to your pace and learning style.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTopics.map((topic, index) => (
                <TopicCard
                  key={index}
                  {...topic}
                  onStart={() => handleStartTopic(topic.title)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Neural Network <span className="text-primary">Learning Path</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Navigate through interconnected concepts at your own pace
              </p>
            </div>

            <LearningPath />
          </div>
        )}
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Index;
