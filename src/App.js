import "./App.css";
import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AnalysisPage from "./pages/Analysis";
import ReviewAggregation from "./pages/ReviewAggregation";
import HomeIcon from '@mui/icons-material/Home';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";


function NavigationBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }} onClick={() => navigate("/")}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Imperial MSc AI - Software Engineering Group Project
        </Typography>
      </Toolbar>
    </AppBar>
  );
}


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis/:dataSourceId" element={<AnalysisPage />} />
          <Route path="/review-aggregation" element={<ReviewAggregation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
