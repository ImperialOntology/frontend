import React from 'react';
import { motion } from 'framer-motion';

const WorkflowAnimation = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="workflow-container">
        <h3>Workflow Process</h3>
        {/* Add your workflow visualization here */}
      </div>
    </motion.div>
  );
};

export default WorkflowAnimation; 