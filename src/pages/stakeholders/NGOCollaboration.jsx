import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, CardActions, Button, TextField, Chip, IconButton, Tooltip } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useTheme } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';

const NGOCollaboration = () => {
  const theme = useTheme();
  const { translate, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNGOs, setFilteredNGOs] = useState([]);

  const ngos = [
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('ngoCollaboration.ngos.volunteer.title'),
      description: translate('ngoCollaboration.ngos.volunteer.description'),
      category: translate('ngoCollaboration.ngos.volunteer.category'),
      features: [
        translate('ngoCollaboration.ngos.volunteer.features.0'),
        translate('ngoCollaboration.ngos.volunteer.features.1'),
        translate('ngoCollaboration.ngos.volunteer.features.2')
      ],
      contact: {
        address: translate('ngoCollaboration.ngos.volunteer.contact.address'),
        phone: translate('ngoCollaboration.ngos.volunteer.contact.phone'),
        email: translate('ngoCollaboration.ngos.volunteer.contact.email'),
        website: translate('ngoCollaboration.ngos.volunteer.contact.website')
      }
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('ngoCollaboration.ngos.counseling.title'),
      description: translate('ngoCollaboration.ngos.counseling.description'),
      category: translate('ngoCollaboration.ngos.counseling.category'),
      features: [
        translate('ngoCollaboration.ngos.counseling.features.0'),
        translate('ngoCollaboration.ngos.counseling.features.1'),
        translate('ngoCollaboration.ngos.counseling.features.2')
      ],
      contact: {
        address: translate('ngoCollaboration.ngos.counseling.contact.address'),
        phone: translate('ngoCollaboration.ngos.counseling.contact.phone'),
        email: translate('ngoCollaboration.ngos.counseling.contact.email'),
        website: translate('ngoCollaboration.ngos.counseling.contact.website')
      }
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('ngoCollaboration.ngos.education.title'),
      description: translate('ngoCollaboration.ngos.education.description'),
      category: translate('ngoCollaboration.ngos.education.category'),
      features: [
        translate('ngoCollaboration.ngos.education.features.0'),
        translate('ngoCollaboration.ngos.education.features.1'),
        translate('ngoCollaboration.ngos.education.features.2')
      ],
      contact: {
        address: translate('ngoCollaboration.ngos.education.contact.address'),
        phone: translate('ngoCollaboration.ngos.education.contact.phone'),
        email: translate('ngoCollaboration.ngos.education.contact.email'),
        website: translate('ngoCollaboration.ngos.education.contact.website')
      }
    },
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: translate('ngoCollaboration.ngos.healthcare.title'),
      description: translate('ngoCollaboration.ngos.healthcare.description'),
      category: translate('ngoCollaboration.ngos.healthcare.category'),
      features: [
        translate('ngoCollaboration.ngos.healthcare.features.0'),
        translate('ngoCollaboration.ngos.healthcare.features.1'),
        translate('ngoCollaboration.ngos.healthcare.features.2')
      ],
      contact: {
        address: translate('ngoCollaboration.ngos.healthcare.contact.address'),
        phone: translate('ngoCollaboration.ngos.healthcare.contact.phone'),
        email: translate('ngoCollaboration.ngos.healthcare.contact.email'),
        website: translate('ngoCollaboration.ngos.healthcare.contact.website')
      }
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          {translate('ngoCollaboration.title')}
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center" paragraph sx={{ mb: 6 }}>
          {translate('ngoCollaboration.subtitle')}
        </Typography>

        {/* Search Bar */}
        <Paper sx={{ p: 2, mb: 6, display: 'flex', alignItems: 'center' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
          <TextField
            fullWidth
            placeholder={translate('ngoCollaboration.searchPlaceholder')}
            variant="standard"
            sx={{ ml: 1, flex: 1 }}
          />
        </Paper>

        {/* NGOs Grid */}
        <Grid container spacing={4}>
          {ngos.map((ngo, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {ngo.icon}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {ngo.title}
                      </Typography>
                      <Chip label={ngo.category} color="primary" size="small" />
                    </Box>
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {ngo.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {ngo.features.map((feature, idx) => (
                      <Typography key={idx} variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        • {feature}
                      </Typography>
                    ))}
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {translate('ngoCollaboration.contactInfo')}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{ngo.contact.address}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PhoneIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{ngo.contact.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmailIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{ngo.contact.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LanguageIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{ngo.contact.website}</Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    {translate('ngoCollaboration.visitWebsite')}
                  </Button>
                  <Button size="small" color="primary">
                    {translate('ngoCollaboration.contact')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Need Help Section */}
        <Paper sx={{ p: 4, mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {translate('ngoCollaboration.needHelp.title')}
          </Typography>
          <Typography color="text.secondary" paragraph>
            {translate('ngoCollaboration.needHelp.description')}
          </Typography>
          <Button variant="contained" color="primary" size="large">
            {translate('ngoCollaboration.needHelp.button')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NGOCollaboration; 