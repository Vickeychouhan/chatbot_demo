import React, { useState } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [context, setContext] = useState('');

  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const sendMessage = () => {
    const newMessages = [...messages, { text: userMessage, sender: 'user' }];
    setMessages(newMessages);

    let botMessage = "";

    if (userMessage.trim()) {
      const greeting = getTimeBasedGreeting();
      botMessage = `${greeting},I am VV&T Genie. How may I help you?`;
      setOptions([
        "Know about Discovery",
        "Know about Report",
        "Know about Test Ground",
        "Know about Feature Walk"
      ]);
      setContext('initial');
    } else {
      botMessage = "Sorry, I didn't understand that.";
    }

    const newBotMessages = [...newMessages, { text: botMessage, sender: 'bot' }];
    setMessages(newBotMessages);
    setUserMessage('');
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    const newMessages = [...messages, { text: option, sender: 'user' }];
    setMessages(newMessages);

    let botMessage = "";
    if (option === "Know about Test Ground") {
      botMessage = "Test Ground selected";
      setOptions([
        "User Story Elicitation & Derived Requirements",
        "Clarifying Questions and Queries",
        "Test Scenarios Identification",
        "Test Case Table Generation",
        "Impact Assessment and Test Coverage Expansion",
        "Standardize Test Case Formats",
        "Reviewing Test Cases w.r.t. ISO Compliance",
        "Root Cause Analysis (RCA) on Missed Bugs",
        "Weak Areas Analysis for Accelerated Defect Detection",
        "Optimizing Test Cases for Efficiency",
        "Execution Plan for QA Activities"
      ]);
      setContext('testGround');
    } else if (option === "Know about Discovery") {
      botMessage = "Discovery details: Overview, Process, Key Features, and Benefits";
      setOptions([]);
    } else if (option === "Know about Report") {
      botMessage = "Report details: Latest Reports, Report Summary, Detailed Analysis";
      setOptions([]);
    }

    const newBotMessages = [...newMessages, { text: botMessage, sender: 'bot' }];
    setMessages(newBotMessages);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Chatbot Assistant</h2>
      </div>
      <div className="chatbot-body">
        {/* Display chat messages */}
        <div className="chatbox">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Display options dynamically */}
        {options.length > 0 && (
          <div className="options-container">
            {options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Input field for user message */}
        <div className="user-input">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
