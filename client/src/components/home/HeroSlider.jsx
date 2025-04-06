import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Typography, useTheme, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLanguage } from '../../context/LanguageContext';
import img1 from '../../assets/images/banner/img1.jpg';
import img2 from '../../assets/images/banner/img2.jpg';
import img3 from '../../assets/images/banner/img3.jpg';
import img4 from '../../assets/images/banner/img4.jpg';
import img5 from '../../assets/images/banner/img5.jpg';
import new1 from '../../assets/images/home_slider1.jpg';
import new2 from '../../assets/images/home_slider2.jpg';
import new3 from '../../assets/images/home_slider3.jpg';
import new4 from '../../assets/images/home_slider4.jpg';
import main from '../../assets/images/main_img.jpg';

// Add a style to hide translation keys that might be added to the DOM
const hiddenStyle = document.createElement('style');
hiddenStyle.textContent = `
  .MuiTypography-h6:not([class*="css-"]), 
  h6:not([class*="MuiTypography-root"]) {
    display: none !important;
  }
  
  h6[class*="MuiTypography-root"]:empty,
  .translate-key-text {
    display: none !important;
  }
`;
document.head.appendChild(hiddenStyle);

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const { translate } = useLanguage();
  const sliderRef = useRef(null);
  
  // Define slides with translation keys
  const slides = [
    {
      image: main,
      title: translate('home.hero.title').replace('{location}', translate('common.locations.sangli')),
      subtitle: translate('home.hero.subtitle'),
      description: translate('home.hero.description')
    },
    {
      image: new2,
      title: translate('home.hero.title').replace('{location}', translate('common.locations.sangli')),
      subtitle: translate('home.hero.subtitle'),
      description: translate('home.hero.description')
    },
    {
      image: new3,
      title: translate('home.hero.title').replace('{location}', translate('common.locations.sangli')),
      subtitle: translate('home.effects.mental.title'),
      description: translate('home.effects.mental.description')
    },
    {
      image: new4,
      title: translate('home.hero.title').replace('{location}', translate('common.locations.sangli')),
      subtitle: translate('home.services.rehabilitation.title'),
      description: translate('home.services.rehabilitation.description')
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Clean up raw translation keys
  useEffect(() => {
    if (sliderRef.current) {
      // Look for any elements that contain raw translation keys
      const container = sliderRef.current;
      const elements = container.querySelectorAll('*');
      
      elements.forEach(el => {
        if (el.textContent === 'home.effects.mental.title' || 
            el.textContent === 'home.effects.mental.description' ||
            el.textContent === 'home.hero.description') {
          el.classList.add('translate-key-text');
        }
      });
    }
    
    // Also clean up any h6 elements in the document body that contain these keys
    const cleanup = () => {
      const rawTextElements = document.querySelectorAll('h6');
      rawTextElements.forEach(element => {
        if (
          element.textContent === 'home.hero.description' || 
          element.textContent === 'home.effects.mental.description' ||
          element.textContent === 'home.effects.mental.title'
        ) {
          element.style.display = 'none';
          element.classList.add('translate-key-text');
        }
      });
    };
    
    cleanup();
    // Run cleanup again after a short delay to catch any elements added after initial render
    const timeoutId = setTimeout(cleanup, 500);
    
    return () => clearTimeout(timeoutId);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <Box
      ref={sliderRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '70vh', sm: '75vh', md: '80vh', lg: '85vh' },
        overflow: 'hidden',
        marginTop: { xs: 0, sm: '-10px' },
        padding: '20px 0',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1
        }
      }}
    >
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0.8)'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            <Box
              component="img"
              src={slide.image}
              alt={slide.title}
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block'
              }}
            />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
              zIndex: 2,
              width: { xs: '95%', sm: '90%', md: '85%' },
              maxWidth: '1000px',
              padding: { xs: 2, sm: 3, md: 4 },
              backdropFilter: 'blur(1px)',
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: { xs: 1, sm: 1.5, md: 2 },
                textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                fontSize: { xs: '1.8rem', sm: '2.6rem', md: '3.5rem', lg: '4rem' },
                letterSpacing: '0.5px',
                lineHeight: 1.2,
                textTransform: 'none'
              }}
            >
              {slide.title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mb: { xs: 1.5, md: 2.5 },
                textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                fontSize: { xs: '1.3rem', sm: '1.7rem', md: '2.2rem' },
                fontWeight: 500,
                lineHeight: 1.4,
                maxWidth: '80%',
                margin: '0 auto'
              }}
            >
              {slide.subtitle}
            </Typography>
            {slide.description && (
              <Typography
                variant="h6"
                className="slide-description"
                sx={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                  fontWeight: 400,
                  lineHeight: 1.6,
                  maxWidth: '75%',
                  margin: '0 auto',
                  mb: { xs: 2, md: 3 }
                }}
              >
                {slide.description}
              </Typography>
            )}
            {index === 0 && (
              <Box sx={{ mt: { xs: 2, md: 3 } }}>
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    fontWeight: 600,
                    px: { xs: 2, md: 4 },
                    py: { xs: 1, md: 1.5 },
                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    },
                    textTransform: 'none',
                    borderRadius: '30px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  {translate('home.hero.getStarted')}
                </Button>
              </Box>
            )}
            {index === 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: '-60px', sm: '-50px', md: '-40px' },
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90%',
                  maxWidth: '600px',
                  textAlign: 'center',
                  padding: { xs: '12px', sm: '16px', md: '20px' },
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                  zIndex: 3,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'green',
                    opacity: 0,
                  }
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: '#ffd700',
                    fontWeight: 700,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                    fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                    mb: { xs: 1, sm: 1.5 },
                    letterSpacing: '0.5px'
                  }}
                >
                  ₹10,000/- बक्षीस
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                    fontWeight: 500,
                    lineHeight: 1.4,
                    letterSpacing: '0.5px'
                  }}
                >
                  जो ड्रग्सची माहिती देईल त्याला प्रोत्साहनपर बक्षीस
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      ))}

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrevSlide}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.3)',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.6)'
          },
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={handleNextSlide}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.3)',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.6)'
          },
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Slide Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          gap: 2
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2)',
                bgcolor: 'white'
              },
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSlider; 