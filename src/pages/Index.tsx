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
    description: "Your helpful AI companion for general questions and daily tasks",
    personality: "You are a helpful, friendly, and knowledgeable AI assistant. You provide clear, accurate, and useful information while maintaining a warm and professional tone.",
    icon: <Bot className="w-6 h-6" />,
    color: "blue"
  },
  {
    id: "business",
    name: "Business Advisor",
    description: "Expert guidance for business strategy, entrepreneurship, and growth",
    personality: "You are a seasoned business consultant with expertise in strategy, finance, and entrepreneurship. You provide practical, actionable advice for business growth and success.",
    icon: <Briefcase className="w-6 h-6" />,
    color: "green"
  },
  {
    id: "wellness",
    name: "Wellness Coach",
    description: "Comprehensive support for health, fitness, and personal development",
    personality: "You are a compassionate wellness coach focused on mental health, fitness, and personal development. You provide encouraging, evidence-based guidance for healthy living.",
    icon: <Heart className="w-6 h-6" />,
    color: "pink"
  },
  {
    id: "creative",
    name: "Creative Mentor",
    description: "Inspiration and expert guidance for creative projects and artistic endeavors",
    personality: "You are an inspiring creative mentor with expertise in arts, writing, design, and innovation. You help unleash creativity and provide constructive feedback on creative endeavors.",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "purple"
  },
  {
    id: "tech",
    name: "Tech Expert",
    description: "Technical support, programming guidance, and technology consulting",
    personality: "You are a knowledgeable software engineer and tech expert. You provide clear explanations of technical concepts, coding help, and guidance on technology trends and best practices.",
    icon: <Code className="w-6 h-6" />,
    color: "orange"
  },
  {
    id: "tutor",
    name: "Learning Tutor",
    description: "Educational support and tutoring across various academic subjects",
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
      <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
        <div className="max-w-4xl mx-auto h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)]">
          <ChatInterface agent={selectedAgent} onBack={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Rudra AI - Smart AI Agents Platform
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mt-2">Advanced AI Assistant Interface</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Developed by Rajan Kumar Karn</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        <section className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Choose Your Specialized AI Agent
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            Experience the future of AI assistance with our specialized agents. Each AI is expertly trained in specific domains to provide professional-grade support for business, wellness, creativity, technology, and education.
          </p>
        </section>

        {/* Agents Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16" aria-label="AI Agents Selection">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onSelect={handleAgentSelect}
            />
          ))}
        </section>

        {/* Features Section */}
        <section className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
            Why Choose Rudra AI Platform?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <article className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Domain-Specific AI Expertise</h4>
              <p className="text-sm sm:text-base text-gray-600">Each AI agent is specially trained and optimized for specific use cases, ensuring expert-level assistance tailored to your needs.</p>
            </article>
            <article className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Advanced AI Technology</h4>
              <p className="text-sm sm:text-base text-gray-600">Powered by Google's latest Generative AI technology for natural, intelligent, and contextually aware conversations.</p>
            </article>
            <article className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Intuitive User Experience</h4>
              <p className="text-sm sm:text-base text-gray-600">Clean, modern interface designed for seamless interaction and maximum productivity across all devices.</p>
            </article>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            © 2024 Rudra AI - Advanced AI Agents Platform | Developed by Rajan Kumar Karn
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Powered by Google Generative AI Technology
          </p>
          <nav className="mt-4">
            <p className="text-xs text-gray-600">
              Specializing in AI assistance for business, wellness, creativity, technology, and education
            </p>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Index;
