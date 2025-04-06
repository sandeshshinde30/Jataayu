import React, { useState } from 'react';
// import physical_effect_img from '../assets/images/banner/physical_effect_img'
// import social_effect_img from '../assets/images/banner/social_effect_img'
import { 
  Box, 
  Container, 
  Typography, 
  Tabs, 
  Tab, 
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  useTheme 
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupIcon from '@mui/icons-material/Group';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Effects = () => {
  const theme = useTheme();
  const { translate, language } = useLanguage();
  const [selectedTab, setSelectedTab] = useState(0);

  const effects = [
    {
      key: 'physical',
      icon: <FavoriteIcon sx={{ fontSize: 40, color: '#e74c3c' }} />,
      color: '#e74c3c',
      lightColor: '#fadbd8',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3'
    },
    {
      key: 'social',
      icon: <GroupIcon sx={{ fontSize: 40, color: '#3498db' }} />,
      color: '#3498db',
      lightColor: '#ebf5fb',
      image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3'
    },
    {
      key: 'mental',
      icon: <PsychologyIcon sx={{ fontSize: 40, color: '#9b59b6' }} />,
      color: '#9b59b6',
      lightColor: '#f4ecf7',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getPoints = (effectKey) => {
    const prefix = `effects.${effectKey}.points`;
    
    // Get points based on language
    const pointsData = translate(prefix);
    
    if (pointsData) {
      // For array-based points (now used for both English and Marathi)
      if (Array.isArray(pointsData)) {
        return pointsData;
      } 
      // Fallback for object-based points (for backward compatibility)
      else if (typeof pointsData === 'object') {
        const points = [];
        Object.values(pointsData).forEach(point => {
          if (point.text && point.source) {
            points.push(`${point.text} (${point.source})`);
          } else {
            points.push(point);
          }
        });
        return points;
      }
    }
    
    return [];
  };

  return (
    <Box sx={{ 
      py: 8, 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, rgba(46,125,50,0.1) 0%, rgba(255,255,255,1) 100%)'
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 1,
              color: theme.palette.primary.main,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            {translate('effects.title')}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              mb: 6,
              color: theme.palette.text.secondary,
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            {translate('effects.subtitle')}
          </Typography>
        </motion.div>

        <Paper 
          elevation={3}
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: 'background.paper'
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                py: 3,
                fontSize: '1.1rem'
              }
            }}
          >
            {effects.map((effect, index) => (
              <Tab
                key={index}
                icon={effect.icon}
                label={translate(`effects.${effect.key}.title`)}
                sx={{
                  '&.Mui-selected': {
                    color: effect.color
                  }
                }}
              />
            ))}
          </Tabs>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar
                    src={effects[selectedTab].image}
                    sx={{ 
                      width: 80, 
                      height: 80,
                      mr: 3,
                      border: `4px solid ${effects[selectedTab].color}`
                    }}
                  />
                  <Box>
                    <Typography variant="h4" sx={{ color: effects[selectedTab].color, mb: 1 }}>
                      {translate(`effects.${effects[selectedTab].key}.title`)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {translate(`effects.${effects[selectedTab].key}.description`)}
                    </Typography>
                  </Box>
                </Box>

                <List sx={{ bgcolor: effects[selectedTab].lightColor, borderRadius: 2, p: 3 }}>
                  {getPoints(effects[selectedTab].key).map((point, idx) => {
                    const [text, source] = point.split('(');
                    return (
                      <ListItem
                        key={idx}
                        sx={{
                          mb: 2,
                          '&:last-child': { mb: 0 }
                        }}
                      >
                        <ListItemIcon>
                          <ArrowRightIcon sx={{ color: effects[selectedTab].color }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={text?.trim()}
                          secondary={source ? `(${source}`.trim() : null}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontWeight: 500,
                              mb: 0.5
                            },
                            '& .MuiListItemText-secondary': {
                              fontStyle: 'italic'
                            }
                          }}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Paper>
      </Container>
    </Box>
  );
};

export default Effects; 