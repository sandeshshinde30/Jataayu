import React from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, Button, IconButton, Tooltip } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import helplineImage from '../../assets/helpline.jpg';

const Helpline = () => {
  const { translate } = useLanguage();

  const services = [
    {
      icon: <PhoneIcon />,
      title: translate('helpline.services.emergency.title'),
      description: translate('helpline.services.emergency.description'),
      action: translate('helpline.services.emergency.action'),
      link: 'tel:1800-11-0031',
      buttonColor: 'error'
    },
    {
      icon: <WhatsAppIcon />,
      title: translate('helpline.services.whatsapp.title'),
      description: translate('helpline.services.whatsapp.description'),
      action: translate('helpline.services.whatsapp.action'),
      link: 'https://wa.me/1800110031',
      buttonColor: 'success'
    },
    {
      icon: <EmailIcon />,
      title: translate('helpline.services.email.title'),
      description: translate('helpline.services.email.description'),
      action: translate('helpline.services.email.action'),
      link: 'mailto:help@nashamukti.in',
      buttonColor: 'primary'
    },
    {
      icon: <SupportAgentIcon />,
      title: translate('helpline.services.counseling.title'),
      description: translate('helpline.services.counseling.description'),
      action: translate('helpline.services.counseling.action'),
      link: '/services/counseling',
      buttonColor: 'secondary'
    }
  ];

  const emergencyContacts = [
    {
      name: translate('helpline.contactLabels.deaddiction'),
      number: "1800-11-0031"
    },
    {
      name: translate('helpline.contactLabels.national'),
      number: "1800-11-0031"
    },
    {
      name: translate('helpline.contactLabels.police'),
      number: "100"
    },
    {
      name: translate('helpline.contactLabels.ambulance'),
      number: "108"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ 
          mb: 4,
          fontWeight: 'bold',
          color: 'primary.main'
        }}
      >
        {translate('helpline.title')}
      </Typography>
      
      <Typography 
        variant="h6" 
        component="h2" 
        align="center" 
        gutterBottom
        sx={{ 
          mb: 3,
          color: 'text.secondary',
        }}
      >
        {translate('helpline.subtitle')}
      </Typography>
      
      <Typography 
        variant="body1" 
        align="center" 
        paragraph
        sx={{ 
          mb: 5,
          maxWidth: '800px',
          mx: 'auto'
        }}
      >
        {translate('helpline.description')}
      </Typography>

      <Grid container spacing={4}>
        {/* Helpline Image */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 2,
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <img 
              src={helplineImage} 
              alt="Helpline Information"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px'
              }}
            />
          </Paper>
        </Grid>

        {/* Emergency Contacts */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 4,
              borderRadius: 2,
              height: '100%',
              bgcolor: 'background.paper'
            }}
          >
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ 
                color: 'primary.main',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              {translate('helpline.emergencyContacts')}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {emergencyContacts.map((contact, index) => (
                <Box 
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                    '&:hover': {
                      bgcolor: 'action.selected'
                    }
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                    {contact.name}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 'bold'
                    }}
                  >
                    {contact.number}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Support Services Grid */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {services.map((service, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: `${service.buttonColor}.main`, mr: 2 }}>
                    {service.icon}
                  </Box>
                  <Typography variant="h6" component="h3">
                    {service.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary" paragraph>
                  {service.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color={service.buttonColor}
                    startIcon={service.icon}
                    href={service.link}
                    fullWidth
                  >
                    {service.action}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Service Hours and Languages */}
      <Paper sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccessTimeIcon sx={{ fontSize: 30, mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">
                {translate('helpline.hours.title')}
              </Typography>
            </Box>
            <Typography color="text.secondary">
              {translate('helpline.hours.description')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LanguageIcon sx={{ fontSize: 30, mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">
                {translate('helpline.languages.title')}
              </Typography>
            </Box>
            <Typography color="text.secondary">
              {translate('helpline.languages.description')}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Confidentiality Notice */}
      <Paper sx={{ p: 4, mt: 4, bgcolor: 'primary.light' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SecurityIcon sx={{ fontSize: 30, mr: 2, color: 'white' }} />
          <Typography variant="h6" sx={{ color: 'white' }}>
            {translate('helpline.confidentiality.title')}
          </Typography>
        </Box>
        <Typography sx={{ color: 'white' }}>
          {translate('helpline.confidentiality.text')}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Helpline; 