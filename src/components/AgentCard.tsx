
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

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: {
      border: 'hover:border-blue-200',
      bg: 'bg-gradient-to-br from-white to-blue-50',
      iconBg: 'bg-blue-100',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    green: {
      border: 'hover:border-green-200',
      bg: 'bg-gradient-to-br from-white to-green-50',
      iconBg: 'bg-green-100',
      button: 'bg-green-600 hover:bg-green-700'
    },
    pink: {
      border: 'hover:border-pink-200',
      bg: 'bg-gradient-to-br from-white to-pink-50',
      iconBg: 'bg-pink-100',
      button: 'bg-pink-600 hover:bg-pink-700'
    },
    purple: {
      border: 'hover:border-purple-200',
      bg: 'bg-gradient-to-br from-white to-purple-50',
      iconBg: 'bg-purple-100',
      button: 'bg-purple-600 hover:bg-purple-700'
    },
    orange: {
      border: 'hover:border-orange-200',
      bg: 'bg-gradient-to-br from-white to-orange-50',
      iconBg: 'bg-orange-100',
      button: 'bg-orange-600 hover:bg-orange-700'
    },
    indigo: {
      border: 'hover:border-indigo-200',
      bg: 'bg-gradient-to-br from-white to-indigo-50',
      iconBg: 'bg-indigo-100',
      button: 'bg-indigo-600 hover:bg-indigo-700'
    }
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};

export function AgentCard({ agent, onSelect }: AgentCardProps) {
  const colors = getColorClasses(agent.color);
  
  return (
    <Card className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${colors.border} ${colors.bg} h-full flex flex-col`}>
      <CardHeader className="pb-3 flex-shrink-0">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${colors.iconBg} flex items-center justify-center mb-2`}>
          {agent.icon}
        </div>
        <CardTitle className="text-base sm:text-lg leading-tight">{agent.name}</CardTitle>
        <CardDescription className="text-xs sm:text-sm line-clamp-3">{agent.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-end pt-0">
        <Button 
          onClick={() => onSelect(agent)}
          className={`w-full ${colors.button} text-white text-sm sm:text-base py-2 sm:py-2.5 min-h-[40px] flex items-center justify-center gap-1 sm:gap-2`}
        >
          <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">Chat Now</span>
        </Button>
      </CardContent>
    </Card>
  );
}
