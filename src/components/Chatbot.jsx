import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';
import chatbotLogo from './assets/chatbotlogo.png';
import aiIcon from './assets/chatbotlogo.png';
import { FaTrash, FaSignOutAlt, FaPlus } from 'react-icons/fa';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [allChats, setAllChats] = useState([[]]);
  const [chatLabels, setChatLabels] = useState(["First Chat"]);
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('allChats')) || [[]];
    const savedLabels =
      JSON.parse(localStorage.getItem('chatLabels')) || ["First Chat"];
    const savedActiveChatIndex =
      JSON.parse(localStorage.getItem('activeChatIndex')) || 0;

    setAllChats(savedChats);
    setChatLabels(savedLabels);
    setActiveChatIndex(savedActiveChatIndex);
    setChatHistory(savedChats[savedActiveChatIndex] || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('allChats', JSON.stringify(allChats));
    localStorage.setItem('chatLabels', JSON.stringify(chatLabels));
    localStorage.setItem('activeChatIndex', JSON.stringify(activeChatIndex));
  }, [allChats, chatLabels, activeChatIndex]);

  useEffect(() => {
    if (activeChatIndex < allChats.length) {
      const updatedChats = [...allChats];
      updatedChats[activeChatIndex] = chatHistory;
      setAllChats(updatedChats);
    }
  }, [chatHistory, activeChatIndex, allChats]);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const createNewChat = () => {
    const newChats = [...allChats, []];
    const newLabels = [...chatLabels, `Chat ${new Date().toLocaleDateString()}`];

    setAllChats(newChats);
    setChatLabels(newLabels);
    setActiveChatIndex(newChats.length - 1);
    setChatHistory([]);
  };

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const greetingsResponses = {
      hello: 'Hello! How can I assist you today?',
      hi: 'Hi there! What can I do for you?',
      hey: 'Hey! How can I help?',
      greetings: 'Welcome! What would you like to know?',
      'good morning': 'Good morning! How can I assist you today?',
      'good evening': 'Good evening! How may I help you?',
    };

    const messageLower = message.toLowerCase().trim();

    const matchedGreeting = Object.keys(greetingsResponses).find((greeting) =>
      messageLower.includes(greeting)
    );

    if (matchedGreeting) {
      const response = greetingsResponses[matchedGreeting];
      const newChatHistory = [
        ...chatHistory,
        { user: message },
        { ai: response },
      ];
      setChatHistory(newChatHistory);
      setMessage('');
      return;
    }

    const newChatHistory = [...chatHistory, { user: message }];
    setChatHistory(newChatHistory);
    setMessage('');
    setIsTyping(true);

    try {
      const response = await axios.post(
        'https://chatbotbackend-m8tb.onrender.com/chat',
        { message }
      );
      const aiMessage = response.data.response;

      const updatedChatHistory = [
        ...newChatHistory,
        { ai: aiMessage },
      ];
      setChatHistory(updatedChatHistory);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const showConfirmation = () => {
    setIsConfirming(true);
  };

  const clearChatHistory = () => {
    const updatedChats = allChats.map((chat, index) =>
      index === activeChatIndex ? [] : chat
    );
    setAllChats(updatedChats);
    setChatHistory([]);
    setIsConfirming(false);
  };

  const cancelClearChatHistory = () => {
    setIsConfirming(false);
  };

  const showLogoutConfirmation = () => {
    setIsLoggingOut(true);
  };

  const logout = () => {
    window.location.href = 'https://chatbot32-e6oa.onrender.com';
  };

  const cancelLogout = () => {
    setIsLoggingOut(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-sidebar">
        <button onClick={createNewChat} className="new-chat-button">
          <FaPlus /> New Chat
        </button>
        <div className="chat-sessions">
          {allChats.map((chat, index) => (
            <div
              key={index}
              className={`chat-session ${
                index === activeChatIndex ? 'active' : ''
              }`}
              onClick={() => {
                setActiveChatIndex(index);
                setChatHistory(chat);
              }}
            >
              {chatLabels[index] || `Chat ${index + 1}`}
            </div>
          ))}
        </div>
      </div>

      <div className="chatbot">
        <div className="chatbot-header">
          <img
            src={chatbotLogo}
            alt="Chatbot Logo"
            className="chatbot-logo"
          />
          <FaSignOutAlt
            className="logout-icon"
            onClick={showLogoutConfirmation}
          />
          <FaTrash
            className="clear-chats-icon"
            onClick={showConfirmation}
          />
        </div>

        {isConfirming && (
          <>
            <div
              className="backdrop"
              onClick={cancelClearChatHistory}
            ></div>
            <div className="confirmation-modal">
              <p>Are you sure you want to delete all chats?</p>
              <div className="modal-buttons">
                <button
                  onClick={clearChatHistory}
                  className="confirm-button"
                >
                  Yes
                </button>
                <button
                  onClick={cancelClearChatHistory}
                  className="cancel-button"
                >
                  No
                </button>
              </div>
            </div>
          </>
        )}

        {isLoggingOut && (
          <>
            <div className="backdrop" onClick={cancelLogout}></div>
            <div className="confirmation-modal">
              <p>Are you sure you want to log out?</p>
              <div className="modal-buttons">
                <button onClick={logout} className="confirm-button">
                  Yes
                </button>
                <button
                  onClick={cancelLogout}
                  className="cancel-button"
                >
                  No
                </button>
              </div>
            </div>
          </>
        )}

        <div className="chat-history" ref={chatHistoryRef}>
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={msg.user ? 'user-message' : 'ai-message'}
            >
              {msg.user && (
                <p className="user">
                  <strong>You:</strong> {msg.user}
                </p>
              )}
              {msg.ai && (
                <p className="ai">
                  <img
                    src={aiIcon}
                    alt="AI Icon"
                    className="ai-icon"
                  />
                  {msg.ai}
                </p>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Message Chatbot..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
