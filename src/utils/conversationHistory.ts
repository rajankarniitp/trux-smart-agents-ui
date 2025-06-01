export interface ConversationMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentId: string;
}

export interface ConversationHistory {
  [agentId: string]: ConversationMessage[];
}

const STORAGE_KEY = 'rudra-ai-conversations';

export const conversationHistoryUtils = {
  // Load conversation history from localStorage
  loadHistory(): ConversationHistory {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return {};
      
      const parsed = JSON.parse(stored);
      // Convert timestamp strings back to Date objects
      Object.keys(parsed).forEach(agentId => {
        parsed[agentId] = parsed[agentId].map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      });
      
      return parsed;
    } catch (error) {
      console.error('Error loading conversation history:', error);
      return {};
    }
  },

  // Save conversation history to localStorage
  saveHistory(history: ConversationHistory): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving conversation history:', error);
    }
  },

  // Get messages for a specific agent
  getAgentMessages(agentId: string): ConversationMessage[] {
    const history = this.loadHistory();
    return history[agentId] || [];
  },

  // Add a new message to an agent's conversation
  addMessage(agentId: string, message: Omit<ConversationMessage, 'agentId'>): void {
    const history = this.loadHistory();
    if (!history[agentId]) {
      history[agentId] = [];
    }
    
    const fullMessage: ConversationMessage = {
      ...message,
      agentId
    };
    
    history[agentId].push(fullMessage);
    
    // Keep only last 50 messages per agent to prevent localStorage bloat
    if (history[agentId].length > 50) {
      history[agentId] = history[agentId].slice(-50);
    }
    
    this.saveHistory(history);
  },

  // Clear conversation for a specific agent
  clearAgentHistory(agentId: string): void {
    const history = this.loadHistory();
    delete history[agentId];
    this.saveHistory(history);
  },

  // Clear all conversation history
  clearAllHistory(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Get conversation context for AI (last few messages)
  getConversationContext(agentId: string, maxMessages: number = 5): string {
    const messages = this.getAgentMessages(agentId);
    const recentMessages = messages.slice(-maxMessages);
    
    return recentMessages.map(msg => 
      `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
    ).join('\n');
  }
};
