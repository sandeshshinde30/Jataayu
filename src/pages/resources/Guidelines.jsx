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
  Divider,
  TextField,
  InputAdornment
} from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';

const Guidelines = () => {
  const { translate } = useLanguage();

  const guidelines = [
    {
      icon: <DescriptionIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('guidelines.guidelines.treatment.title'),
      description: translate('guidelines.guidelines.treatment.description'),
      category: translate('guidelines.guidelines.treatment.category'),
      features: [
        translate('guidelines.guidelines.treatment.features.1'),
        translate('guidelines.guidelines.treatment.features.2'),
        translate('guidelines.guidelines.treatment.features.3')
      ]
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('guidelines.guidelines.education.title'),
      description: translate('guidelines.guidelines.education.description'),
      category: translate('guidelines.guidelines.education.category'),
      features: [
        translate('guidelines.guidelines.education.features.1'),
        translate('guidelines.guidelines.education.features.2'),
        translate('guidelines.guidelines.education.features.3')
      ]
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('guidelines.guidelines.workplace.title'),
      description: translate('guidelines.guidelines.workplace.description'),
      category: translate('guidelines.guidelines.workplace.category'),
      features: [
        translate('guidelines.guidelines.workplace.features.1'),
        translate('guidelines.guidelines.workplace.features.2'),
        translate('guidelines.guidelines.workplace.features.3')
      ]
    },
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('guidelines.guidelines.medical.title'),
      description: translate('guidelines.guidelines.medical.description'),
      category: translate('guidelines.guidelines.medical.category'),
      features: [
        translate('guidelines.guidelines.medical.features.1'),
        translate('guidelines.guidelines.medical.features.2'),
        translate('guidelines.guidelines.medical.features.3')
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
              {translate('guidelines.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 'md', mx: 'auto', mb: 4 }}
            >
              {translate('guidelines.subtitle')}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={translate('guidelines.searchPlaceholder')}
              sx={{ maxWidth: 'md', mx: 'auto' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {guidelines.map((guideline, index) => (
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
                      {guideline.icon}
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        sx={{ 
                          ml: 2,
                          fontWeight: 600,
                          color: 'primary.dark'
                        }}
                      >
                        {guideline.title}
                      </Typography>
                    </Box>
                    <Chip 
                      label={guideline.category}
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
                      {guideline.description}
                    </Typography>
                    <List dense>
                      {guideline.features.map((feature, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      endIcon={<DownloadIcon />}
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
                      {translate('guidelines.download')}
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
              {translate('guidelines.needHelp.title')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 'md', mx: 'auto' }}
            >
              {translate('guidelines.needHelp.description')}
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
              {translate('guidelines.needHelp.button')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Guidelines; 