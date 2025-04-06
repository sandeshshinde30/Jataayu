import React from 'react';
import { Box, Container, Typography, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import HeroSlider from '../components/home/HeroSlider';
import counselorImage from '../assets/counselor.jpg';
import supportImage from '../assets/supportgrp.jpg';
import rehabilitationImage from '../assets/rehab.jpg';

const Home = () => {
  const { translate, getPageTitle } = useLanguage();

  return (
    <Box>
      {/* Hero Section with Slider */}
      <HeroSlider />

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 700 }}
        >
          {getPageTitle('home.services.title')}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mb: 8 }}
        >
          {translate('home.services.subtitle')} {translate('common.in')} {translate('common.locations.sangli')}
        </Typography>
        <Grid container spacing={4}>
          {/* Counseling */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={counselorImage}
                alt="Counseling Services"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  {translate('home.services.counseling.title')}
                </Typography>
                <Typography>
                  {translate('home.services.counseling.description')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Support Groups */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={supportImage}
                alt="Support Groups"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  {translate('home.services.support.title')}
                </Typography>
                <Typography>
                  {translate('home.services.support.description')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Rehabilitation */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={rehabilitationImage}
                alt="Rehabilitation Programs"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  {translate('home.services.rehabilitation.title')}
                </Typography>
                <Typography>
                  {translate('home.services.rehabilitation.description')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 