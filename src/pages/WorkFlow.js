import React, { useState, useEffect } from "react";
import { Container, Grid, Button , Typography, Box, CircularProgress} from "@mui/material";
import AnimatedDemo from '../components/Animation';
import MyComponent from "../components/WorkflowAnimation";

const WorkFlowPage = () => {
  const [activePopup, setActivePopup] = useState({ id: null, source: null });

  const Bert_buttons = [
    {
      id: 1,
      label: "1. Entites Extraction",
      content: "BERT uses a transformer architecture with bidirectional encoding to understand context from both directions in text."
    },
    {
      id: 2,
      label: "2. Aspect Extraction",
      content: "BERT is pre-trained on a large corpus of text using masked language modeling and next sentence prediction tasks."
    },
    {
      id: 3,
      label: "3. Synonym Extraction",
      content: "After pre-training, BERT can be fine-tuned on specific tasks like ontology extraction with relatively small amounts of labeled data."
    },
    {
      id: 4,
      label: "4. Relation Extraction",
      content: "BERT generates contextual embeddings where the same word can have different representations based on its surrounding context."
    },
    {
      id: 5,
      label: "5. Ontology Extraction",
      content: "BERT can be used for ontology extraction by identifying concepts, relationships, and hierarchical structures in text data."
    }
  ];

  const LLM_buttons = [
    {
      id: 6,
      label: "1. Aspect Extraction",
      content: "BERT uses a transformer architecture with bidirectional encoding to understand context from both directions in text."
    },
    {
      id: 7,
      label: "2. Synonym Extraction",
      content: "BERT is pre-trained on a large corpus of text using masked language modeling and next sentence prediction tasks."
    },
    {
      id: 8,
      label: "3. Concept Extraction",
      content: "After pre-training, BERT can be fine-tuned on specific tasks like ontology extraction with relatively small amounts of labeled data."
    },
    {
      id: 9,
      label: "4. Relation Extraction",
      content: "BERT generates contextual embeddings where the same word can have different representations based on its surrounding context."
    },
    {
      id:0,
      label: "5. Ontology Extraction",
      content: "BERT can be used for ontology extraction by identifying concepts, relationships, and hierarchical structures in text data."
    }
  ];

  const togglePopup = (id, source) => {
    if (activePopup.id === id && activePopup.source === source) {
      setActivePopup({ id: null, source: null }); // Hide
    } else {
      setActivePopup({ id, source }); // Show with source
    }
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container sx={{ marginTop: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 5 }}>
          How does ADA-x work?
        </Typography>
        
        {/* Image container with limited size */}
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            mb: 4
          }}
        >
            <img 
              src={require("../components/Images/Framework.png")}
              alt="ADA-x Workflow Diagram" 
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            ADA-x workflow visualization
          </Typography>
        </Box>

        <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
          1. Gather Customer reivews
        </Typography>
        <Typography variant="h5" align="left" sx={{ lineHeight: 1.6 }}>
          Having a good amount of customer reivew is crucial for the following ontology construction
          and review aggregation stage. This provide a good insight to Large Language Model(LLM) about the 
          domain specific knowledge and ensure a good quality ontology that could have a good representation
          of the product. 
          <br /><br />
          In our demonstration, we are using dataset from the following websites:
          <div className="p-4">
            <div style={{ 
              marginTop: '10px',
              marginBottom: '10px' 
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ 
                  display: 'inline-block', 
                  width: '7px', 
                  height: '7px', 
                  borderRadius: '50%', 
                  backgroundColor: 'black',
                  marginRight: '15px',
                  marginLeft: '15px'
                }}></span>
                <img 
                  src={require("../components/Images/hf-logo.png")}
                  alt="Hugging Face logo" 
                  style={{ 
                    width: '50px',
                    height: '50px',
                    marginRight: '8px',
                    objectFit: 'contain'
                  }}
                />
                <a 
                  href="https://huggingface.co/datasets/McAuley-Lab/Amazon-Reviews-2023" 
                  style={{
                    color: '#0000EE',
                    textDecoration: 'none',
                    fontSize: '16px'
                  }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                >
                  Amazon Reviews
                </a>
              </div>
                
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ 
                  display: 'inline-block', 
                  width: '7px', 
                  height: '7px', 
                  borderRadius: '50%', 
                  backgroundColor: 'black',
                  marginRight: '15px',
                  marginLeft: '15px'
                }}></span>
                <img 
                  src={require("../components/Images/kaggle-logo.png")}
                  alt="Kaggle logo" 
                  style={{ 
                    width: '50px',
                    height: '50px',
                    marginRight: '8px',
                    objectFit: 'contain'
                  }}
                />
                <a 
                  href="https://www.kaggle.com/datasets/arushchillar/disneyland-reviews" 
                  style={{
                    color: '#0000EE',
                    textDecoration: 'none',
                    fontSize: '16px'
                  }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                >
                  Disneyland Reviews
                </a>
              </div>
            </div>
          </div>
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
          2. Ontology Extraction
        </Typography>

        <Typography variant="h5" align="left" sx={{ lineHeight: 1.6 }}>
        By definition, ontology means conceptualization that define entities and their relationships 
        within a particular domain of knowledge. To help LLM to better understading this concept and 
        perform ontology extraction task, different method are applied to different Language Models.
        We deployed two different methdos in the ADA-X system, the BERT-Based method and LLM-based method. 
        <br /><br />

        We are first introducing the BERT-based ontology extraction method. This method required two 
        mannual annotated dataset to train two separate BERT model on asepct extraction and relation 
        extraction tasks. 
        </Typography>
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '1000px',
            margin: '0 auto',
            mb: 4,
            position: 'relative'
          }}
        >
          <Box sx={{ position: 'relative', width: '100%' }}>
            <img 
              src={require("../components/Images/BERT-Ontolgoy.png")}
              alt="BERT-based Ontology Extraction" 
              style={{ 
                width: '80%',
                height: '100%',
                objectFit: 'contain'
              }}
            />

            {/* Bert_buttons container - positioned absolutely on the right side */}
            <Box
              sx={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {Bert_buttons.map(button => (
                <Button
                  key={button.id}
                  variant={activePopup === button.id ? "contained" : "outlined"}
                  color="primary"
                  size="small"
                  onClick={() => togglePopup(button.id, "bert")}
                  sx={{ minWidth: '120px' }}
                >
                  {button.label}
                </Button>
              ))}
            </Box>
            
            {/* Popup container - only visible when a button is clicked */}
            {activePopup.source === "bert" && (
              <Box
                sx={{
                  position: 'absolute',
                  right: '150px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  p: 2,
                  borderRadius: 1,
                  boxShadow: 3,
                  maxWidth: '250px',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: '-10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderTop: '10px solid transparent',
                    borderLeft: '10px solid rgba(255, 255, 255, 0.9)',
                    borderBottom: '10px solid transparent'
                  }
                }}
                onClick={() => togglePopup(activePopup)}
              >
                <Typography variant="body2" color="text.primary">
                {Bert_buttons.find(button => button.id === activePopup.id)?.content}
                </Typography>
              </Box>
            )}
          </Box>
      
      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1 }}>
        BERT-based Ontology Extraction
      </Typography>
    </Box>
      <Typography variant="h5" align="left" sx={{ lineHeight: 1.6 }}>
        The graph below shows how the LLM-based ontology extraction method works. The Language model we 
        used in this taks is mainly Mistral 7B. We have prompted the language model to perform aspect extraction, concept extraction
        and relation extraction tasks. The synonym extraction is performed using Equal distance clustering(ENC) algorithm. 
      </Typography>
      <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '1000px',
            margin: '0 auto',
            mb: 4,
            position: 'relative'
          }}
        >
        <Box sx={{ position: 'relative', width: '100%' }}>
          <img 
            src={require("../components/Images/LLM-Ontolgoy.png")}
            alt="BERT-based Ontology Extraction" 
            style={{ 
              width: '80%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
          {/* LLM_buttons container - positioned absolutely on the right side */}
          <Box
            sx={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {LLM_buttons.map(button => (
              <Button
                key={button.id}
                variant={activePopup === button.id ? "contained" : "outlined"}
                color="primary"
                size="small"
                onClick={() => togglePopup(button.id, "llm")}
                sx={{ minWidth: '120px' }}
              >
                {button.label}
              </Button>
            ))}
          </Box>
            
          {/* Popup container - only visible when a button is clicked */}
          {activePopup.source === "llm" && (
            <Box
              sx={{
                position: 'absolute',
                right: '150px',
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                p: 2,
                borderRadius: 1,
                boxShadow: 3,
                maxWidth: '250px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: '-10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderTop: '10px solid transparent',
                  borderLeft: '10px solid rgba(255, 255, 255, 0.9)',
                  borderBottom: '10px solid transparent'
                }
              }}
              onClick={() => togglePopup(activePopup)}
            >
              <Typography variant="body2" color="text.primary">
                {LLM_buttons.find(button => button.id === activePopup.id)?.content}
              </Typography>
            </Box>
          )}
        </Box>
      
      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1 }}>
        LLM-based Ontology Extraction
      </Typography>
    </Box>

      </Container>
    </Box>
  );
};

export default WorkFlowPage;