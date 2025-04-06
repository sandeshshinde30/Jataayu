import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Breadcrumbs,
  Divider,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const StyledBreadcrumbLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 500,
  '&:hover': {
    textDecoration: 'underline'
  }
}));

const StyledCardLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  height: '100%',
  '&:hover': {
    textDecoration: 'none'
  }
}));

const SERVER_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:5000';

const categoryMap = {
  'rehabilitation': {
    title: 'Rehabilitation Centers',
    subinitiatives: {
      'free-medical-treatment': 'Free medical treatment and counseling',
      'residential-programs': 'Residential rehabilitation programs',
      'aftercare-services': 'Aftercare and follow-up services'
    }
  },
  'outreach': {
    title: 'Community Outreach',
    subinitiatives: {
      'street-plays': 'Street plays and awareness campaigns',
      'community-support': 'Community support groups',
      'family-counseling': 'Family counseling services'
    }
  },
  'education': {
    title: 'Education Programs',
    subinitiatives: {
      'school-prevention': 'School prevention programs',
      'peer-education': 'Peer education initiatives',
      'teacher-training': 'Teacher training workshops'
    }
  },
  'policy': {
    title: 'Policy Measures',
    subinitiatives: {
      'actions-taken': 'Actions Taken',
      'actions': 'Actions Taken',
      'ncord': 'NCord',
      'anti-drug-taskforce': 'Anti-drug Task Force',
      'ndps-act': 'NDPS Act',
      'taskforce': 'Anti-drug Task Force',
      'ndps': 'NDPS Act'
    }
  }
};

const SubInitiativeDetail = () => {
  const { category, subinitiative } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const fetchInitiatives = async () => {
    try {
      setLoading(true); // Always start with loading state
      // Add a cache-busting timestamp to the URL
      const timestamp = new Date().getTime();
      const response = await fetch(`${SERVER_URL}/api/initiatives?category=${category}&subCategory=${categoryMap[category].subinitiatives[subinitiative]}&_=${timestamp}`, {
        // Add cache control to prevent browser caching
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      const data = await response.json();
      console.log('Fetched initiatives for', category, subinitiative, data);
      setInitiatives(data);
      setLoading(false);
      setLastRefreshed(new Date());
    } catch (error) {
      console.error('Error fetching initiatives:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Validate if the category and subinitiative exist in our map
    if (!categoryMap[category] || !categoryMap[category].subinitiatives[subinitiative]) {
      navigate('/');
      return;
    }

    fetchInitiatives();
    
    // Set up an interval to refresh data every 30 seconds if the user stays on this page
    const refreshInterval = setInterval(fetchInitiatives, 30000);
    
    // Clean up the interval when component unmounts
    return () => clearInterval(refreshInterval);
  }, [category, subinitiative, navigate, location.key]); // Add location.key to dependencies

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  const subinitiativeTitle = categoryMap[category]?.subinitiatives[subinitiative] || 'Subinitiative';
  const categoryTitle = categoryMap[category]?.title || 'Category';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <StyledBreadcrumbLink to="/">
          Home
        </StyledBreadcrumbLink>
        <StyledBreadcrumbLink to={`/initiatives/${category}`}>
          {categoryTitle}
        </StyledBreadcrumbLink>
        <Typography color="text.primary">
          {subinitiativeTitle}
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to={`/initiatives/${category}`}
          startIcon={<ArrowBackIcon />}
        >
          Back to {categoryTitle}
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
        {subinitiativeTitle}
      </Typography>

      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="body1" paragraph>
          This page provides information about {subinitiativeTitle.toLowerCase()} under the {categoryTitle.toLowerCase()} initiative.
        </Typography>
        
        {initiatives.length === 0 ? (
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            No initiatives have been added for this category yet. Please check back later.
          </Typography>
        ) : (
          <>
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              Initiatives
            </Typography>
            <Grid container spacing={3}>
              {initiatives.map((initiative) => (
                <Grid item xs={12} sm={6} md={4} key={initiative._id}>
                  <Card sx={{ height: '100%' }}>
                    <CardActionArea component={Link} to={`/initiatives/${category}/detail/${initiative._id}`}>
                      {initiative.images && initiative.images[0] && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={`${SERVER_URL}/${initiative.images[0].path}`}
                          alt={initiative.title}
                          onError={(e) => {
                            console.error('Image load error:', e);
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                      )}
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="primary">
                          {initiative.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {initiative.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default SubInitiativeDetail; 