import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, CardActions, Button, TextField, Chip, IconButton, Tooltip } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import WorkIcon from '@mui/icons-material/Work';
import { useTheme } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';

const GovernmentDepartments = () => {
  const theme = useTheme();
  const { translate, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const departments = [
    {
      icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('governmentDepartments.departments.health.title'),
      description: translate('governmentDepartments.departments.health.description'),
      category: translate('governmentDepartments.departments.health.category'),
      features: [
        translate('governmentDepartments.departments.health.features.0'),
        translate('governmentDepartments.departments.health.features.1'),
        translate('governmentDepartments.departments.health.features.2')
      ],
      contact: {
        address: translate('governmentDepartments.departments.health.contact.address'),
        phone: translate('governmentDepartments.departments.health.contact.phone'),
        email: translate('governmentDepartments.departments.health.contact.email'),
        website: translate('governmentDepartments.departments.health.contact.website')
      }
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('governmentDepartments.departments.education.title'),
      description: translate('governmentDepartments.departments.education.description'),
      category: translate('governmentDepartments.departments.education.category'),
      features: [
        translate('governmentDepartments.departments.education.features.0'),
        translate('governmentDepartments.departments.education.features.1'),
        translate('governmentDepartments.departments.education.features.2')
      ],
      contact: {
        address: translate('governmentDepartments.departments.education.contact.address'),
        phone: translate('governmentDepartments.departments.education.contact.phone'),
        email: translate('governmentDepartments.departments.education.contact.email'),
        website: translate('governmentDepartments.departments.education.contact.website')
      }
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('governmentDepartments.departments.home.title'),
      description: translate('governmentDepartments.departments.home.description'),
      category: translate('governmentDepartments.departments.home.category'),
      features: [
        translate('governmentDepartments.departments.home.features.0'),
        translate('governmentDepartments.departments.home.features.1'),
        translate('governmentDepartments.departments.home.features.2')
      ],
      contact: {
        address: translate('governmentDepartments.departments.home.contact.address'),
        phone: translate('governmentDepartments.departments.home.contact.phone'),
        email: translate('governmentDepartments.departments.home.contact.email'),
        website: translate('governmentDepartments.departments.home.contact.website')
      }
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('governmentDepartments.departments.labor.title'),
      description: translate('governmentDepartments.departments.labor.description'),
      category: translate('governmentDepartments.departments.labor.category'),
      features: [
        translate('governmentDepartments.departments.labor.features.0'),
        translate('governmentDepartments.departments.labor.features.1'),
        translate('governmentDepartments.departments.labor.features.2')
      ],
      contact: {
        address: translate('governmentDepartments.departments.labor.contact.address'),
        phone: translate('governmentDepartments.departments.labor.contact.phone'),
        email: translate('governmentDepartments.departments.labor.contact.email'),
        website: translate('governmentDepartments.departments.labor.contact.website')
      }
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          {translate('governmentDepartments.title')}
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center" paragraph sx={{ mb: 6 }}>
          {translate('governmentDepartments.subtitle')}
        </Typography>

        {/* Search Bar */}
        <Paper sx={{ p: 2, mb: 6, display: 'flex', alignItems: 'center' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
          <TextField
            fullWidth
            placeholder={translate('governmentDepartments.searchPlaceholder')}
            variant="standard"
            sx={{ ml: 1, flex: 1 }}
          />
        </Paper>

        {/* Departments Grid */}
        <Grid container spacing={4}>
          {departments.map((dept, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {dept.icon}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {dept.title}
                      </Typography>
                      <Chip label={dept.category} color="primary" size="small" />
                    </Box>
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {dept.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {dept.features.map((feature, idx) => (
                      <Typography key={idx} variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        • {feature}
                      </Typography>
                    ))}
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {translate('governmentDepartments.contactInfo')}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{dept.contact.address}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PhoneIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{dept.contact.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmailIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{dept.contact.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LanguageIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{dept.contact.website}</Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    {translate('governmentDepartments.visitWebsite')}
                  </Button>
                  <Button size="small" color="primary">
                    {translate('governmentDepartments.contact')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Need Help Section */}
        <Paper sx={{ p: 4, mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {translate('governmentDepartments.needHelp.title')}
          </Typography>
          <Typography color="text.secondary" paragraph>
            {translate('governmentDepartments.needHelp.description')}
          </Typography>
          <Button variant="contained" color="primary" size="large">
            {translate('governmentDepartments.needHelp.button')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default GovernmentDepartments; 