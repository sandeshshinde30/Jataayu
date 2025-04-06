import { Box, Container, Typography, Grid, Link, IconButton, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import logo from '../../assets/images/logo.png';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { translate } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: '#f1f8e9',
        backgroundImage: 'linear-gradient(to bottom, #f1f8e9 0%, white 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(46, 125, 50, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        color: 'text.primary'
      }}
    >
      {/* Scroll to top button */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 20, 
          right: 20,
          zIndex: 10
        }}
      >
        <div className="btn-scale-hover">
          <IconButton 
            onClick={scrollToTop} 
            sx={{ 
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-5px)',
                boxShadow: '0 5px 15px rgba(46, 125, 50, 0.3)'
              },
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </div>
      </Box>

      {/* Background gradient shapes */}
      <Box sx={{ 
        position: 'absolute', 
        width: '300px', 
        height: '300px', 
        borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(46, 125, 50, 0.1) 0%, rgba(0,0,0,0) 70%)',
        top: '-100px',
        left: '10%',
        pointerEvents: 'none',
      }} />
      
      <Box sx={{ 
        position: 'absolute', 
        width: '400px', 
        height: '400px', 
        borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(139, 195, 74, 0.08) 0%, rgba(0,0,0,0) 70%)',
        bottom: '-200px',
        right: '5%',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center" direction="column" spacing={3}>
          {/* Logo and description */}
          <Grid item xs={12} textAlign="center">
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                letterSpacing: '.05rem',
                color: 'primary.dark',
                textDecoration: 'none',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img 
                src={logo} 
                alt="JATAAYU Logo" 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  marginRight: '10px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  borderRadius: '4px'
                }} 
              />
              JATAAYU
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '600px', mx: 'auto' }}>
              {translate('footer.description')}
            </Typography>
            {/* Contact Information */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1 
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'inline-flex', 
                    color: 'primary.main'
                  }}
                >
                  📍
                </Box>
                Zilla Parishad Sangli,Khanbhag, Sangli, Maharashtra 416416
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1 
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'inline-flex', 
                    color: 'primary.main'
                  }}
                >
                  📞
                </Box>
                0233-2375318
              </Typography>
            </Box>
          </Grid>
          
          {/* Team Link */}
          <Grid item xs={12} textAlign="center">
            <Link 
              component={RouterLink} 
              to="/team" 
              sx={{ 
                color: 'primary.main', 
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Team
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
        
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary" textAlign="center">
            © {new Date().getFullYear()} JATAAYU. {translate('footer.copyright')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 