import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Dumbbell, Smile, User } from 'lucide-react';

interface Message {
  id: string;
  message: string;
  isAI: boolean;
  createdAt: Date;
  mood?: string;
  metrics?: {
    workout?: string;
    duration?: number;
    intensity?: string;
    energy?: number;
  };
}

const mockMessages: Message[] = [
  {
    id: '1',
    message: "Hey! I'm your AI fitness trainer. How are you feeling today?",
    isAI: true,
    createdAt: new Date(),
  },
];

const moodOptions = [
  { value: 'energetic', label: 'Energetic 💪' },
  { value: 'happy', label: 'Happy 😊' },
  { value: 'neutral', label: 'Neutral 😐' },
  { value: 'tired', label: 'Tired 😴' },
  { value: 'sore', label: 'Sore 🤕' },
];

export function AITrainerPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      message: newMessage,
      isAI: false,
      createdAt: new Date(),
      mood: selectedMood,
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setSelectedMood('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        message: generateAIResponse(userMessage),
        isAI: true,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: Message): string => {
    if (userMessage.mood) {
      switch (userMessage.mood) {
        case 'energetic':
          return "That's the spirit! Let's make the most of your energy with an intense workout. What would you like to focus on today?";
        case 'tired':
          return "I understand. Let's focus on some light stretching and recovery exercises today. How does that sound?";
        case 'sore':
          return "Recovery is important! Let's work on some gentle mobility exercises and make sure you're staying hydrated.";
        default:
          return 'Great to hear from you! Would you like to work on strength, cardio, or flexibility today?';
      }
    }
    return 'Tell me more about your fitness goals for today!';
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">AI Trainer</h2>
            <p className="text-sm text-gray-400">
              Your personal fitness companion
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`flex space-x-2 max-w-[80%] ${
                msg.isAI
                  ? 'items-start'
                  : 'items-end flex-row-reverse space-x-reverse'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${msg.isAI ? 'bg-blue-500/20' : 'bg-green-500/20'}`}
              >
                {msg.isAI ? (
                  <Bot className="w-5 h-5 text-blue-400" />
                ) : (
                  <User className="w-5 h-5 text-green-400" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  msg.isAI ? 'bg-gray-800 text-white' : 'bg-blue-500 text-white'
                }`}
              >
                <p>{msg.message}</p>
                {msg.mood && (
                  <div className="mt-1 text-sm opacity-80">
                    Mood: {moodOptions.find((m) => m.value === msg.mood)?.label}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-800 border-t border-gray-700">
        {!selectedMood && (
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">
              How are you feeling today?
            </p>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
