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
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';

const Reports = () => {
  const { translate } = useLanguage();

  const reports = [
    {
      icon: <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('reports.reports.annual.title'),
      description: translate('reports.reports.annual.description'),
      category: translate('reports.reports.annual.category'),
      features: [
        translate('reports.reports.annual.features.1'),
        translate('reports.reports.annual.features.2'),
        translate('reports.reports.annual.features.3')
      ]
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('reports.reports.research.title'),
      description: translate('reports.reports.research.description'),
      category: translate('reports.reports.research.category'),
      features: [
        translate('reports.reports.research.features.1'),
        translate('reports.reports.research.features.2'),
        translate('reports.reports.research.features.3')
      ]
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('reports.reports.community.title'),
      description: translate('reports.reports.community.description'),
      category: translate('reports.reports.community.category'),
      features: [
        translate('reports.reports.community.features.1'),
        translate('reports.reports.community.features.2'),
        translate('reports.reports.community.features.3')
      ]
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('reports.reports.regional.title'),
      description: translate('reports.reports.regional.description'),
      category: translate('reports.reports.regional.category'),
      features: [
        translate('reports.reports.regional.features.1'),
        translate('reports.reports.regional.features.2'),
        translate('reports.reports.regional.features.3')
      ]
    }
  ];

  const statistics = [
    {
      category: translate('reports.statistics.categories.impact'),
      value: translate('reports.statistics.values.impact'),
      change: translate('reports.statistics.changes.impact')
    },
    {
      category: translate('reports.statistics.categories.treatment'),
      value: translate('reports.statistics.values.treatment'),
      change: translate('reports.statistics.changes.treatment')
    },
    {
      category: translate('reports.statistics.categories.prevention'),
      value: translate('reports.statistics.values.prevention'),
      change: translate('reports.statistics.changes.prevention')
    },
    {
      category: translate('reports.statistics.categories.community'),
      value: translate('reports.statistics.values.community'),
      change: translate('reports.statistics.changes.community')
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
              {translate('reports.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 'md', mx: 'auto', mb: 4 }}
            >
              {translate('reports.subtitle')}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={translate('reports.searchPlaceholder')}
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

          <TableContainer sx={{ mb: 6 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate('reports.statistics.header.category')}</TableCell>
                  <TableCell align="right">{translate('reports.statistics.header.value')}</TableCell>
                  <TableCell align="right">{translate('reports.statistics.header.change')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statistics.map((stat, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {stat.category}
                    </TableCell>
                    <TableCell align="right">{stat.value}</TableCell>
                    <TableCell align="right" sx={{ color: 'success.main' }}>
                      {stat.change}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container spacing={3}>
            {reports.map((report, index) => (
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
                      {report.icon}
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        sx={{ 
                          ml: 2,
                          fontWeight: 600,
                          color: 'primary.dark'
                        }}
                      >
                        {report.title}
                      </Typography>
                    </Box>
                    <Chip 
                      label={report.category}
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
                      {report.description}
                    </Typography>
                    <List dense>
                      {report.features.map((feature, idx) => (
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
                      {translate('reports.download')}
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
              {translate('reports.needHelp.title')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 'md', mx: 'auto' }}
            >
              {translate('reports.needHelp.description')}
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
              {translate('reports.needHelp.button')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Reports; 