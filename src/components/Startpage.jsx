import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Startpage.module.css";

const Startpage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}> {/* Background image wrapper */}
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Welcome to CHATBOT32</h1>
          <p className={styles.description}>Your Conversation Starts Here!</p>
          <button className={styles.startButton} onClick={handleStart}>
            Start
          </button>
          <div className={styles.manual}>
            <h2>How to Use Our Chatbot</h2>
            <ul>
              <li>Type your question or message and press <strong>Enter</strong> or click <strong>Send</strong>.</li>
              <li>Try greeting the chatbot with "Hello," "Hi," or "Good Morning."</li>
              <li>Create a new chat session with the <strong>New Chat</strong> button.</li>
              <li>Clear chat history with the <strong>Trash</strong> icon or log out using the <strong>Sign Out</strong> icon.</li>
              <li>Feel free to ask any questions or explore chatbot features!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Startpage;
