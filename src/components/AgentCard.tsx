
import { Bot, MessageCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Agent {
  id: string;
  name: string;
  description: string;
  personality: string;
  icon: React.ReactNode;
  color: string;
}

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
}

export function AgentCard({ agent, onSelect }: AgentCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-${agent.color}-200 bg-gradient-to-br from-white to-${agent.color}-50`}>
      <CardHeader className="pb-3">
        <div className={`w-12 h-12 rounded-full bg-${agent.color}-100 flex items-center justify-center mb-2`}>
          {agent.icon}
        </div>
        <CardTitle className="text-lg">{agent.name}</CardTitle>
        <CardDescription className="text-sm">{agent.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => onSelect(agent)}
          className={`w-full bg-${agent.color}-600 hover:bg-${agent.color}-700 text-white`}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat Now
        </Button>
      </CardContent>
    </Card>
  );
}
