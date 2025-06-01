import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageRenderer } from "./MessageRenderer";

interface Agent {
  id: string;
  name: string;
  description: string;
  personality: string;
  icon: React.ReactNode;
  color: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatInterfaceProps {
  agent: Agent;
  onBack: () => void;
}

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: {
      header: 'bg-gradient-to-r from-blue-600 to-blue-700',
      iconBg: 'bg-blue-100 text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    green: {
      header: 'bg-gradient-to-r from-green-600 to-green-700',
      iconBg: 'bg-green-100 text-green-600',
      button: 'bg-green-600 hover:bg-green-700'
    },
    pink: {
      header: 'bg-gradient-to-r from-pink-600 to-pink-700',
      iconBg: 'bg-pink-100 text-pink-600',
      button: 'bg-pink-600 hover:bg-pink-700'
    },
    purple: {
      header: 'bg-gradient-to-r from-purple-600 to-purple-700',
      iconBg: 'bg-purple-100 text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700'
    },
    orange: {
      header: 'bg-gradient-to-r from-orange-600 to-orange-700',
      iconBg: 'bg-orange-100 text-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700'
    },
    indigo: {
      header: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
      iconBg: 'bg-indigo-100 text-indigo-600',
      button: 'bg-indigo-600 hover:bg-indigo-700'
    }
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};

export function ChatInterface({ agent, onBack }: ChatInterfaceProps) {
  const colors = getColorClasses(agent.color);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm ${agent.name}. ${agent.personality} How can I help you today?`,
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const genAI = new GoogleGenerativeAI("AIzaSyA8zu9RvP7vY3pPLv0sZgNAA5yZq34kdJQ");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `${agent.personality}\n\nUser: ${inputMessage}\n\nPlease respond in character as ${agent.name}. You can use structured formatting like:
      - **Bold text** for emphasis
      - Lists with bullet points (use - or *)
      - Numbered lists (1. 2. 3.)
      - Tables using | columns |
      - Code blocks with \`code\`
      - Headings with # ## ###
      
      Use these formats when they help organize information clearly.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: text,
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again.",
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 flex flex-col">
        <CardHeader className={`${colors.header} text-white p-3 sm:p-6`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-white hover:bg-white/20 p-1 sm:p-2 min-w-[32px] min-h-[32px] flex items-center justify-center flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0`}>
              {agent.icon}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base sm:text-lg truncate">{agent.name}</CardTitle>
              <p className="text-xs sm:text-sm opacity-90 line-clamp-2 sm:line-clamp-1">{agent.description}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-2 sm:p-4">
            <div className="space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] sm:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : colors.iconBg
                    }`}>
                      {message.sender === 'user' ? <User className="w-3 h-3 sm:w-4 sm:h-4" /> : <Bot className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </div>
                    <div className={`rounded-lg p-2 sm:p-3 min-w-0 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : `bg-gray-100 text-gray-800`
                    }`}>
                      <MessageRenderer 
                        text={message.text} 
                        isUser={message.sender === 'user'}
                      />
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${colors.iconBg} flex items-center justify-center`}>
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                        <span className="text-xs sm:text-sm text-gray-600">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="border-t p-2 sm:p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 text-sm sm:text-base"
              />
              <Button 
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`${colors.button} px-3 sm:px-4 min-w-[40px] min-h-[40px] flex items-center justify-center flex-shrink-0`}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
