import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle, CircleDot, Star } from "lucide-react";

interface LearningNode {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "locked" | "available";
  position: { x: number; y: number };
  connections: string[];
}

const mockNodes: LearningNode[] = [
  {
    id: "1",
    title: "Introduction to Neural Networks",
    description: "Fundamental concepts and basic architecture",
    status: "completed",
    position: { x: 10, y: 20 },
    connections: ["2", "3"],
  },
  {
    id: "2",
    title: "Deep Learning Foundations",
    description: "Understanding layers, weights, and backpropagation",
    status: "current",
    position: { x: 40, y: 35 },
    connections: ["4", "5"],
  },
  {
    id: "3",
    title: "Activation Functions",
    description: "ReLU, Sigmoid, and advanced activation methods",
    status: "available",
    position: { x: 25, y: 60 },
    connections: ["5"],
  },
  {
    id: "4",
    title: "Convolutional Networks",
    description: "CNN architecture for image processing",
    status: "locked",
    position: { x: 70, y: 50 },
    connections: ["6"],
  },
  {
    id: "5",
    title: "Optimization Techniques",
    description: "Adam, SGD, and advanced optimizers",
    status: "available",
    position: { x: 55, y: 75 },
    connections: ["6"],
  },
  {
    id: "6",
    title: "Advanced Applications",
    description: "Real-world implementation and deployment",
    status: "locked",
    position: { x: 80, y: 85 },
    connections: [],
  },
];

export const LearningPath = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodeIcon = (status: LearningNode["status"]) => {
    switch (status) {
      case "completed":
        return <Star className="w-6 h-6 text-accent fill-current" />;
      case "current":
        return <CircleDot className="w-6 h-6 text-primary animate-pulse-glow" />;
      case "available":
        return <Circle className="w-6 h-6 text-secondary" />;
      case "locked":
        return <Circle className="w-6 h-6 text-muted-foreground opacity-50" />;
    }
  };

  const getNodeClasses = (status: LearningNode["status"], isHovered: boolean, isSelected: boolean) => {
    const baseClasses = "learning-path-node rounded-full w-16 h-16 flex items-center justify-center cursor-pointer";
    
    if (status === "locked") {
      return `${baseClasses} opacity-50 cursor-not-allowed`;
    }
    
    if (isSelected) {
      return `${baseClasses} ring-2 ring-accent scale-110`;
    }
    
    if (isHovered) {
      return `${baseClasses} scale-105`;
    }
    
    return baseClasses;
  };

  const handleNodeClick = (node: LearningNode) => {
    if (node.status === "locked") return;
    setSelectedNode(selectedNode === node.id ? null : node.id);
  };

  const selectedNodeData = mockNodes.find(n => n.id === selectedNode);

  return (
    <div className="relative w-full min-h-[600px] p-8">
      {/* Background Neural Network Effect */}
      <div className="absolute inset-0 neural-background opacity-30 rounded-xl"></div>
      
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {mockNodes.map(node =>
          node.connections.map(connectionId => {
            const targetNode = mockNodes.find(n => n.id === connectionId);
            if (!targetNode) return null;
            
            const isActive = node.status === "completed" || node.status === "current";
            
            return (
              <line
                key={`${node.id}-${connectionId}`}
                x1={`${node.position.x}%`}
                y1={`${node.position.y}%`}
                x2={`${targetNode.position.x}%`}
                y2={`${targetNode.position.y}%`}
                stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                strokeWidth="2"
                strokeOpacity={isActive ? "0.6" : "0.3"}
                className={isActive ? "animate-pulse" : ""}
              />
            );
          })
        )}
      </svg>

      {/* Learning Nodes */}
      {mockNodes.map(node => (
        <div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${node.position.x}%`,
            top: `${node.position.y}%`,
          }}
        >
          <div
            className={getNodeClasses(
              node.status,
              hoveredNode === node.id,
              selectedNode === node.id
            )}
            onClick={() => handleNodeClick(node)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {getNodeIcon(node.status)}
          </div>
          
          {/* Node Label */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
            <h4 className="text-xs font-medium text-foreground whitespace-nowrap">
              {node.title}
            </h4>
          </div>
        </div>
      ))}

      {/* Selected Node Details */}
      {selectedNodeData && (
        <Card className="absolute top-4 left-4 w-80 floating-card p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {getNodeIcon(selectedNodeData.status)}
              <h3 className="text-lg font-semibold text-foreground">
                {selectedNodeData.title}
              </h3>
            </div>
            
            <p className="text-muted-foreground">
              {selectedNodeData.description}
            </p>
            
            {selectedNodeData.status === "current" && (
              <div className="space-y-3">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full shimmer-effect"
                    style={{
                      background: "var(--gradient-progress)",
                      width: "65%"
                    }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">Progress: 65% Complete</p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="bg-primary text-primary-foreground hover:bg-primary-glow"
                disabled={selectedNodeData.status === "locked"}
              >
                {selectedNodeData.status === "completed" ? "Review" : "Continue"}
              </Button>
              {selectedNodeData.status === "available" && (
                <Button variant="outline" size="sm">
                  Preview
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};