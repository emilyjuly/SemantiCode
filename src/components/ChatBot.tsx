'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TypingIndicator = () => (
  <div className="message ai typing-indicator">
    <span></span>
    <span></span>
    <span></span>
  </div>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; sender: 'user' | 'ai' }[]
  >([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const toggleChat = () => {
    setMessages([]);
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: { text: string; sender: 'user' | 'ai' }[] = [
      ...messages,
      { text: input, sender: 'user' },
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || 'Error connecting to AI.');

      setMessages([...newMessages, { text: data.response, sender: 'ai' }]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <img
        src="/ai.png"
        alt="Chat AI"
        className="ai-icon"
        onClick={toggleChat}
        style={{ cursor: 'pointer' }}
      />
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <span>Semant AI</span>
            <button onClick={toggleChat}>&times;</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.sender === 'ai' ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children }: any) {
                        if (inline) {
                          return (
                            <code className="inline-code">{children}</code>
                          );
                        }
                        return (
                          <div className="code-container">
                            <pre className="code-block">
                              <code className={className}>{children}</code>
                            </pre>
                          </div>
                        );
                      },
                      p({ children }) {
                        return (
                          <p>
                            {React.Children.toArray(children).map((child) =>
                              typeof child === 'string' ? child : child,
                            )}
                          </p>
                        );
                      },
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {loading && <TypingIndicator />}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
      {error && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg text-center z-50 animate-slide-up"
          role="alert"
        >
          <strong className="font-bold">Erro:</strong> {error}
        </div>
      )}
    </>
  );
};

export default ChatBot;
