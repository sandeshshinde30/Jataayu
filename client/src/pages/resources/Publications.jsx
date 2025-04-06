import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  TextField,
  InputAdornment,
  Chip,
  Pagination
} from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ArticleIcon from '@mui/icons-material/Article';
import { useState } from 'react';

const Publications = () => {
  const { translate } = useLanguage();
  const [page, setPage] = useState(1);

  const publications = [
    {
      title: translate('publications.report1.title'),
      description: translate('publications.report1.description'),
      type: translate('publications.type.research'),
      date: '2024-03-15',
      size: '2.4 MB',
      downloads: 1234
    },
    {
      title: translate('publications.report2.title'),
      description: translate('publications.report2.description'),
      type: translate('publications.type.guideline'),
      date: '2024-02-28',
      size: '1.8 MB',
      downloads: 856
    },
    {
      title: translate('publications.report3.title'),
      description: translate('publications.report3.description'),
      type: translate('publications.type.report'),
      date: '2024-02-15',
      size: '3.1 MB',
      downloads: 2156
    },
    {
      title: translate('publications.report4.title'),
      description: translate('publications.report4.description'),
      type: translate('publications.type.research'),
      date: '2024-01-30',
      size: '1.5 MB',
      downloads: 967
    }
  ];

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
            <ArticleIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
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
              {translate('publications.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 'md', mx: 'auto', mb: 4 }}
            >
              {translate('publications.subtitle')}
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder={translate('publications.searchPlaceholder')}
              sx={{ 
                maxWidth: 'md',
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'background.default'
                }
              }}
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
            {publications.map((publication, index) => (
              <Grid item xs={12} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <Typography 
                            variant="h5" 
                            component="h2" 
                            sx={{ 
                              fontWeight: 600,
                              color: 'primary.dark',
                              mb: 1
                            }}
                          >
                            {publication.title}
                          </Typography>
                          <Chip 
                            label={publication.type}
                            size="small"
                            color="primary"
                            sx={{ ml: 2, mt: 0.5 }}
                          />
                        </Box>
                        <Typography 
                          color="text.secondary"
                          paragraph
                          sx={{ mb: 2 }}
                        >
                          {publication.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {translate('publications.published')}: {new Date(publication.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {translate('publications.size')}: {publication.size}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {translate('publications.downloads')}: {publication.downloads.toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<DownloadIcon />}
                          sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              color: 'white'
                            }
                          }}
                        >
                          {translate('publications.download')}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={10} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Publications; 