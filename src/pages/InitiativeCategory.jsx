import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Breadcrumbs,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { API_BASE_URL } from '../config/api';

const StyledBreadcrumbLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 500,
  '&:hover': {
    textDecoration: 'underline'
  }
}));

const SERVER_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:5000';

const categoryTitles = {
  rehabilitation: 'Rehabilitation Centers in Sangli',
  outreach: 'Community Outreach in Sangli',
  education: 'Education Programs in Sangli',
  policy: 'Policy Measures for Sangli'
};

const InitiativeCategory = () => {
  const { category } = useParams();
  const location = useLocation();
  const [initiatives, setInitiatives] = useState([]);
  const [groupedInitiatives, setGroupedInitiatives] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const fetchInitiatives = async () => {
    try {
      setLoading(true);
      // Add a cache-busting timestamp to the URL
      const timestamp = new Date().getTime();
      const response = await fetch(`${SERVER_URL}/api/initiatives?category=${category}&_=${timestamp}`, {
        // Add cache control to prevent browser caching
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      const data = await response.json();
      console.log('Fetched initiatives for category:', category, data);
      setInitiatives(data);

      // Group initiatives by subcategory
      const grouped = data.reduce((acc, initiative) => {
        if (!acc[initiative.subCategory]) {
          acc[initiative.subCategory] = [];
        }
        acc[initiative.subCategory].push(initiative);
        return acc;
      }, {});
      setGroupedInitiatives(grouped);
      setLoading(false);
      setLastRefreshed(new Date());
    } catch (error) {
      console.error('Error fetching initiatives:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitiatives();
    
    // Set up an interval to refresh data every 30 seconds if the user stays on this page
    const refreshInterval = setInterval(fetchInitiatives, 30000);
    
    // Clean up the interval when component unmounts
    return () => clearInterval(refreshInterval);
  }, [category, location.key]); // Add location.key to force refresh

  const renderInitiativeCard = (initiative) => (
    <Grid item xs={12} sm={6} md={4} key={initiative._id}>
      <Card sx={{ height: '100%' }}>
        <CardActionArea component={Link} to={`/initiatives/${category}/detail/${initiative._id}`}>
          {initiative.images && initiative.images[0] && (
            <CardMedia
              component="img"
              height="200"
              image={`${API_BASE_URL}${initiative.images[0].path}`}
              alt={initiative.title}
              onError={(e) => {
                console.error('Image load error:', e);
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          )}
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {initiative.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {initiative.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <StyledBreadcrumbLink to="/">
          Home
        </StyledBreadcrumbLink>
        <Typography color="text.primary">
          {categoryTitles[category] || `${category} - Sangli`}
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
        >
          Back to Home
        </Button>
        
        <Box>
          <Button 
            variant="outlined" 
            onClick={fetchInitiatives}
            disabled={loading}
          >
            Refresh Data
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'right' }}>
            Last updated: {lastRefreshed.toLocaleTimeString()}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h3" component="h1" gutterBottom>
        {categoryTitles[category] || `${category} - Sangli`}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : Object.keys(groupedInitiatives).length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            No initiatives found for this category. Please check back later.
          </Typography>
        </Paper>
      ) : (
        Object.entries(groupedInitiatives).map(([subCategory, items]) => (
          <Paper key={subCategory} sx={{ mb: 4, p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
              {subCategory}
            </Typography>
            <Grid container spacing={3}>
              {items.map(renderInitiativeCard)}
            </Grid>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default InitiativeCategory; 