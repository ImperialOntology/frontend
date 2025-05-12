import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Box, CircularProgress} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem";

const API_KEY = process.env.REACT_APP_API_KEY;

function Exploration() {
  const [dataSources, setDataSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/main/data_sources", {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY,
        "Accept": "application/json"
      }
    })    
      .then(response => {
        console.log("API Response Status:", response.status);
        return response.json();
      })
      .then(data => {
        console.log("Fetched Data Sources:", data);
        setDataSources(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data sources:", error);
        setLoading(false);
      });
  }, []);  

  const handleCardClick = (id, name) => {
    navigate(`/analysis/${id}`, { state: { dataSourceName: name, dataSourceId: id } });
  };

  return (
    <Container sx={{ marginTop: 6, maxWidth: '100%' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom sx={{ mb: 5 }}>
          Discover the ADA-X
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Explore how ADA-X transforms raw customer reviews into clear, structured insights. 
          <br /><br />
          Choose a dataset from the following options. 
          <br /><br />
          The first component is the review source, followed by the number of review for each category. 
        </Typography>
      </Box>

      <Box sx={{ mb: 5}} />
      
      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Loading data sources...
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
        {dataSources.length > 0 ? (
          dataSources.map((source) => (
            <Grid item key={source.id}>
              <CardItem 
                title={source.name.toLowerCase() === "disneyland"? "Disneyland 20k" : source.name} 
                platform={source.name}
                sx={{ backgroundColor: "#EDEDED",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                 }}
                onClick={() => handleCardClick(source.id, source.name)}>
                <Typography variant="h6" align="center">{source.name}</Typography> 
              </CardItem>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No data sources found.
          </Typography>
        )}
      </Grid>
    )}
  </Container>
);
}

export default Exploration;
