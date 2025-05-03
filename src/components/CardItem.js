import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardItem = ({ title, platform, onClick, sx={} }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => onClick ? onClick(): navigate(`/review/${platform}`)}
      sx={{
        width: 300,
        margin: 4,
        cursor: 'pointer',
        transition: 'transform 0.2s, background-color 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          backgroundColor: 'action.hover',
        },
        ...sx
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardItem;