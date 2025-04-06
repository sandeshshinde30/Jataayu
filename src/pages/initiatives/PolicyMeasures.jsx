import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';
import PolicyIcon from '@mui/icons-material/Policy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLanguage } from '../../context/LanguageContext';

const PolicyMeasures = () => {
  const { translate } = useLanguage();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <GavelIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Policy Measures
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          Government policies and legal framework to combat drug abuse
        </Typography>

        <Box sx={{ mt: 4 }}>
          <ListItem
            component={RouterLink}
            to="/initiatives/policy/actions"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { 
                backgroundColor: 'action.hover',
                textDecoration: 'underline'
              },
              borderRadius: 1,
              mb: 2
            }}
          >
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="h6" sx={{ 
                  m: 0,
                  color: 'primary.main',
                  fontWeight: 500
                }}>
                  Actions Taken
                </Typography>
              }
            />
          </ListItem>

          <Box sx={{ ml: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
              Drug Prevention Measures
            </Typography>
            
            <List sx={{ '& .MuiListItem-root': { borderRadius: 1 } }}>
              <ListItem 
                component={RouterLink} 
                to="/initiatives/policy/ncord"
                sx={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { 
                    backgroundColor: 'action.hover',
                    transform: 'translateX(8px)',
                    textDecoration: 'underline'
                  },
                  transition: 'all 0.2s ease-in-out',
                  mb: 1
                }}
              >
                <ListItemIcon>
                  <PolicyIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="NCord"
                  secondary="National Coordination Center for Drug Abuse Control"
                  primaryTypographyProps={{
                    sx: {
                      color: 'primary.main',
                      fontWeight: 500
                    }
                  }}
                  secondaryTypographyProps={{
                    sx: { color: 'text.secondary' }
                  }}
                />
              </ListItem>

              <ListItem 
                component={RouterLink} 
                to="/initiatives/policy/taskforce"
                sx={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { 
                    backgroundColor: 'action.hover',
                    transform: 'translateX(8px)',
                    textDecoration: 'underline'
                  },
                  transition: 'all 0.2s ease-in-out',
                  mb: 1
                }}
              >
                <ListItemIcon>
                  <SecurityIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Anti-drug Task Force"
                  secondary="Special task force for drug control and enforcement"
                  primaryTypographyProps={{
                    sx: {
                      color: 'primary.main',
                      fontWeight: 500
                    }
                  }}
                  secondaryTypographyProps={{
                    sx: { color: 'text.secondary' }
                  }}
                />
              </ListItem>

              <ListItem 
                component={RouterLink} 
                to="/initiatives/policy/ndps"
                sx={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { 
                    backgroundColor: 'action.hover',
                    transform: 'translateX(8px)',
                    textDecoration: 'underline'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <ListItemIcon>
                  <GavelIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="NDPS Act"
                  secondary="Narcotic Drugs and Psychotropic Substances Act"
                  primaryTypographyProps={{
                    sx: {
                      color: 'primary.main',
                      fontWeight: 500
                    }
                  }}
                  secondaryTypographyProps={{
                    sx: { color: 'text.secondary' }
                  }}
                />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PolicyMeasures; 