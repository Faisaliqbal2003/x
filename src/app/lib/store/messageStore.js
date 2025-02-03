import { create } from 'zustand';

const useMessageStore = create((set) => ({
  messages: [],
  conversations: [],
  activeConversation: null,
  isLoading: false,

  setActiveConversation: (conversation) => 
    set({ activeConversation: conversation }),

  sendMessage: async (message) => {
    set((state) => ({
      messages: [...state.messages, {
        id: Date.now(),
        content: message,
        sender: 'user',
        timestamp: new Date().toISOString(),
      }]
    }));

    // Simulate AI response
    setTimeout(() => {
      set((state) => ({
        messages: [...state.messages, {
          id: Date.now(),
          content: "Thanks for your message! This is an automated response.",
          sender: 'ai',
          timestamp: new Date().toISOString(),
        }]
      }));
    }, 1000);
  },

  fetchConversations: async () => {
    set({ isLoading: true });
    // Simulate API call
    setTimeout(() => {
      set({
        conversations: [
          {
            id: 1,
            user: {
              name: 'Alice Cooper',
              handle: '@alicecooper',
              avatar: '👩',
              status: 'online'
            },
            lastMessage: "I'm interested in your product...",
            time: '2m ago',
            unread: true,
            labels: ['Lead', 'Product Demo']
          },
          // Add more conversations...
        ],
        isLoading: false
      });
    }, 500);
  },
}));

export default useMessageStore; 