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
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';

const Downloads = () => {
  const { translate } = useLanguage();

  const resources = [
    {
      icon: <DescriptionIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('downloads.resources.documents.title'),
      description: translate('downloads.resources.documents.description'),
      category: translate('downloads.resources.documents.category'),
      features: [
        translate('downloads.resources.documents.features.1'),
        translate('downloads.resources.documents.features.2'),
        translate('downloads.resources.documents.features.3')
      ]
    },
    {
      icon: <PictureAsPdfIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('downloads.resources.pdfs.title'),
      description: translate('downloads.resources.pdfs.description'),
      category: translate('downloads.resources.pdfs.category'),
      features: [
        translate('downloads.resources.pdfs.features.1'),
        translate('downloads.resources.pdfs.features.2'),
        translate('downloads.resources.pdfs.features.3')
      ]
    },
    {
      icon: <ImageIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('downloads.resources.images.title'),
      description: translate('downloads.resources.images.description'),
      category: translate('downloads.resources.images.category'),
      features: [
        translate('downloads.resources.images.features.1'),
        translate('downloads.resources.images.features.2'),
        translate('downloads.resources.images.features.3')
      ]
    },
    {
      icon: <VideoLibraryIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('downloads.resources.videos.title'),
      description: translate('downloads.resources.videos.description'),
      category: translate('downloads.resources.videos.category'),
      features: [
        translate('downloads.resources.videos.features.1'),
        translate('downloads.resources.videos.features.2'),
        translate('downloads.resources.videos.features.3')
      ]
    }
  ];

  const recentDownloads = [
    {
      name: translate('downloads.recentDownloads.items.1.name'),
      type: translate('downloads.recentDownloads.items.1.type'),
      size: translate('downloads.recentDownloads.items.1.size'),
      date: translate('downloads.recentDownloads.items.1.date')
    },
    {
      name: translate('downloads.recentDownloads.items.2.name'),
      type: translate('downloads.recentDownloads.items.2.type'),
      size: translate('downloads.recentDownloads.items.2.size'),
      date: translate('downloads.recentDownloads.items.2.date')
    },
    {
      name: translate('downloads.recentDownloads.items.3.name'),
      type: translate('downloads.recentDownloads.items.3.type'),
      size: translate('downloads.recentDownloads.items.3.size'),
      date: translate('downloads.recentDownloads.items.3.date')
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
              {translate('downloads.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 'md', mx: 'auto', mb: 4 }}
            >
              {translate('downloads.subtitle')}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={translate('downloads.searchPlaceholder')}
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
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                mb: 3
              }}
            >
              {translate('downloads.recentDownloads.title')}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate('downloads.recentDownloads.header.name')}</TableCell>
                  <TableCell>{translate('downloads.recentDownloads.header.type')}</TableCell>
                  <TableCell>{translate('downloads.recentDownloads.header.size')}</TableCell>
                  <TableCell>{translate('downloads.recentDownloads.header.date')}</TableCell>
                  <TableCell align="right">{translate('downloads.recentDownloads.header.action')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentDownloads.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell align="right">
                      <Button
                        startIcon={<DownloadIcon />}
                        size="small"
                        sx={{
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: 'transparent',
                            color: 'primary.dark'
                          }
                        }}
                      >
                        {translate('downloads.download')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container spacing={3}>
            {resources.map((resource, index) => (
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
                      {resource.icon}
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        sx={{ 
                          ml: 2,
                          fontWeight: 600,
                          color: 'primary.dark'
                        }}
                      >
                        {resource.title}
                      </Typography>
                    </Box>
                    <Chip 
                      label={resource.category}
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
                      {resource.description}
                    </Typography>
                    <List dense>
                      {resource.features.map((feature, idx) => (
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
                      {translate('downloads.browse')}
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
              {translate('downloads.needHelp.title')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 'md', mx: 'auto' }}
            >
              {translate('downloads.needHelp.description')}
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
              {translate('downloads.needHelp.button')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Downloads; 