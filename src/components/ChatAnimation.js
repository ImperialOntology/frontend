import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import { motion } from 'framer-motion';

// Fixed messages array to match what's shown in the image
const messages = [
  { sender: 'user', text: 'Why was the game poorly rated?' },
// due to some bugs on motion, this sentence wil not display
  {sender:"user", text:"Nothing"},
  { sender: 'bot', text: 'Because the gameplay was bad.' },
  { sender: 'user', text: 'What did the users say about gameplay?' },
  { sender: 'bot', text: '"...The gameplay was horrible..."' },
  { sender: 'user', text: 'Was this a common complaint among users?' },
  { sender: 'bot', text: 'Yes, many reviews mentioned poor gameplay quality.' },
];

const ChatMessage = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Stack 
        direction="row" 
        spacing={2} 
        justifyContent={isUser ? 'flex-end' : 'flex-start'} 
        alignItems="flex-end" 
        sx={{ mb: 2 }}
      >
        {!isUser && (
          <Box textAlign="center">
            <Avatar sx={{ bgcolor: 'transparent' }}>
            <img 
              src={require('./Images/ADA.png')}
              alt="ADA" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', marginTop: '30px'}}
            />
            </Avatar>
            <Typography variant="caption" sx = {{mt :-0.5}}>ADA</Typography>
          </Box>
        )}
        <Box
          sx={{
            bgcolor: isUser ? '#e0e0e0' : '#fdd4c4',
            p: 2,
            borderRadius: 2,
            maxWidth: '70%',
          }}
        >
          <Typography variant="body1">{text}</Typography>
        </Box>
        {isUser && (
          <Box textAlign="center">
            <Avatar sx={{ bgcolor: 'transparent' }}>
              <img
                src = {require('./Images/user.png')}
                alt="User"
                style={{ width: '100%', height: '100%', objectFit: 'cover', marginTop: '30px'}}
              />
              </Avatar>
            <Typography variant="caption">User</Typography>
          </Box>
        )}
      </Stack>
    </motion.div>
  );
};

const ChatAnimation = () => {
  const [visibleMessages, setVisibleMessages] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setVisibleMessages((prev) => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 150); 
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {visibleMessages.map((msg, index) =>
        msg ? (
          <ChatMessage key={index} sender={msg.sender} text={msg.text} />
        ) : null
      )}
    </Box>
  );
};

export default ChatAnimation;