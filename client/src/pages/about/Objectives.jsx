import { Box, Container, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import PublicIcon from '@mui/icons-material/Public';
import CampaignIcon from '@mui/icons-material/Campaign';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SchoolIcon from '@mui/icons-material/School';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PolicyIcon from '@mui/icons-material/Policy';
import WorkIcon from '@mui/icons-material/Work';

const Objectives = () => {
  const { translate } = useLanguage();

  const objectives = [
    {
      icon: <PublicIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('objectives.list.society.title'),
      description: translate('objectives.list.society.description'),
    },
    {
      icon: <CampaignIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('objectives.list.awareness.title'),
      description: translate('objectives.list.awareness.description'),
    },
    {
      icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('objectives.list.counseling.title'),
      description: translate('objectives.list.counseling.description'),
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('objectives.list.youth.title'),
      description: translate('objectives.list.youth.description'),
    },
    {
      icon: <FamilyRestroomIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('objectives.list.family.title'),
      description: translate('objectives.list.family.description'),
    },
    {
      icon: <PolicyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('objectives.list.policy.title'),
      description: translate('objectives.list.policy.description'),
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('objectives.list.rehabilitation.title'),
      description: translate('objectives.list.rehabilitation.description'),
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
              {translate('objectives.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 'md', mx: 'auto' }}
            >
              {translate('objectives.subtitle')}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {objectives.map((objective, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
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
                      {objective.icon}
                      <Typography 
                        variant="h6" 
                        component="h2" 
                        sx={{ 
                          ml: 2,
                          fontWeight: 600,
                          color: 'primary.dark'
                        }}
                      >
                        {objective.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7
                      }}
                    >
                      {objective.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box 
            sx={{ 
              mt: 6, 
              p: 4, 
              bgcolor: 'primary.light', 
              borderRadius: 2,
              textAlign: 'center'
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: 'primary.dark',
                fontWeight: 600
              }}
            >
              {translate('objectives.commitment')}
            </Typography>
            <Typography 
              color="text.primary"
              sx={{ 
                maxWidth: 'md', 
                mx: 'auto',
                lineHeight: 1.8
              }}
            >
              {translate('objectives.commitmentText')}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Objectives; 