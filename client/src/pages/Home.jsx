import React from 'react';
import { Box, Container, Typography, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import HeroSlider from '../components/home/HeroSlider';

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
                image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80"
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
                image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80"
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
                image="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=80"
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