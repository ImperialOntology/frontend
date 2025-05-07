import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
  TextField,
  Autocomplete,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import CustomTreeItem from "../components/CustomTreeItem";
import { MinusSquare, PlusSquare, CloseSquare } from "../components/Icons";
import ReactFlow, { Background, Controls } from 'reactflow';
import { BaseEdge, getBezierPath } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from "dagre";

const API_KEY = process.env.REACT_APP_API_KEY;

function ReviewAggregation() {
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const categoryName = location.state?.categoryName || "Unknown Category";
  const argumentativeAnalysisId = location.state?.argumentativeAnalysisId;
  const dataSourceId = location.state?.dataSourceId;
  const dataSourceName = location.state?.dataSourceName || "Unknown Source";
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [ontologyTree, setOntologyTree] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [prune, setPrune] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [selectedAspect, setSelectedAspect] = useState(null);

  // Fetch products based on category
  useEffect(() => {
    if (!categoryId) return;

    fetch(`/main/categories/${categoryId}/top_products`, {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY,
        "Accept": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching top products:", error))
      .finally(() => setLoadingProducts(false));;
  }, [categoryId]);

  // Fetch ontology tree based on product
  useEffect(() => {
    if (!product || !argumentativeAnalysisId) return;

    setLoading(true);

    fetch(`/main/result_tree/${product.id}?argumentative_analysis_id=${argumentativeAnalysisId}&prune=${prune}`, {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY,
        "Accept": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        setOntologyTree(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching ontology tree:", error);
        setLoading(false);
      });
  }, [product, argumentativeAnalysisId, prune]);

  // Communicator 
  const generateAnswer = (queryIndex, aspect) => {
    const aspectName = aspect.aspect;
    const polarityIsNegative = aspect.polarity === false;
  
    // Flip only features
    const support = polarityIsNegative
      ? aspect.strongest_attack_feature
      : aspect.strongest_support_feature;
  
    const attack = polarityIsNegative
      ? aspect.strongest_support_feature
      : aspect.strongest_attack_feature;
  
    // No flipping of query meaning anymore!
    switch (queryIndex) {
      case 0: {
        if (aspect.polarity === false) {
          // If overall aspect is negative, but user asks why it's good
          let result = `Although the ${aspectName} was poorly rated`;
          if (support) result += `, the ${support} was good`;
          return result + ".";
        } else {
          // Aspect is positive
          let result = `The ${aspectName} was highly rated`;
          if (support) result += ` because the ${support} was good`;
          if (attack) result += `, although the ${attack} was poor`;
          return result + ".";
        }
      }
      case 1: {
        let result = `The ${aspectName} was poorly rated`;
        if (attack) result += ` because the ${attack} was poor`;
        if (support) result += `, although the ${support} was good`;
        return result + ".";
      }
      case 2:
        return aspect.strongest_support_phrase
          ? `"${aspect.strongest_support_phrase}"`
          : `No positive user comments found for the ${aspectName}.`;
      case 3:
        return aspect.strongest_attack_phrase
          ? `"${aspect.strongest_attack_phrase}"`
          : `No negative user comments found for the ${aspectName}.`;
      default:
        return "";
    }
  };  

  // Build Tree
  // Helper function for the tree layout 
  function getLayoutedElements(nodes, edges, direction = 'TB') {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 180;
    const nodeHeight = 50;

    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    });

    return { nodes, edges };
  }

  // create the tree flow 
  const createReactFlowTree = (nodeName, nodeData, parent = null, depth = 0, nodes = [], edges = [], visited = new Set()) => {
    if (visited.has(nodeName)) return;
    visited.add(nodeName);

    const argument = ontologyTree?.arguments?.find(arg => arg.aspect === nodeName);
    const strength = argument?.strength;
    const polarity = argument?.polarity;
    const label = `${polarity === false ? '❌' : '✅'}${strength ? ` ${strength.toFixed(4)}` : ''} ${nodeName}`;

    const id = `${nodeName}_${depth}`;
    nodes.push({ id, data: { label }, position: { x: 0, y: 0 } });

    if (parent) {
      edges.push({
        id: `${parent}->${id}`,
        source: parent,
        target: id,
        data: { color: polarity === false ? 'red' : 'green' },
        type: 'floating-dash', 
      });
    }

    if (nodeData && typeof nodeData === 'object') {
      for (const [childName, childData] of Object.entries(nodeData)) {
        createReactFlowTree(childName, childData, id, depth + 1, nodes, edges, visited);
      }
    }

    return getLayoutedElements(nodes, edges);
  };
  function FloatingDashEdge({ id, sourceX, sourceY, targetX, targetY, data }) {
    const [edgePath] = getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
  
    const strokeColor = data?.color || '#999';
  
    return (
      <>
        <BaseEdge
          id={id}
          path={edgePath}
          style={{
            stroke: strokeColor,
            strokeWidth: 2,
            strokeDasharray: '6 6',
            animation: 'dash-animation 1s linear infinite',
          }}
        />
        <style>
                    {`
            @keyframes dash-animation {
                from {
                  stroke-dashoffset: -12;
                }
                to {
                  stroke-dashoffset: 0;
                }
            }
          `}
        </style>
      </>
    );
  }
  

  const renderTree = (nodeName, nodeData) => {
    const argument = ontologyTree?.arguments?.find(arg => arg.aspect === nodeName);
    const strength = argument?.strength;
    const originalPolarity = argument?.polarity;
  
    const polarityIcon = originalPolarity === false ? "❌" : "✅";
    const strengthText = strength !== undefined ? ` ${strength.toFixed(4)}` : "";
  
    const label = `${polarityIcon}${strengthText} ${nodeName}`;
  
    return {
      id: nodeName,
      label,
      children: nodeData && typeof nodeData === "object"
        ? Object.entries(nodeData).map(([childName, childData]) =>
            renderTree(childName, childData)
          )
        : [],
    };
  };  
  
  return (
    <Container sx={{ marginTop: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Review Aggregation - {categoryName}
        </Typography>
        <Button
          variant="outlined"
          onClick={() =>
            navigate(`/analysis/${dataSourceId}`, {
              state: { dataSourceName },
            })
          }
        >
          Back to Analysis
        </Button>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Please select a product to investigate the generated ontology tree.
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={products}
            getOptionLabel={(option) => option.name || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={product}
            onChange={(event, newValue) => {
              setProduct(newValue);
              setSelectedQuery(null);
              setSelectedAspect(null);
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Select Product" 
                variant="outlined"
                helperText={loadingProducts ? "Loading products..." : ""}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Switch
                checked={prune}
                onChange={() => setPrune(!prune)}
                name="pruneToggle"
                color="primary"
              />
            }
            label="Prune Tree"
          />
        </Grid>
      </Grid>
          
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Product-Level Statistics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Actual Average Rating
              </Typography>
              <Typography variant="h6">
                {ontologyTree?.actual_avg_product_rating !== undefined
                  ? ontologyTree.actual_avg_product_rating.toFixed(4)
                  : "—"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Ontology Product Score
              </Typography>
              <Typography variant="h6">
                {ontologyTree?.ontology_product_score !== undefined
                  ? ontologyTree.ontology_product_score.toFixed(4)
                  : "—"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {/* Left: Ontology Tree */}
        <Grid item xs={12} md={12}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Ontology Tree
          </Typography>
          <Box sx={{ padding: 2 }}>
            {loading ? (
              <CircularProgress />
            ) : ontologyTree ? (
              (() => {
                const rootKey = Object.keys(ontologyTree.tree)[0];
                return (
                  <RichTreeView
                    defaultExpandedItems={[rootKey]}
                    slots={{
                      expandIcon: PlusSquare,
                      collapseIcon: MinusSquare,
                      endIcon: CloseSquare,
                      item: CustomTreeItem,
                    }}
                    items={[renderTree(rootKey, ontologyTree.tree[rootKey])]}
                  />
                );
              })()
            ) : (
              <Typography variant="body2" color="text.secondary">
                Please select a product to view its ontology tree.
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Ontology Tree
          </Typography>
          <Box sx={{ padding: 2 }}>
            {loading ? (
              <CircularProgress />
            ) : ontologyTree ? (
              (() => {
                const rootKey = Object.keys(ontologyTree.tree)[0];
                const { nodes, edges } = createReactFlowTree(rootKey, ontologyTree.tree[rootKey]);
                const edgeTypes = {
                  'floating-dash': FloatingDashEdge,
                };
                return (
                  <div style={{ width: '100%', height: '600px' }}>
                    <ReactFlow nodes={nodes} edges={edges} edgeTypes={edgeTypes} fitView>
                      <Background />
                      <Controls />
                    </ReactFlow>
                  </div>
                );
              })()
            ) : (
              <Typography variant="body2" color="text.secondary">
                Please select a product to view its ontology tree.
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Right: Investigate Reviews */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Investigate Reviews
          </Typography>

          <Box sx={{ mb: 2 }}>
            {[
              {
                text: "Why was the {aspect} good?",
                queryIndex: 0,
              },
              {
                text: "Why was the {aspect} bad?",
                queryIndex: 1,
              },
              {
                text: "What were some positive user comments on the {aspect}?",
                queryIndex: 2,
              },
              {
                text: "What were some negative user comments on the {aspect}?",
                queryIndex: 3,
              },
            ]
              .filter((item) => {
                if (!selectedAspect) return true;

                const polarityIsNegative = selectedAspect.polarity === false;

                const support = polarityIsNegative
                  ? selectedAspect.strongest_attack_feature
                  : selectedAspect.strongest_support_feature;

                const attack = polarityIsNegative
                  ? selectedAspect.strongest_support_feature
                  : selectedAspect.strongest_attack_feature;

                if (item.queryIndex === 0) return support != null;
                if (item.queryIndex === 1) return attack != null;
                return true;
              })
              .map((item) => (
                <Box
                  key={item.queryIndex}
                  sx={{
                    cursor: "pointer",
                    p: 1.5,
                    borderRadius: 2,
                    border: "1px solid lightgray",
                    mb: 1,
                    backgroundColor: selectedQuery === item.queryIndex ? "#f0f4ff" : "white",
                  }}
                  onClick={() => setSelectedQuery(item.queryIndex)}
                >
                  {item.text.replace("{aspect}", selectedAspect?.aspect || "___")}
                </Box>
              ))}
          </Box>

          {selectedQuery !== null && (
            <>
              {/* Aspect Dropdown */}
              <Autocomplete
                options={ontologyTree.arguments}
                getOptionLabel={(option) => option.aspect}
                value={selectedAspect}
                onChange={(e, newValue) => setSelectedAspect(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Aspect" variant="outlined" />
                )}
              />

              {/* Display result */}
              {selectedAspect && (
                <Box sx={{ mt: 3, background: "#f9f9f9", p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Response:
                  </Typography>
                  <Typography variant="body1">
                    {generateAnswer(selectedQuery, selectedAspect)}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ReviewAggregation;
