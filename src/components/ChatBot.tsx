'use client';

import React, { useState } from 'react';
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

  const toggleChat = () => {
    setMessages([]);
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: { text: string; sender: 'user' | 'ai' }[] = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.response, sender: 'ai' }]);
    } catch (error) {
      console.error('Erro ao chamar API:', error);
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
                      code({ inline, className, children }) {
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
    </>
  );
};

export default ChatBot;
