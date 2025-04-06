import { Box, Container, Typography, Paper, Grid, Card, CardMedia, CardContent, Button, Chip } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import CampaignIcon from '@mui/icons-material/Campaign';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';

const AwarenessPrograms = () => {
  const { translate } = useLanguage();

  const programs = [
    {
      title: translate('awareness.school.title'),
      description: translate('awareness.school.description'),
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      image: '/images/school-awareness.jpg',
      category: translate('awareness.education')
    },
    {
      title: translate('awareness.community.title'),
      description: translate('awareness.community.description'),
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      image: '/images/community-awareness.jpg',
      category: translate('awareness.community')
    },
    {
      title: translate('awareness.workplace.title'),
      description: translate('awareness.workplace.description'),
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      image: '/images/workplace-awareness.jpg',
      category: translate('awareness.workplace')
    }
  ];

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <CampaignIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'primary.main'
            }}
          >
            {translate('awareness.title')}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 'md', mx: 'auto', mb: 4 }}
          >
            {translate('awareness.subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {programs.map((program, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)'
                    }
                  }}
                  image={program.image}
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    left: 16,
                    zIndex: 1
                  }}
                >
                  <Chip
                    label={program.category}
                    color="primary"
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      fontWeight: 500
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'primary.main', mr: 1 }}>
                      {program.icon}
                    </Box>
                    <Typography variant="h5" component="h2" fontWeight={600}>
                      {program.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {program.description}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    fullWidth
                    sx={{ 
                      mt: 2,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white'
                      }
                    }}
                  >
                    {translate('awareness.learnMore')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper 
          elevation={0}
          sx={{ 
            mt: 6, 
            p: 4, 
            bgcolor: 'primary.light', 
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" gutterBottom color="primary.dark" fontWeight={600}>
            {translate('awareness.getInvolved')}
          </Typography>
          <Typography color="text.primary" sx={{ maxWidth: 'md', mx: 'auto', mb: 3 }}>
            {translate('awareness.involvedText')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            {translate('awareness.joinUs')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default AwarenessPrograms; 