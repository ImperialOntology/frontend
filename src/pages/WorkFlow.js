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
      content: "In the entity extraction phase, all words are tokenized, frequently co-occurring tokens are merged into single candidate terms. A part-of-speech tagger is then used to identify the most frequently occurring entities among these candidates."
    },
    {
      id: 2,
      label: "2. Aspect Extraction",
      content: "In this step, a BERT-model pre-trained on the manually annotated dataset is employed. Sentences with exactly one entity are passed into the model, which then classifies the entity as a product aspect, a feature aspect, or neither."
    },
    {
      id: 3,
      label: "3. Synonym Extraction",
      content: "This stage involves applying the Equidistant Nodes Clustering (ENC) algorithm to cluster similar aspects. In this algorithm, a domain-specific Word2Vec model is trained to compute the similarity between aspects, and those with a similarity score above a certain threshold are clustered together as synonyms"
    },
    {
      id: 4,
      label: "4. Relation Extraction",
      content: "In this stage, a BERT classifier trained on the relation extraction dataset is applied. Sentences containing two synsets are passed into the model, which determines the type of relationship between aspects"
    },
    {
      id: 5,
      label: "5. Ontology Extraction",
      content: "The ontology is eventyally constructed based on the relationship matrix."
    }
  ];

  const LLM_buttons = [
    {
      id: 6,
      label: "1. Aspect Extraction",
      content: "In the first stage a prompt is provided to the LLM, prompting it to generate aspects along with their sentiment polarity."
    },
    {
      id: 7,
      label: "2. Synonym Extraction",
      content: "Similar to the BERT-based model, the ENC method is employed to cluster aspects into synsets. "
    },
    {
      id: 8,
      label: "3. Concept Extraction",
      content: "The most commonly occurring term within each group is selected as its representative These representative terms are then passed to the LLM to determine whether each term should be considered a concept for its specific domain."
    },
    {
      id: 9,
      label: "4. Relation Extraction",
      content: "Sentences containing exactly two aspects from different synset groups are selected. These sentences, along with their corresponding aspects, are provided to the LLM. The model’s task is to determine whether a part-whole relationship exists between the two aspects based on the surrounding context.."
    },
    {
      id:0,
      label: "5. Ontology Extraction",
      content: "The ontology is eventyally constructed based on the relationship matrix."
    }
  ];

  const Reveiw_button = [
    {
      id: 11,
      label: "1. Sentiment Analysis",
      content: "SA is performed using a BERT model trained on the SemEval2014 Task 4 dataset. Each sentence containing an aspect is passed through the model, which outputs the sentiment associated with that aspect."
    },
    {
      id: 12,
      label: "2. QBAF base score",
      content: "Based on the number of positive and negatives votes, reviews will be aggregated together and a base score will be provided for each asepect.  "
    },
    {
      id: 13,
      label: "3. Argument Strength",
      content: "Finally, the argument strength will be calculated based on the base score of itself and its constructed features."
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
          How does ADA-X work?
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
          1. Gather Customer reviews
        </Typography>
        <Typography variant="h5" align="left" sx={{ lineHeight: 1.6 }}>
        Similar to any review aggregation method, customer reviews are the most crucial component of the ADA-X system.
        Having a large number of customer reviews helps the language model used in ADA better understand different 
        aspects of a product, generate a high-quality ontology, and provide structured explanations of customer reviews.

        <br /><br />
        In our demonstration, we use datasets from the following websites:
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
        By definition, an ontology is a conceptualization that defines entities and their relationships within 
        a particular domain of knowledge. The purpose of constructing an ontology is to break down the product 
        into different aspects and analyze each aspect in a later stage. This process is often time-consuming and 
        requires professional, domain-specific knowledge. Therefore, we embedded two automatic ontology extraction 
        methods in the ADA-X system.

        <br /><br />
        The first method is a BERT-based ontology extraction technique. This method requires two manually annotated 
        datasets to train two separate BERT models to perform aspect extraction and relation extraction tasks.
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
      Although the BERT-based method automates the majority of the ontology extraction process, it still requires manual data annotation. 
      To improve upon this, an LLM-based ontology extraction method has recently emerged. The Mistral-7B model has been used in this approach, 
      converting ontology extraction into a fully automated process.
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
            alt="LLM-based Ontology Extraction" 
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
      <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
          3. Review Aggregation
      </Typography>

      <Typography variant="h5" align="left" sx={{ lineHeight: 1.6 }}>
      Based on the results obtained from the ontology extraction stage, the ADA framework then utilizes 
      the ontology tree and customer reviews to generate dialectical strength and dialogical explanations. 
      This process is divided into two stages: mining votes using Sentiment Analysis (SA), and formulating 
      the Quantitative Bipolar Argumentation Framework (QBAF).
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
            src={require("../components/Images/Review_aggregation.png")}
            alt="Review Aggregation" 
            style={{ 
              width: '80%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
          {/* Review Aggregation container - positioned absolutely on the right side */}
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
            {Reveiw_button.map(button => (
              <Button
                key={button.id}
                variant={activePopup === button.id ? "contained" : "outlined"}
                color="primary"
                size="small"
                onClick={() => togglePopup(button.id, "Review")}
                sx={{ minWidth: '120px' }}
              >
                {button.label}
              </Button>
            ))}
          </Box>
            
          {/* Popup container - only visible when a button is clicked */}
          {activePopup.source === "Review" && (
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
                {Reveiw_button.find(button => button.id === activePopup.id)?.content}
              </Typography>
            </Box>
          )}
        </Box>
      
      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1 }}>
        Review Aggregation
      </Typography>
    </Box>
    </Box>
  );
};

export default WorkFlowPage;