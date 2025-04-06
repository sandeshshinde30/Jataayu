import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/slices/authSlice';
import { LanguageProvider } from './context/LanguageContext';
import { Box, CircularProgress } from '@mui/material';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import ScrollToTop from './components/layout/ScrollToTop';
import LogoStrip from './components/home/LogoStrip';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import AdminDashboard from './pages/AdminDashboard';
import ManageOfficials from './pages/ManageOfficials';
import NotFound from './pages/NotFound';
import Mission from './pages/about/Mission';
import Treatment from './pages/services/Treatment';
import AwarenessPrograms from './pages/initiatives/AwarenessPrograms';
import Objectives from './pages/about/Objectives';
import Organization from './pages/about/Organization';
import PreventionStrategies from './pages/initiatives/PreventionStrategies';
import RehabilitationCenters from './pages/initiatives/RehabilitationCenters';
import TrainingDevelopment from './pages/initiatives/TrainingDevelopment';
import Counseling from './pages/services/Counseling';
import SupportPrograms from './pages/services/SupportPrograms';
import EmergencyServices from './pages/services/EmergencyServices';
import Publications from './pages/resources/Publications';
import Guidelines from './pages/resources/Guidelines';
import Reports from './pages/resources/Reports';
import Downloads from './pages/resources/Downloads';
import GovernmentDepartments from './pages/stakeholders/GovernmentDepartments';
import ImplementationPartners from './pages/stakeholders/ImplementationPartners';
import NGOCollaboration from './pages/stakeholders/NGOCollaboration';
import Directory from './pages/contact/Directory';
import Helpline from './pages/contact/Helpline';
import Grievance from './pages/contact/Grievance';
import InitiativeCategory from './pages/InitiativeCategory';
import InitiativeDetails from './pages/InitiativeDetails';
import SubInitiativeDetail from './pages/SubInitiativeDetail';
import Effects from './pages/Effects';
import Team from './pages/Team';

// Create enhanced theme with better shadows and palette
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32', // Green 800
      light: '#4caf50', // Green 500
      dark: '#1b5e20', // Green 900
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#66bb6a', // Green 400
      light: '#81c784', // Green 300
      dark: '#388e3c', // Green 700
      contrastText: '#ffffff',
    },
    background: {
      default: '#f1f8e9', // Light Green 50
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
    },
    success: {
      main: '#43a047',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.1)',
    '0 4px 6px rgba(0,0,0,0.12)',
    '0 6px 10px rgba(0,0,0,0.14)',
    '0 8px 12px rgba(0,0,0,0.16)',
    '0 10px 14px rgba(0,0,0,0.18)',
    '0 12px 16px rgba(0,0,0,0.2)',
    '0 14px 18px rgba(0,0,0,0.22)',
    '0 16px 20px rgba(0,0,0,0.24)',
    '0 18px 22px rgba(0,0,0,0.26)',
    '0 20px 24px rgba(0,0,0,0.28)',
    '0 22px 26px rgba(0,0,0,0.3)',
    '0 24px 28px rgba(0,0,0,0.32)',
    '0 26px 30px rgba(0,0,0,0.34)',
    '0 28px 32px rgba(0,0,0,0.36)',
    '0 30px 34px rgba(0,0,0,0.38)',
    '0 32px 36px rgba(0,0,0,0.4)',
    '0 34px 38px rgba(0,0,0,0.42)',
    '0 36px 40px rgba(0,0,0,0.44)',
    '0 38px 42px rgba(0,0,0,0.46)',
    '0 40px 44px rgba(0,0,0,0.48)',
    '0 42px 46px rgba(0,0,0,0.5)',
    '0 44px 48px rgba(0,0,0,0.52)',
    '0 46px 50px rgba(0,0,0,0.54)',
    '0 48px 52px rgba(0,0,0,0.56)',
  ],
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(46, 125, 50, 0.15)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(46, 125, 50, 0.1)',
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          },
        },
      },
    },
  },
});

// Page transition routes component
const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <div className="page-transition">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        
        {/* About Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/about/mission" element={<Mission />} />
        <Route path="/about/objectives" element={<Objectives />} />
        <Route path="/team" element={<Team />} />
        
        {/* Initiatives Routes - redirecting to About page */}
        <Route path="/initiatives/rehabilitation" element={<About />} />
        <Route path="/initiatives/outreach" element={<About />} />
        <Route path="/initiatives/education" element={<About />} />
        <Route path="/initiatives/policy" element={<About />} />
        
        {/* Services Routes */}
        <Route path="/services/treatment" element={<Treatment />} />
        <Route path="/services/counseling" element={<Counseling />} />
        <Route path="/services/support" element={<SupportPrograms />} />
        <Route path="/services/emergency" element={<EmergencyServices />} />
        
        {/* Resources Routes */}
        <Route path="/resources/publications" element={<Publications />} />
        <Route path="/resources/guidelines" element={<Guidelines />} />
        <Route path="/resources/reports" element={<Reports />} />
        <Route path="/resources/downloads" element={<Downloads />} />
        
        {/* Stakeholders Routes */}
        <Route path="/stakeholders/departments" element={<GovernmentDepartments />} />
        <Route path="/stakeholders/partners" element={<ImplementationPartners />} />
        <Route path="/stakeholders/ngos" element={<NGOCollaboration />} />
        
        {/* Contact Routes */}
        <Route path="/contact/directory" element={<Directory />} />
        <Route path="/contact/helpline" element={<Helpline />} />
        
        {/* Event Routes */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route 
          path="/events/:id/edit" 
          element={
            <PrivateRoute element={<EditEvent />} />
          } 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/create-event" 
          element={
            <Navigate to="/management" state={{ activeTab: 1 }} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute element={<Dashboard />} />
          } 
        />
        <Route 
          path="/admin" 
          element={
            <AdminRoute element={<AdminDashboard />} />
          } 
        />
        <Route 
          path="/management" 
          element={
            <AdminRoute element={<AdminDashboard />} />
          } 
        />
        <Route 
          path="/admin/officials" 
          element={
            <AdminRoute element={<ManageOfficials />} />
          } 
        />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Initiatives Routes */}
        <Route path="/initiatives" element={<Navigate to="/" />} />
        <Route path="/initiatives/:category" element={<InitiativeCategory />} />
        {/* Subinitiative Routes - must come before initiative details route */}
        <Route path="/initiatives/:category/:subinitiative" 
               element={<SubInitiativeDetail />} 
               />
        {/* Initiative Detail Route with an explicit pattern to differentiate from subinitiatives */}
        <Route path="/initiatives/:category/detail/:id" element={<InitiativeDetails />} />
        <Route path="/effects" element={<Effects />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// Initialize auth component
const InitializeAuth = ({ children }) => {
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await dispatch(getCurrentUser());
      }
      setIsInitializing(false);
    };

    initializeAuth();
  }, [dispatch]);

  if (isInitializing) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <Router>
          <InitializeAuth>
            <ScrollToTop />
            <Navbar />
            <LogoStrip />
            <AppRoutes />
            <Footer />
          </InitializeAuth>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
