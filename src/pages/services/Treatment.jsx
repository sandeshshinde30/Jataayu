import { Box, Container, Typography, Paper, Grid, Card, CardContent, Button, Divider } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Treatment = () => {
  const { translate } = useLanguage();

  const services = [
    {
      icon: <MedicalServicesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('treatment.medical.title'),
      description: translate('treatment.medical.description'),
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('treatment.counseling.title'),
      description: translate('treatment.counseling.description'),
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('treatment.group.title'),
      description: translate('treatment.group.description'),
    },
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('treatment.support.title'),
      description: translate('treatment.support.description'),
    },
  ];

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 2, 
            bgcolor: 'background.paper',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'relative', mb: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                position: 'relative',
                zIndex: 1
              }}
            >
              {translate('treatment.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                maxWidth: 'md',
                mb: 4,
                position: 'relative',
                zIndex: 1
              }}
            >
              {translate('treatment.subtitle')}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom fontWeight={600} color="primary.dark">
                      {service.title}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {service.description}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      sx={{ 
                        mt: 2,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white'
                        }
                      }}
                    >
                      {translate('treatment.learnMore')}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 6 }} />

          <Box sx={{ textAlign: 'center', maxWidth: 'md', mx: 'auto' }}>
            <Typography variant="h5" gutterBottom color="primary.dark" fontWeight={600}>
              {translate('treatment.needHelp')}
            </Typography>
            <Typography paragraph color="text.secondary">
              {translate('treatment.helpText')}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              {translate('treatment.contactUs')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Treatment; 