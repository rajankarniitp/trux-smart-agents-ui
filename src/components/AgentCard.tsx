
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
    <Card className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-${agent.color}-200 bg-gradient-to-br from-white to-${agent.color}-50 h-full flex flex-col`}>
      <CardHeader className="pb-3 flex-shrink-0">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-${agent.color}-100 flex items-center justify-center mb-2`}>
          {agent.icon}
        </div>
        <CardTitle className="text-base sm:text-lg leading-tight">{agent.name}</CardTitle>
        <CardDescription className="text-xs sm:text-sm line-clamp-3">{agent.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-end pt-0">
        <Button 
          onClick={() => onSelect(agent)}
          className={`w-full bg-${agent.color}-600 hover:bg-${agent.color}-700 text-white text-sm sm:text-base py-2 sm:py-2.5`}
        >
          <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Chat Now
        </Button>
      </CardContent>
    </Card>
  );
}
