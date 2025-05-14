import React from 'react';
import { motion } from 'framer-motion';

const AnimatedDemo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Welcome to ECAI</h2>
    </motion.div>
  );
};

export default AnimatedDemo; 