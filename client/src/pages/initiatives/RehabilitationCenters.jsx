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
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const RehabilitationCenters = () => {
  const { translate } = useLanguage();

  const centers = [
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('rehabilitationCenters.centers.medical.title'),
      description: translate('rehabilitationCenters.centers.medical.description'),
      category: translate('rehabilitationCenters.centers.medical.category'),
      features: [
        translate('rehabilitationCenters.centers.medical.features.1'),
        translate('rehabilitationCenters.centers.medical.features.2'),
        translate('rehabilitationCenters.centers.medical.features.3')
      ]
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('rehabilitationCenters.centers.psychological.title'),
      description: translate('rehabilitationCenters.centers.psychological.description'),
      category: translate('rehabilitationCenters.centers.psychological.category'),
      features: [
        translate('rehabilitationCenters.centers.psychological.features.1'),
        translate('rehabilitationCenters.centers.psychological.features.2'),
        translate('rehabilitationCenters.centers.psychological.features.3')
      ]
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('rehabilitationCenters.centers.community.title'),
      description: translate('rehabilitationCenters.centers.community.description'),
      category: translate('rehabilitationCenters.centers.community.category'),
      features: [
        translate('rehabilitationCenters.centers.community.features.1'),
        translate('rehabilitationCenters.centers.community.features.2'),
        translate('rehabilitationCenters.centers.community.features.3')
      ]
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('rehabilitationCenters.centers.outpatient.title'),
      description: translate('rehabilitationCenters.centers.outpatient.description'),
      category: translate('rehabilitationCenters.centers.outpatient.category'),
      features: [
        translate('rehabilitationCenters.centers.outpatient.features.1'),
        translate('rehabilitationCenters.centers.outpatient.features.2'),
        translate('rehabilitationCenters.centers.outpatient.features.3')
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
                color: 'primary.main',
                mb: 2
              }}
            >
              {translate('rehabilitationCenters.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 'md', mx: 'auto' }}
            >
              {translate('rehabilitationCenters.subtitle')}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {centers.map((center, index) => (
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
                      {center.icon}
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        sx={{ 
                          ml: 2,
                          fontWeight: 600,
                          color: 'primary.dark'
                        }}
                      >
                        {center.title}
                      </Typography>
                    </Box>
                    <Chip 
                      label={center.category}
                      color="primary"
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
                      {center.description}
                    </Typography>
                    <List dense>
                      {center.features.map((feature, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
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
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: 'primary.dark'
                        }
                      }}
                    >
                      {translate('rehabilitationCenters.learnMore')}
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
                color: 'primary.main',
                mb: 2
              }}
            >
              {translate('rehabilitationCenters.needHelp.title')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 'md', mx: 'auto' }}
            >
              {translate('rehabilitationCenters.needHelp.description')}
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.5
              }}
            >
              {translate('rehabilitationCenters.needHelp.button')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RehabilitationCenters; 