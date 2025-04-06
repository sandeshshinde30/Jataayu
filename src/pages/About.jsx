import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import PolicyIcon from '@mui/icons-material/Policy';
import GavelIcon from '@mui/icons-material/Gavel';
import { useLanguage } from '../context/LanguageContext';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const InitiativeCard = styled(Paper)(({ theme, active }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  transition: 'all 0.3s ease',
  border: '2px solid',
  borderColor: active === 'true' ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.08)',
  borderRadius: '16px',
  backgroundColor: active === 'true' ? 'rgba(46, 125, 50, 0.08)' : theme.palette.background.paper,
  boxShadow: active === 'true' ? '0 0 20px rgba(46, 125, 50, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  }
}));

const IconWrapper = styled(Box)(({ theme, active }) => ({
  backgroundColor: active === 'true' ? theme.palette.primary.dark : theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: '50%',
  width: '64px',
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  '& svg': {
    fontSize: '32px',
  }
}));

const subinitiativeToSlug = {
  'Free medical treatment and counseling': 'free-medical-treatment',
  'Residential rehabilitation programs': 'residential-programs',
  'Aftercare and follow-up services': 'aftercare-services',
  'Street plays and awareness campaigns': 'street-plays',
  'Community support groups': 'community-support',
  'Family counseling services': 'family-counseling',
  'School prevention programs': 'school-prevention',
  'Peer education initiatives': 'peer-education',
  'Teacher training workshops': 'teacher-training',
  'Actions Taken': 'actions-taken',
  'NCord': 'ncord',
  'Anti-drug Task Force': 'anti-drug-taskforce',
  'NDPS Act': 'ndps-act',
  'Drug Prevention Measures': 'drug-prevention'
};

const About = () => {
  const { translate, getPageTitle } = useLanguage();
  const location = useLocation();
  const rehabilitationRef = useRef(null);
  const outreachRef = useRef(null);
  const educationRef = useRef(null);
  const policyRef = useRef(null);

  const getCurrentSection = () => {
    const path = location.pathname.split('/');
    if (path[1] === 'initiatives') {
      return path[2] || '';
    }
    return '';
  };

  useEffect(() => {
    const section = getCurrentSection();
    const refs = {
      rehabilitation: rehabilitationRef,
      outreach: outreachRef,
      education: educationRef,
      policy: policyRef
    };

    if (section && refs[section]?.current) {
      refs[section].current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [location]);

  const currentSection = getCurrentSection();

  const initiatives = [
    {
      ref: rehabilitationRef,
      id: 'rehabilitation',
      title: translate('about.initiatives.rehabilitation.title'),
      description: translate('about.initiatives.rehabilitation.description'),
      icon: <LocalHospitalIcon />,
      items: [
        translate('about.initiatives.rehabilitation.points.0'),
        translate('about.initiatives.rehabilitation.points.1'),
        translate('about.initiatives.rehabilitation.points.2')
      ]
    },
    {
      ref: outreachRef,
      id: 'outreach',
      title: translate('about.initiatives.community.title'),
      description: translate('about.initiatives.community.description'),
      icon: <GroupsIcon />,
      items: [
        translate('about.initiatives.community.points.0'),
        translate('about.initiatives.community.points.1'),
        translate('about.initiatives.community.points.2')
      ]
    },
    {
      ref: educationRef,
      id: 'education',
      title: translate('about.initiatives.education.title'),
      description: translate('about.initiatives.education.description'),
      icon: <SchoolIcon />,
      items: [
        translate('about.initiatives.education.points.0'),
        translate('about.initiatives.education.points.1'),
        translate('about.initiatives.education.points.2')
      ]
    },
    {
      ref: policyRef,
      id: 'policy',
      title: translate('about.initiatives.policy.title'),
      description: translate('about.initiatives.policy.description'),
      icon: <GavelIcon />,
      items: [
        { text: translate('about.initiatives.policy.points.0'), link: '/initiatives/policy/actions' },
        {
          title: translate('about.initiatives.policy.drugPrevention'),
          subItems: [
            { text: translate('about.initiatives.policy.ncord'), link: '/initiatives/policy/ncord' },
            { text: translate('about.initiatives.policy.taskforce'), link: '/initiatives/policy/taskforce' },
            { text: translate('about.initiatives.policy.ndps'), link: '/initiatives/policy/ndps' }
          ]
        }
      ]
    }
  ];

  // Create a mapping of translation keys to original English strings for the slugs
  const originalItemTexts = {
    'rehabilitation': [
      'Free medical treatment and counseling',
      'Residential rehabilitation programs',
      'Aftercare and follow-up services'
    ],
    'outreach': [
      'Street plays and awareness campaigns',
      'Community support groups',
      'Family counseling services'
    ],
    'education': [
      'School prevention programs',
      'Peer education initiatives',
      'Teacher training workshops'
    ],
    'policy': [
      'Actions Taken',
      'Drug Prevention Measures'
    ]
  };

  // Create a mapping of English strings to translation keys
  const getInitiativeItemTranslationKey = (initiativeId, itemIndex) => {
    return `about.initiatives.${initiativeId === 'outreach' ? 'community' : initiativeId}.points.${itemIndex}`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Mission Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          {getPageTitle('about.title')}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph align="center">
          {translate('about.subtitle')} {translate('common.in')} {translate('common.locations.sangli')}
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mt: 4 }}>
          {translate('about.description')}
        </Typography>
      </Box>

      <Divider sx={{ mb: 8 }} />

      {/* Government Initiatives */}
      <Typography variant="h4" component="h2" gutterBottom align="center">
        {translate('about.initiatives.title')} {translate('common.in')} {translate('common.locations.sangli')}
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {initiatives.map((initiative) => (
          <Grid item xs={12} md={6} key={initiative.id}>
            <InitiativeCard
              ref={initiative.ref}
              active={(currentSection === initiative.id).toString()}
              elevation={currentSection === initiative.id ? 3 : 1}
            >
              <IconWrapper active={(currentSection === initiative.id).toString()}>
                {initiative.icon}
              </IconWrapper>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 2
                }}
              >
                {initiative.title}
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                paragraph
                sx={{ mb: 3 }}
              >
                {initiative.description}
              </Typography>
              <List>
                {initiative.items.map((item, index) => (
                  typeof item === 'string' ? (
                    <ListItem 
                      key={index}
                      component={RouterLink}
                      to={`/initiatives/${initiative.id}/${subinitiativeToSlug[originalItemTexts[initiative.id][index]]}`}
                      sx={{ 
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': { 
                          backgroundColor: 'action.hover',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={translate(getInitiativeItemTranslationKey(initiative.id, index))}
                        primaryTypographyProps={{
                          sx: {
                            color: 'primary.main',
                            fontWeight: 500
                          }
                        }}
                      />
                    </ListItem>
                  ) : item.link ? (
                    <ListItem 
                      key={index}
                      component={RouterLink}
                      to={item.link}
                      sx={{ 
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': { 
                          backgroundColor: 'action.hover',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text}
                        primaryTypographyProps={{
                          sx: {
                            color: 'primary.main',
                            fontWeight: 500
                          }
                        }}
                      />
                    </ListItem>
                  ) : (
                    <Box key={index} sx={{ ml: 2 }}>
                      <ListItem>
                        <ListItemText 
                          primary={item.title}
                          sx={{ fontWeight: 'bold' }}
                        />
                      </ListItem>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItem 
                          key={subIndex} 
                          component={RouterLink}
                          to={subItem.link}
                          sx={{ 
                            pl: 4,
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': { 
                              backgroundColor: 'action.hover',
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={subItem.text}
                            primaryTypographyProps={{
                              sx: {
                                color: 'primary.main',
                                fontWeight: 500
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </Box>
                  )
                ))}
              </List>
            </InitiativeCard>
          </Grid>
        ))}
      </Grid>

      {/* Statistics Section */}
      <Box sx={{ mt: 8, bgcolor: 'grey.100', p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          {translate('about.impact.title')} {translate('common.in')} {translate('common.locations.sangli')}
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" align="center" color="primary">
              {translate('about.impact.centers.number')}
            </Typography>
            <Typography variant="h6" align="center">
              {translate('about.impact.centers.label')} {translate('common.in')} {translate('common.locations.sangli')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" align="center" color="primary">
              {translate('about.impact.lives.number')}
            </Typography>
            <Typography variant="h6" align="center">
              {translate('about.impact.lives.label')} {translate('common.in')} {translate('common.locations.sangli')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" align="center" color="primary">
              10+
            </Typography>
            <Typography variant="h6" align="center">
              Outreach Locations {translate('common.in')} {translate('common.locations.sangli')}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About; 