import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Divider,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useLanguage } from '../../context/LanguageContext';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TrainingDevelopment = () => {
  const { translate } = useLanguage();

  const programs = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('training.programs.basic.title'),
      description: translate('training.programs.basic.description'),
      category: translate('training.programs.basic.category'),
      features: [
        translate('training.programs.basic.features.1'),
        translate('training.programs.basic.features.2'),
        translate('training.programs.basic.features.3')
      ]
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('training.programs.advanced.title'),
      description: translate('training.programs.advanced.description'),
      category: translate('training.programs.advanced.category'),
      features: [
        translate('training.programs.advanced.features.1'),
        translate('training.programs.advanced.features.2'),
        translate('training.programs.advanced.features.3')
      ]
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('training.programs.specialized.title'),
      description: translate('training.programs.specialized.description'),
      category: translate('training.programs.specialized.category'),
      features: [
        translate('training.programs.specialized.features.1'),
        translate('training.programs.specialized.features.2'),
        translate('training.programs.specialized.features.3')
      ]
    }
  ];

  const certification = [
    translate('training.certification.steps.1'),
    translate('training.certification.steps.2'),
    translate('training.certification.steps.3'),
    translate('training.certification.steps.4')
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
              {translate('training.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 'md', mx: 'auto' }}
            >
              {translate('training.subtitle')}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {programs.map((program, index) => (
              <Grid item xs={12} md={4} key={index}>
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
                      {program.icon}
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        sx={{ 
                          ml: 2,
                          fontWeight: 600,
                          color: 'primary.dark'
                        }}
                      >
                        {program.title}
                      </Typography>
                    </Box>
                    <Chip 
                      label={program.category}
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
                      {program.description}
                    </Typography>
                    <List dense>
                      {program.features.map((feature, idx) => (
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
                      {translate('training.learnMore')}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 6 }} />

          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                mb: 4,
                textAlign: 'center'
              }}
            >
              {translate('training.certification.title')}
            </Typography>
            <Timeline position="alternate">
              {certification.map((step, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    {index < certification.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: 'text.primary'
                      }}
                    >
                      {step}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>

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
              {translate('training.getStarted.title')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 'md', mx: 'auto' }}
            >
              {translate('training.getStarted.description')}
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
              {translate('training.getStarted.button')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default TrainingDevelopment; 