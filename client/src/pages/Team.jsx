import React from 'react';
import { Container, Typography, Box, Paper, Avatar, Grid, Divider } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

const Team = () => {
  const { translate } = useLanguage();
  
  const teamMembers = [
    {
      name: 'Laxmikant Mahindrakar',
      role: 'Developer',
      avatar: '/avatar-placeholder.jpg'
    },
    {
      name: 'Shreyash Deotale',
      role: 'Developer',
      avatar: '/avatar-placeholder.jpg'
    },
    {
      name: 'Shreyash Pawar',
      role: 'Developer',
      avatar: '/avatar-placeholder.jpg'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2
        }}
      >
        Our Team
      </Typography>
      
      <Typography 
        variant="h6" 
        align="center" 
        color="text.secondary"
        sx={{ mb: 6 }}
      >
        Students from Walchand College of Engineering, Sangli
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                }
              }}
            >
              <Avatar
                alt={member.name}
                src={member.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  backgroundColor: 'primary.main',
                  fontSize: '3rem'
                }}
              >
                {member.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" component="h2" gutterBottom>
                {member.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {member.role}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h6" gutterBottom>
          About the Project
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          This application was developed as part of a project at Walchand College of Engineering, Sangli.
          The team worked on creating a comprehensive platform for addiction awareness and rehabilitation support.
        </Typography>
      </Box>
    </Container>
  );
};

export default Team; 