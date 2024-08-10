import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css'; // You can add styling in a separate CSS file

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const messageEndRef = useRef(null);
  const username = localStorage.getItem('username');
  const ChatInitiator = localStorage.getItem("ChatInitiator");
  useEffect(() => {
        // Load chat history from localStorage on component mount
        if(ChatInitiator===username){
        const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(savedMessages);
      }
    // Create a new WebSocket connection
   // const ws = new WebSocket('ws://localhost:1337');
     const ws = new WebSocket('wss://certain-light-b0ac84b0f3.strapiapp.com');
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
        const newMessage = { text: event.data, isServer: true };
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, newMessage];
          console.log(updatedMessages)
          localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    // Cleanup WebSocket connection when the component is unmounted
    return () => {
      ws.close();
    };
  }, [ChatInitiator,username]);

  const sendMessage = () => {
    if (input.trim() !== '' && socket) {
      const newMessage = { text: input, isServer: false };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
        localStorage.setItem('ChatInitiator', username);
        return updatedMessages;
      });
  
      socket.send(input); // Correct way to send the message via WebSocket
      setInput('');
    }
  };

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.isServer ? 'server-message' : 'user-message'}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;