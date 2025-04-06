import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EmergencyServices = () => {
  const { translate } = useLanguage();

  const services = [
    {
      icon: <WarningAmberIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      title: translate('emergencyServices.services.emergency.title'),
      description: translate('emergencyServices.services.emergency.description'),
      category: translate('emergencyServices.services.emergency.category'),
      features: [
        translate('emergencyServices.services.emergency.features.1'),
        translate('emergencyServices.services.emergency.features.2'),
        translate('emergencyServices.services.emergency.features.3')
      ]
    },
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      title: translate('emergencyServices.services.medical.title'),
      description: translate('emergencyServices.services.medical.description'),
      category: translate('emergencyServices.services.medical.category'),
      features: [
        translate('emergencyServices.services.medical.features.1'),
        translate('emergencyServices.services.medical.features.2'),
        translate('emergencyServices.services.medical.features.3')
      ]
    },
    {
      icon: <PhoneInTalkIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      title: translate('emergencyServices.services.helpline.title'),
      description: translate('emergencyServices.services.helpline.description'),
      category: translate('emergencyServices.services.helpline.category'),
      features: [
        translate('emergencyServices.services.helpline.features.1'),
        translate('emergencyServices.services.helpline.features.2'),
        translate('emergencyServices.services.helpline.features.3')
      ]
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      title: translate('emergencyServices.services.crisis.title'),
      description: translate('emergencyServices.services.crisis.description'),
      category: translate('emergencyServices.services.crisis.category'),
      features: [
        translate('emergencyServices.services.crisis.features.1'),
        translate('emergencyServices.services.crisis.features.2'),
        translate('emergencyServices.services.crisis.features.3')
      ]
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      title: translate('emergencyServices.services.transport.title'),
      description: translate('emergencyServices.services.transport.description'),
      category: translate('emergencyServices.services.transport.category'),
      features: [
        translate('emergencyServices.services.transport.features.1'),
        translate('emergencyServices.services.transport.features.2'),
        translate('emergencyServices.services.transport.features.3')
      ]
    }
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
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: 'error.main',
                mb: 2
              }}
            >
              {translate('emergencyServices.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 'md', mx: 'auto' }}
            >
              {translate('emergencyServices.subtitle')}
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
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        '& svg': {
                          transition: 'transform 0.3s ease',
                        },
                        '&:hover svg': {
                          transform: 'scale(1.1)',
                        }
                      }}
                    >
                      {service.icon}
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        sx={{ 
                          ml: 2,
                          fontWeight: 600,
                          color: 'error.dark'
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                    <Chip 
                      label={service.category}
                      color="error"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        mb: 2
                      }}
                    >
                      {service.description}
                    </Typography>
                    <List dense>
                      {service.features.map((feature, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <CheckCircleIcon color="error" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        mt: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        color: 'error.main',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: 'error.dark'
                        }
                      }}
                    >
                      {translate('emergencyServices.learnMore')}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 6 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: 'error.main',
                mb: 2
              }}
            >
              {translate('emergencyServices.getHelp.title')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 'md', mx: 'auto' }}
            >
              {translate('emergencyServices.getHelp.description')}
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="error"
              endIcon={<ArrowForwardIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.5
              }}
            >
              {translate('emergencyServices.getHelp.button')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default EmergencyServices; 