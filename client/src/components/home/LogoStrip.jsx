import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import zpLogo from '../../assets/ZPlogo.png';
import policeLogo from '../../assets/police.jpg';
import collectorLogo from '../../assets/collector.jpg';

const LogoStrip = () => {
  const theme = useTheme();
  const { language } = useLanguage();

  const fullForm = {
    en: {
      text: 'Joint Action on drug Trafficking And drug Abuse for Youth Upliftment',
      words: ['Joint', 'Action on drug', 'Trafficking', 'And drug', 'Abuse for', 'Youth', 'Upliftment']
    },
    mr: {
      text: 'तरुणांच्या उन्नतीसाठी अंमली पदार्थांची तस्करी आणि व्यसनाविरुद्ध संयुक्त कृती',
      words: ['तरुणांच्या', 'उन्नतीसाठी', 'अंमली पदार्थांची', 'तस्करी', 'आणि', 'व्यसनाविरुद्ध', 'संयुक्त कृती']
    }
  };

  return (
    <Box 
      sx={{ 
        py: 2,
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3
          }}
        >
          {/* Partner Logos */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {/* ZP Logo */}
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.paper',
                boxShadow: 1,
                overflow: 'hidden'
              }}
            >
              <Box
                component="img"
                src={zpLogo}
                alt="ZP Logo"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>

            {/* Sangli Police Logo */}
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.paper',
                boxShadow: 1,
                overflow: 'hidden'
              }}
            >
              <Box
                component="img"
                src={policeLogo}
                alt="Sangli Police Logo"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>

            {/* Collector Office Logo */}
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.paper',
                boxShadow: 1,
                overflow: 'hidden'
              }}
            >
              <Box
                component="img"
                src={collectorLogo}
                alt="Collector Office Logo"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
          </Box>

          {/* Full Form */}
          <Box sx={{ maxWidth: 600 }}>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                '& .highlight': {
                  color: theme.palette.primary.dark,
                  fontWeight: 700
                }
              }}
            >
              {fullForm[language === 'mr' ? 'mr' : 'en'].words.map((word, index) => (
                <React.Fragment key={index}>
                  <span className={word.charAt(0).toUpperCase() === word.charAt(0) ? 'highlight' : ''}>
                    {word}
                  </span>
                  {index < fullForm[language === 'mr' ? 'mr' : 'en'].words.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LogoStrip; 