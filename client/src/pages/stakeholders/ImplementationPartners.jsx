import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, CardActions, Button, TextField, Chip, IconButton, Tooltip, useTheme } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import LaunchIcon from '@mui/icons-material/Launch';

const ImplementationPartners = () => {
  const theme = useTheme();
  const { translate, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPartners, setFilteredPartners] = useState([]);

  const partners = [
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('implementationPartners.partners.healthcare.title'),
      description: translate('implementationPartners.partners.healthcare.description'),
      category: translate('implementationPartners.partners.healthcare.category'),
      features: [
        translate('implementationPartners.partners.healthcare.features.0'),
        translate('implementationPartners.partners.healthcare.features.1'),
        translate('implementationPartners.partners.healthcare.features.2')
      ],
      contact: {
        address: translate('implementationPartners.partners.healthcare.contact.address'),
        phone: translate('implementationPartners.partners.healthcare.contact.phone'),
        email: translate('implementationPartners.partners.healthcare.contact.email'),
        website: translate('implementationPartners.partners.healthcare.contact.website')
      }
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('implementationPartners.partners.education.title'),
      description: translate('implementationPartners.partners.education.description'),
      category: translate('implementationPartners.partners.education.category'),
      features: [
        translate('implementationPartners.partners.education.features.0'),
        translate('implementationPartners.partners.education.features.1'),
        translate('implementationPartners.partners.education.features.2')
      ],
      contact: {
        address: translate('implementationPartners.partners.education.contact.address'),
        phone: translate('implementationPartners.partners.education.contact.phone'),
        email: translate('implementationPartners.partners.education.contact.email'),
        website: translate('implementationPartners.partners.education.contact.website')
      }
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('implementationPartners.partners.counseling.title'),
      description: translate('implementationPartners.partners.counseling.description'),
      category: translate('implementationPartners.partners.counseling.category'),
      features: [
        translate('implementationPartners.partners.counseling.features.0'),
        translate('implementationPartners.partners.counseling.features.1'),
        translate('implementationPartners.partners.counseling.features.2')
      ],
      contact: {
        address: translate('implementationPartners.partners.counseling.contact.address'),
        phone: translate('implementationPartners.partners.counseling.contact.phone'),
        email: translate('implementationPartners.partners.counseling.contact.email'),
        website: translate('implementationPartners.partners.counseling.contact.website')
      }
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('implementationPartners.partners.community.title'),
      description: translate('implementationPartners.partners.community.description'),
      category: translate('implementationPartners.partners.community.category'),
      features: [
        translate('implementationPartners.partners.community.features.0'),
        translate('implementationPartners.partners.community.features.1'),
        translate('implementationPartners.partners.community.features.2')
      ],
      contact: {
        address: translate('implementationPartners.partners.community.contact.address'),
        phone: translate('implementationPartners.partners.community.contact.phone'),
        email: translate('implementationPartners.partners.community.contact.email'),
        website: translate('implementationPartners.partners.community.contact.website')
      }
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          {translate('implementationPartners.title')}
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center" paragraph sx={{ mb: 6 }}>
          {translate('implementationPartners.subtitle')}
        </Typography>

        {/* Search Bar */}
        <Paper sx={{ p: 2, mb: 6, display: 'flex', alignItems: 'center' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
          <TextField
            fullWidth
            placeholder={translate('implementationPartners.searchPlaceholder')}
            variant="standard"
            sx={{ ml: 1, flex: 1 }}
          />
        </Paper>

        {/* Partners Grid */}
        <Grid container spacing={4}>
          {partners.map((partner, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {partner.icon}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {partner.title}
                      </Typography>
                      <Chip label={partner.category} color="primary" size="small" />
                    </Box>
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {partner.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {partner.features.map((feature, idx) => (
                      <Typography key={idx} variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        • {feature}
                      </Typography>
                    ))}
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {translate('implementationPartners.contactInfo')}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{partner.contact.address}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PhoneIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{partner.contact.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmailIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{partner.contact.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LanguageIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{partner.contact.website}</Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    href={partner.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LaunchIcon />}
                  >
                    {translate('implementationPartners.visitWebsite')}
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    href={`tel:${partner.contact.phone}`}
                    startIcon={<PhoneIcon />}
                  >
                    {translate('implementationPartners.contact')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Need Help Section */}
        <Paper sx={{ p: 4, mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {translate('implementationPartners.needHelp.title')}
          </Typography>
          <Typography color="text.secondary" paragraph>
            {translate('implementationPartners.needHelp.description')}
          </Typography>
          <Button variant="contained" color="primary" size="large">
            {translate('implementationPartners.needHelp.button')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ImplementationPartners; 