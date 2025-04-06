import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useScrollTrigger,
  Slide,
  Fade,
  Badge,
  useMediaQuery,
  useTheme,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TranslateIcon from '@mui/icons-material/Translate';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CampaignIcon from '@mui/icons-material/Campaign';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventIcon from '@mui/icons-material/Event';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { logout } from '../../store/slices/authSlice';
import { useLanguage } from '../../context/LanguageContext';
import Logo from '../common/Logo';
import NotificationMenu from '../notifications/NotificationMenu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// Hide navbar on scroll down
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [navbarTransparent, setNavbarTransparent] = useState(true);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const [desktopSubmenuAnchor, setDesktopSubmenuAnchor] = useState(null);
  const [activeDesktopSubmenu, setActiveDesktopSubmenu] = useState(null);

  // Use language context
  const { language, setLanguage, translate } = useLanguage();

  const menuItems = [
    {
      key: 'home',
      label: translate('nav.home'),
      icon: <HomeIcon />,
      path: '/'
    },
    {
      key: 'about',
      label: translate('nav.about'),
      icon: <InfoIcon />,
      submenu: [
        { label: translate('nav.aboutOverview'), path: '/about' },
        { label: translate('nav.aboutMission'), path: '/about/mission' },
        { label: translate('nav.aboutObjectives'), path: '/about/objectives' }
      ]
    },
    {
      key: 'effects',
      label: translate('nav.effects'),
      icon: <HealthAndSafetyIcon />,
      path: '/effects'
    },
    {
      key: 'initiatives',
      label: translate('nav.initiatives'),
      icon: <CampaignIcon />,
      submenu: [
        { label: translate('nav.initiativesRehabilitation'), path: '/initiatives/rehabilitation' },
        { label: translate('nav.initiativesOutreach'), path: '/initiatives/outreach' },
        { label: translate('nav.initiativesEducation'), path: '/initiatives/education' },
        { label: translate('nav.initiativesPolicy'), path: '/initiatives/policy' }
      ]
    },
    {
      key: 'events',
      label: translate('nav.events'),
      icon: <EventIcon />,
      path: '/events'
    },
    {
      key: 'contact',
      label: translate('nav.contact'),
      icon: <ContactMailIcon />,
      submenu: [
        { label: translate('nav.contactDirectory'), path: '/contact/directory' },
        { label: translate('nav.contactHelpline'), path: '/contact/helpline' }
      ]
    }
  ];

  // Make sure navbar is always transparent at first
  useEffect(() => {
    setNavbarTransparent(true);
  }, [location.pathname]);

  // Handle scroll events to change navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (navbarTransparent !== !show) {
        setNavbarTransparent(!show);
      }
    };

    setNavbarTransparent(true);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navbarTransparent]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLangMenu = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    handleCloseLangMenu();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  const handleMobileSubmenuClick = (menuKey) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === menuKey ? null : menuKey);
  };

  const handleDesktopSubmenuOpen = (event, menuKey) => {
    setDesktopSubmenuAnchor(event.currentTarget);
    setActiveDesktopSubmenu(menuKey);
  };

  const handleDesktopSubmenuClose = () => {
    setDesktopSubmenuAnchor(null);
    setActiveDesktopSubmenu(null);
  };

  const authPages = [
    { title: translate('nav.dashboard'), path: '/dashboard' },
  ];

  const settings = [
    { title: translate('nav.profile'), path: '/dashboard' },
    { title: translate('nav.logout'), onClick: handleLogout },
  ];

  if (user?.role === 'admin') {
    authPages.push(
      { title: translate('nav.admin'), path: '/admin' },
      { title: translate('nav.createEvent'), path: '/events/create' }
    );
  } else if (user?.role === 'Official_member') {
    authPages.push({ title: translate('nav.management'), path: '/management' });
  }

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        elevation={navbarTransparent ? 0 : 2}
        sx={{
          background: navbarTransparent 
            ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)' 
            : 'white',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
          '& .MuiToolbar-root': {
            minHeight: { xs: '64px', md: '70px' },
            px: { xs: 1.5, sm: 2 }
          }
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo - Desktop */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                mr: 4,
                display: { xs: 'none', md: 'flex' },
                textDecoration: 'none',
                alignItems: 'center'
              }}
            >
              <Logo size="medium" />
            </Box>

            {/* Mobile menu icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ transform: 'scale(1.2)' }}
              >
                <MenuIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
            </Box>

            {/* Logo - Mobile */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                textDecoration: 'none',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Logo size="small" />
            </Box>

            {/* Mobile Menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {
                handleCloseNavMenu();
                setMobileSubmenuOpen(null);
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  width: '100%',
                  maxWidth: '300px',
                  position: 'absolute',
                  top: '56px !important',
                  left: '0 !important',
                  borderRadius: '0 0 4px 4px',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  backgroundColor: 'white',
                  zIndex: 1500
                }
              }}
            >
              {menuItems.map((item) => (
                <div key={item.key}>
                  {item.submenu ? (
                    <>
                      <MenuItem
                        onClick={() => handleMobileSubmenuClick(item.key)}
                        selected={mobileSubmenuOpen === item.key}
                        sx={{
                          py: 1.5,
                          px: 2,
                          minHeight: '48px',
                          '&:hover': {
                            backgroundColor: 'rgba(46, 125, 50, 0.08)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(46, 125, 50, 0.12)',
                          }
                        }}
                      >
                        <ListItemIcon sx={{ 
                          color: mobileSubmenuOpen === item.key ? 'primary.main' : 'text.primary',
                          minWidth: '40px'
                        }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.label}
                          primaryTypographyProps={{
                            fontWeight: mobileSubmenuOpen === item.key ? 600 : 400
                          }}
                        />
                      </MenuItem>
                      <Box
                        sx={{
                          display: mobileSubmenuOpen === item.key ? 'block' : 'none',
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          borderLeft: '4px solid',
                          borderColor: 'primary.main'
                        }}
                      >
                        {item.submenu.map((subItem) => (
                          <MenuItem
                            key={subItem.path}
                            component={RouterLink}
                            to={subItem.path}
                            onClick={() => {
                              handleCloseNavMenu();
                              setMobileSubmenuOpen(null);
                            }}
                            selected={location.pathname === subItem.path}
                            sx={{
                              py: 1.25,
                              pl: 6,
                              pr: 2,
                              minHeight: '42px',
                              '&:hover': {
                                backgroundColor: 'rgba(46, 125, 50, 0.08)',
                              },
                              '&.Mui-selected': {
                                backgroundColor: 'rgba(46, 125, 50, 0.12)',
                              }
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: location.pathname === subItem.path ? 600 : 400,
                                color: location.pathname === subItem.path ? 'primary.main' : 'inherit',
                                fontSize: '0.9rem'
                              }}
                            >
                              {subItem.label}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Box>
                    </>
                  ) : (
                    <MenuItem
                      component={RouterLink}
                      to={item.path}
                      onClick={handleCloseNavMenu}
                      selected={location.pathname === item.path}
                      sx={{
                        py: 1.5,
                        px: 2,
                        minHeight: '48px',
                        '&:hover': {
                          backgroundColor: 'rgba(46, 125, 50, 0.08)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(46, 125, 50, 0.12)',
                        }
                      }}
                    >
                      <ListItemIcon sx={{ 
                        color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                        minWidth: '40px'
                      }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: location.pathname === item.path ? 600 : 400
                        }}
                      />
                    </MenuItem>
                  )}
                </div>
              ))}
            </Menu>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {menuItems.map((item) => (
                <div key={item.key}>
                  {item.submenu ? (
                    <Button
                      onClick={(e) => handleDesktopSubmenuOpen(e, item.key)}
                      sx={{ 
                        my: 2, 
                        mx: 1,
                        color: activeDesktopSubmenu === item.key ? 'primary.main' : 'text.primary',
                        backgroundColor: activeDesktopSubmenu === item.key ? 'rgba(46, 125, 50, 0.08)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: activeDesktopSubmenu === item.key ? 600 : 400,
                        fontSize: '0.95rem',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(46, 125, 50, 0.08)',
                          color: 'primary.main'
                        }
                      }}
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <Button
                      component={RouterLink}
                      to={item.path}
                      onClick={handleCloseNavMenu}
                      sx={{ 
                        my: 2, 
                        mx: 1,
                        color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                        backgroundColor: location.pathname === item.path ? 'rgba(46, 125, 50, 0.08)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: location.pathname === item.path ? 600 : 400,
                        fontSize: '0.95rem',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(46, 125, 50, 0.08)',
                          color: 'primary.main'
                        }
                      }}
                    >
                      {item.label}
                    </Button>
                  )}
                </div>
              ))}
            </Box>

            {/* Desktop Submenu */}
            <Popper
              open={Boolean(desktopSubmenuAnchor)}
              anchorEl={desktopSubmenuAnchor}
              placement="bottom-start"
              transition
              disablePortal
              sx={{
                zIndex: 1500,
                mt: 1,
                display: { xs: 'none', md: 'block' }
              }}
            >
              {({ TransitionProps }) => (
                <Grow 
                  {...TransitionProps}
                  style={{ transformOrigin: 'top left' }}
                  timeout={200}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      borderRadius: '8px',
                      minWidth: '200px',
                      overflow: 'hidden',
                      mt: 0.5,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <ClickAwayListener onClickAway={handleDesktopSubmenuClose}>
                      <Box>
                        {activeDesktopSubmenu && menuItems.find(item => item.key === activeDesktopSubmenu)?.submenu.map((subItem) => (
                          <MenuItem
                            key={subItem.path}
                            component={RouterLink}
                            to={subItem.path}
                            onClick={handleDesktopSubmenuClose}
                            selected={location.pathname === subItem.path}
                            sx={{
                              py: 1.5,
                              px: 3,
                              minHeight: '42px',
                              '&:hover': {
                                backgroundColor: 'rgba(46, 125, 50, 0.08)',
                              },
                              '&.Mui-selected': {
                                backgroundColor: 'rgba(46, 125, 50, 0.12)',
                              }
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: location.pathname === subItem.path ? 600 : 400,
                                color: location.pathname === subItem.path ? 'primary.main' : 'inherit',
                                fontSize: '0.95rem'
                              }}
                            >
                              {subItem.label}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Box>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            {/* Action Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Notifications */}
              {isAuthenticated && (
                <NotificationMenu />
              )}

              {/* Language Toggle */}
              <Tooltip title={translate('nav.changeLanguage')}>
                <IconButton 
                  onClick={handleOpenLangMenu}
                  color="primary"
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'primary.main',
                    padding: '6px',
                    transition: 'all 0.3s ease',
                    '& svg': { fontSize: '1.3rem' },
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <TranslateIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElLang}
                open={Boolean(anchorElLang)}
                onClose={handleCloseLangMenu}
                sx={{ 
                  mt: 1,
                  '& .MuiPaper-root': {
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <MenuItem 
                  onClick={() => handleLanguageChange('en')}
                  selected={language === 'en'}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    }
                  }}
                >
                  <Typography 
                    textAlign="center"
                    sx={{
                      fontWeight: language === 'en' ? 600 : 400,
                      color: language === 'en' ? 'primary.main' : 'inherit'
                    }}
                  >
                    English
                  </Typography>
                </MenuItem>
                <MenuItem 
                  onClick={() => handleLanguageChange('mr')}
                  selected={language === 'mr'}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    }
                  }}
                >
                  <Typography 
                    textAlign="center"
                    sx={{
                      fontWeight: language === 'mr' ? 600 : 400,
                      color: language === 'mr' ? 'primary.main' : 'inherit'
                    }}
                  >
                    मराठी
                  </Typography>
                </MenuItem>
              </Menu>

              {/* User Menu */}
              {isAuthenticated ? (
                <>
                  <Tooltip title={translate('nav.profile')}>
                    <IconButton 
                      onClick={handleOpenUserMenu} 
                      sx={{ 
                        p: 0, 
                        ml: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0 0 12px rgba(46, 125, 50, 0.6)'
                          }
                        }}
                      >
                        {user?.name?.[0]}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ 
                      mt: '45px',
                      '& .MuiPaper-root': {
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.title}
                        onClick={setting.onClick || handleCloseUserMenu}
                        component={setting.path ? RouterLink : 'li'}
                        to={setting.path}
                        sx={{
                          py: 1.5,
                          '&:hover': {
                            backgroundColor: 'rgba(46, 125, 50, 0.08)',
                          }
                        }}
                      >
                        <Typography 
                          textAlign="center"
                          sx={{
                            fontWeight: location.pathname === setting.path ? 600 : 400,
                            color: location.pathname === setting.path ? 'primary.main' : 'inherit'
                          }}
                        >
                          {setting.title}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="contained"
                    color="primary"
                    sx={{ 
                      fontSize: '0.95rem',
                      padding: '6px 20px',
                      boxShadow: '0 4px 20px rgba(46, 125, 50, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 24px rgba(46, 125, 50, 0.4)'
                      }
                    }}
                  >
                    {translate('nav.login')}
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar; 