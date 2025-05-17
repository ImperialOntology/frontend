import React from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Container,
  Divider,
  Link,
  Button
} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Team member data - replace with your actual team data
const teamMembers = [
  {
    id: 1,
    name: "Lingjun Gao",
    title: "Imperial MSc Artificial Intelligence",
    email: "lg524@ic.ac.uk",
    linkedin: "www.linkedin.com/in/lingjun-gao-086730224",
    photo: require("../components/Images/LingjunGao.jpg")
  },
  {
    id: 2,
    name: "Hafizh Muyassar",
    title: "Imperial MSc Artificial Intelligence",
    email: "john.davis@ada-x.com",
    linkedin: "linkedin.com/in/johndavis",
    photo: "/api/placeholder/300/300" 
  },
  {
    id: 3,
    name: "Yeva Hunanyan",
    title: "Imperial MSc Artificial Intelligence",
    email: "sarah.johnson@ada-x.com",
    linkedin: "linkedin.com/in/sarahjohnson",
    photo: "/api/placeholder/300/300"
  },
  {
    id: 4,
    name: "Shane Pongpanich",
    title: "Imperial MSc Artificial Intelligence",
    email: "michael.chang@ada-x.com",
    linkedin: "linkedin.com/in/michaelchang",
    photo: require("../components/Images/Shane.jpg")
  },
  {
    id: 5,
    name: "Antonio Rago",
    title: "UX Designer",
    email: "emily.rodriguez@ada-x.com",
    photo: "/api/placeholder/300/300" 
  },
  {
    id: 6,
    name: "Francesca Toni",
    title: "Product Manager",
    email: "david.kim@ada-x.com",
    photo: "/api/placeholder/300/300" 
  }
];

const Contact = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom color="#050c43" fontWeight="bold">
          Our Team
        </Typography>
        <Divider sx={{ mt: 4, width: '50%', mx: 'auto' }} />
      </Box>

      <Grid container spacing={4}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                "&:hover": {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={member.photo}
                alt={member.name}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="h2" fontWeight="bold" color="#050c43">
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {member.title}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ color: '#050c43', mr: 1 }} />
                  <Link href={`mailto:${member.email}`} color="inherit" underline="hover">
                    {member.email}
                  </Link>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinkedInIcon sx={{ color: '#050c43', mr: 1 }} />
                  <Link 
                    href={`https://${member.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    color="inherit"
                    underline="hover"
                  >
                    LinkedIn Profile
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
};

export default Contact;