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
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Counseling = () => {
  const { translate } = useLanguage();

  const services = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('counseling.services.individual.title'),
      description: translate('counseling.services.individual.description'),
      category: translate('counseling.services.individual.category'),
      features: [
        translate('counseling.services.individual.features.1'),
        translate('counseling.services.individual.features.2'),
        translate('counseling.services.individual.features.3')
      ]
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('counseling.services.group.title'),
      description: translate('counseling.services.group.description'),
      category: translate('counseling.services.group.category'),
      features: [
        translate('counseling.services.group.features.1'),
        translate('counseling.services.group.features.2'),
        translate('counseling.services.group.features.3')
      ]
    },
    {
      icon: <FamilyRestroomIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('counseling.services.family.title'),
      description: translate('counseling.services.family.description'),
      category: translate('counseling.services.family.category'),
      features: [
        translate('counseling.services.family.features.1'),
        translate('counseling.services.family.features.2'),
        translate('counseling.services.family.features.3')
      ]
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('counseling.services.youth.title'),
      description: translate('counseling.services.youth.description'),
      category: translate('counseling.services.youth.category'),
      features: [
        translate('counseling.services.youth.features.1'),
        translate('counseling.services.youth.features.2'),
        translate('counseling.services.youth.features.3')
      ]
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('counseling.services.workplace.title'),
      description: translate('counseling.services.workplace.description'),
      category: translate('counseling.services.workplace.category'),
      features: [
        translate('counseling.services.workplace.features.1'),
        translate('counseling.services.workplace.features.2'),
        translate('counseling.services.workplace.features.3')
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
              {translate('counseling.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 'md', mx: 'auto' }}
            >
              {translate('counseling.subtitle')}
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
                          color: 'primary.dark'
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                    <Chip 
                      label={service.category}
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
                      {service.description}
                    </Typography>
                    <List dense>
                      {service.features.map((feature, idx) => (
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
                      {translate('counseling.learnMore')}
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
              {translate('counseling.getHelp.title')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 'md', mx: 'auto' }}
            >
              {translate('counseling.getHelp.description')}
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
              {translate('counseling.getHelp.button')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Counseling; 