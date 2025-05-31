
import { useState } from "react";
import { Bot, Briefcase, Heart, Lightbulb, Code, BookOpen } from "lucide-react";
import { AgentCard } from "@/components/AgentCard";
import { ChatInterface } from "@/components/ChatInterface";

interface Agent {
  id: string;
  name: string;
  description: string;
  personality: string;
  icon: React.ReactNode;
  color: string;
}

const agents: Agent[] = [
  {
    id: "assistant",
    name: "Smart Assistant",
    description: "Your helpful AI companion for general questions",
    personality: "You are a helpful, friendly, and knowledgeable AI assistant. You provide clear, accurate, and useful information while maintaining a warm and professional tone.",
    icon: <Bot className="w-6 h-6" />,
    color: "blue"
  },
  {
    id: "business",
    name: "Business Advisor",
    description: "Expert guidance for business and entrepreneurship",
    personality: "You are a seasoned business consultant with expertise in strategy, finance, and entrepreneurship. You provide practical, actionable advice for business growth and success.",
    icon: <Briefcase className="w-6 h-6" />,
    color: "green"
  },
  {
    id: "wellness",
    name: "Wellness Coach",
    description: "Support for health, wellness, and personal growth",
    personality: "You are a compassionate wellness coach focused on mental health, fitness, and personal development. You provide encouraging, evidence-based guidance for healthy living.",
    icon: <Heart className="w-6 h-6" />,
    color: "pink"
  },
  {
    id: "creative",
    name: "Creative Mentor",
    description: "Inspiration and guidance for creative projects",
    personality: "You are an inspiring creative mentor with expertise in arts, writing, design, and innovation. You help unleash creativity and provide constructive feedback on creative endeavors.",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "purple"
  },
  {
    id: "tech",
    name: "Tech Expert",
    description: "Technical support and programming guidance",
    personality: "You are a knowledgeable software engineer and tech expert. You provide clear explanations of technical concepts, coding help, and guidance on technology trends and best practices.",
    icon: <Code className="w-6 h-6" />,
    color: "orange"
  },
  {
    id: "tutor",
    name: "Learning Tutor",
    description: "Educational support across various subjects",
    personality: "You are a patient and knowledgeable tutor who excels at explaining complex topics in simple terms. You adapt your teaching style to help students understand and learn effectively.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "indigo"
  }
];

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const handleBack = () => {
    setSelectedAgent(null);
  };

  if (selectedAgent) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto h-[calc(100vh-2rem)]">
          <ChatInterface agent={selectedAgent} onBack={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Truxt AI
            </h1>
            <p className="text-xl text-gray-600 mt-2">Internship Project</p>
            <p className="text-sm text-gray-500 mt-1">Made by Rajan Kumar Karn</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your AI Agent
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select from our specialized AI agents, each designed to help you with different tasks and expertise areas.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onSelect={handleAgentSelect}
            />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Choose Truxt AI?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Specialized Agents</h4>
              <p className="text-gray-600">Each agent is trained for specific domains to provide expert-level assistance.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Intelligent Responses</h4>
              <p className="text-gray-600">Powered by advanced AI technology for natural and helpful conversations.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">User-Friendly</h4>
              <p className="text-gray-600">Simple, intuitive interface designed for seamless user experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Truxt AI - Internship Project by Rajan Kumar Karn
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Powered by Google AI SDK
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
