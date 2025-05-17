import "./App.css";
import React from "react";
import { AppBar, Toolbar, Typography, Button, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "././pages/Home"
import Exploration from "././pages/Exploration"
import WorkFlowPage from "./pages/WorkFlow";
import AnalysisPage from "./pages/Analysis";
import ReviewAggregation from "./pages/ReviewAggregation";
import Contact from "./pages/Contact";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";


function NavigationBar() {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="static" 
      sx={{ backgroundColor: '#f4f8ff' }}
      elevation={0}
      >
      <Toolbar sx={{ maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        <Typography
            variant="h5"
            sx={{
              mr: 2,
              fontWeight: 'bold',
              color: '#050c43',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              }
            }}
            onClick={() => navigate("/")}
          >
          ADA-X
        </Typography>

        <div style={{ 
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '32px'
        }}>
          <Button 
            color="inherit" 
            onClick={() => navigate("/")}
            sx={{ 
              color: '#050c43', 
              fontWeight: '500',
              textTransform: 'none',
              fontSize: '16px'
            }}
          >
            Home
          </Button>

          <Button 
            color="inherit" 
            onClick={() => navigate("/workflow")}
            sx={{ 
              color: '#050c43', 
              fontWeight: '500',
              textTransform: 'none',
              fontSize: '16px'
            }}
          >
            Workflow
          </Button>

          <Button 
            color="inherit" 
            onClick={() => navigate("/exploration")}
            sx={{ 
              color: '#050c43', 
              fontWeight: '500',
              textTransform: 'none',
              fontSize: '16px'
            }}
          >
            Exploration
          </Button>

          <Button 
            color="inherit" 
            onClick={() => navigate("/contact")}
            sx={{ 
              color: '#ff3b00', 
              fontWeight: '500',
              textTransform: 'none',
              fontSize: '16px'
            }}
          >
            Contact
          </Button>
        </div>

      </Toolbar>
    </AppBar>
  );
}


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ backgroundColor: '#f4f8ff', minHeight: '100vh' }}>
        <Router>
          <NavigationBar />
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workflow" element={<WorkFlowPage />} />
              <Route path="/analysis/:dataSourceId" element={<AnalysisPage />} />
              <Route path="/exploration" element={<Exploration />} />
              <Route path="/review-aggregation" element={<ReviewAggregation />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
