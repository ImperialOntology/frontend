import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

function AnalysisPage() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dataSourceId = params.dataSourceId;
  const dataSourceName = location.state?.dataSourceName || "Unknown Source";

  const [categories, setCategories] = useState([]);
  const [analysisMethods, setAnalysisMethods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loadingMethods, setLoadingMethods] = useState(false);

  // Fetch categories when the page loads
  useEffect(() => {
    if (!dataSourceId) return;

    fetch(`${API_URL}/main/categories/${dataSourceId}`, {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY,
        "Accept": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, [dataSourceId]);

  // Fetch analysis methods when a category is selected
  useEffect(() => {
    if (!selectedCategory) return;

    setLoadingMethods(true);

    fetch(`${API_URL}/main/argumentative_analysis/${selectedCategory.id}`, {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY,
        "Accept": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAnalysisMethods(data);
        setLoadingMethods(false);
      })
      .catch((error) => {
        console.error("Error fetching analysis methods:", error);
        setLoadingMethods(false);
      });
  }, [selectedCategory]);

  const handleNext = () => {
    if (selectedCategory && selectedMethod) {
      navigate("/review-aggregation", {
        state: {
          categoryId: selectedCategory.id,
          argumentativeAnalysisId: selectedMethod.id,
          dataSourceName: dataSourceName,
          dataSourceId: dataSourceId,
          categoryName: selectedCategory.label
        },
      });
    }
  };

  return (
    <Container sx={{ marginTop: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
        Analysis Configuration - {dataSourceName}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Please select a category and the argumentative analysis method to view the summary statistics. It may take up to a minute to show.
      </Typography>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={categories.map((c) => ({ label: c.name, id: c.id }))}
            getOptionLabel={(option) => option.label}
            value={selectedCategory}
            onChange={(event, newValue) => {
              setSelectedCategory(newValue);
              setSelectedMethod(null); // reset method when category changes
              setAnalysisMethods([]);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Product Category" variant="outlined" />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            options={analysisMethods.map((m) => ({
              label: m.name,
              id: m.id,
              description: m.description,
              top100_freq_aspect_llm_score_avg: m.top100_freq_aspect_llm_score_avg,
              ontology_relations_llm_score_avg: m.ontology_relations_llm_score_avg,
              top20_pop_products_rating_mae: m.top20_pop_products_rating_mae,
              top20_pop_products_rating_rmse: m.top20_pop_products_rating_rmse,
            }))}
            getOptionLabel={(option) => option.label}
            value={selectedMethod}
            onChange={(event, newValue) => setSelectedMethod(newValue)}
            disabled={!selectedCategory || loadingMethods}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Analysis Method"
                variant="outlined"
                helperText={loadingMethods ? "Loading methods..." : ""}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Argumentative Analysis Method Description:
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedMethod?.description
            ? selectedMethod.description
            : "Please select an argumentative analysis method to view its description."}
        </Typography>
      </Box>

      {/* Stats Table */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Statistics Overview Table
        </Typography>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            p: 2,
            backgroundColor: "#fafafa"
          }}
        >
          {[
            { label: "Top 100 Most Frequent Aspect LLM Average Score", key: "top100_freq_aspect_llm_score_avg" },
            { label: "Ontology Relations LLM Average Score", key: "ontology_relations_llm_score_avg" },
            { label: "Top 20 Most Popular Products Rating MAE", key: "top20_pop_products_rating_mae" },
            { label: "Top 20 Most Popular Products Rating RMSE", key: "top20_pop_products_rating_rmse" }
          ].map((item) => (
            <Box key={item.key} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid #eee" }}>
              <Typography variant="body1">{item.label}</Typography>
              <Typography variant="body1" fontWeight="bold">
                {selectedMethod?.[item.key] !== undefined
                  ? selectedMethod[item.key].toFixed(4)
                  : "—"}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedCategory || !selectedMethod}
          onClick={handleNext}
        >
          Check Ontology
        </Button>
      </Box>
    </Container>
  );
}

export default AnalysisPage;
