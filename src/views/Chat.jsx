import React, { useState, useRef, useEffect } from 'react';
import { api } from '../services/api';
import Card from '../components/UI/Card';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'coach',
      content: 'Bonjour! Je suis Coach Michel. Comment puis-je vous aider aujourd\'hui?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    // Ajouter message utilisateur
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: 'user',
        content: userMessage,
      },
    ]);

    try {
      const response = await api.sendChatMessage(userMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: 'coach',
          content: response.coach_response,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: 'coach',
          content: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen pb-20">
      <div className="max-w-md mx-auto w-full">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">Coach Michel</h2>
          <p className="text-sm text-gray-dark">
            Posez-moi des questions sur votre entraînement
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 space-y-4" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.from === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <Card
                className={`max-w-[80%] ${
                  msg.from === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-lightest text-gray-darkest'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </Card>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <Card className="bg-gray-lightest">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-dark rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-dark rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-dark rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-lighter">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 px-4 py-2 border border-gray-lighter rounded-lg focus:outline-none focus:border-primary"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-light"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;