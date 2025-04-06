import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Pagination,
  Paper,
  Avatar,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Search as SearchIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  HowToReg as RegisterIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';
import axios from '../utils/axios';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import RegistrationsPDF from '../components/RegistrationsPDF';

const Events = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { translate, getPageTitle } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [viewType, setViewType] = useState('all'); // 'all' or 'my-events'
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [registrationDialog, setRegistrationDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    district: '',
    taluka: '',
    village: '',
    additionalInfo: '',
  });
  const [registrationError, setRegistrationError] = useState('');
  const [showRegistrationsPDF, setShowRegistrationsPDF] = useState(false);
  const [selectedEventForPDF, setSelectedEventForPDF] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const type = activeTab === 0 ? 'upcoming' : 'past';
      const response = await axios.get(`/events?type=${type}&page=${page}&search=${searchQuery}`);
      setEvents(response.data.events);
      setTotalPages(response.data.totalPages);
      setError('');
    } catch (err) {
      setError('Failed to fetch events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const type = activeTab === 0 ? 'upcoming' : 'past';
      const response = await axios.get(`/events/my-events?type=${type}&page=${page}`);
      setEvents(response.data.events);
      setTotalPages(response.data.totalPages);
      setError('');
    } catch (err) {
      setError('Failed to fetch your events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (viewType === 'my-events') {
      fetchMyEvents();
    } else {
      fetchEvents();
    }
  }, [activeTab, page, searchQuery, viewType]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
  };

  const handleViewTypeChange = (event, newValue) => {
    setViewType(newValue);
    setPage(1);
  };

  const handleSearch = debounce((value) => {
    setSearchQuery(value);
    setPage(1);
  }, 500);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setRegistrationDialog(true);
  };

  const handleRegistrationSubmit = async () => {
    try {
      setRegistrationError('');
      const response = await axios.post('/event-registrations', {
        ...registrationForm,
        event: selectedEvent._id
      });
      setRegistrationDialog(false);
      setRegistrationForm({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        address: '',
        district: '',
        taluka: '',
        village: '',
        additionalInfo: ''
      });
      // Show success message
      setError('Registration successful!');
    } catch (err) {
      setRegistrationError(err.response?.data?.message || 'Failed to register');
    }
  };

  const handleRegistrationChange = (e) => {
    setRegistrationForm({
      ...registrationForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateStatus = async (registrationId, status) => {
    try {
      const response = await axios.put(`/event-registrations/${registrationId}/status`, { status });
      // Show success message
      setError('Status updated successfully!');
      // Refresh events
      fetchEvents();
    } catch (err) {
      setError('Failed to update status');
      console.error(err);
    }
  };

  const handleShowRegistrations = (event) => {
    setSelectedEventForPDF(event);
    setShowRegistrationsPDF(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {getPageTitle('events.title')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          {viewType === 'my-events' 
            ? translate('events.myEventsDescription') 
            : activeTab === 0 
              ? `${translate('events.upcomingDescription')} in Sangli`
              : `${translate('events.pastDescription')} in Sangli`}
      </Typography>
      </Box>

      {/* Search and Filter Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={user ? 4 : 6}>
            <TextField
              fullWidth
              placeholder={translate('events.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>
          {user && (
            <Grid item xs={12} md={4}>
              <Tabs
                value={viewType}
                onChange={handleViewTypeChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': {
                    fontWeight: 'bold',
                  }
                }}
              >
                <Tab value="all" label={translate('events.allEvents')} />
                <Tab value="my-events" label={translate('events.myEvents')} />
              </Tabs>
            </Grid>
          )}
          <Grid item xs={12} md={user ? 4 : 6}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 'bold',
                }
              }}
            >
              <Tab value={0} label={translate('events.upcoming')} />
              <Tab value={1} label={translate('events.past')} />
            </Tabs>
          </Grid>
        </Grid>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity={error.includes('successful') ? 'success' : 'error'} sx={{ mb: 4, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Events Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
          {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  {/* Event Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.images?.[0]?.url || '/default-event.jpg'}
                    alt={event.title}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />

                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {event.title}
                    </Typography>
                    
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      <Chip 
                        icon={<CalendarIcon />} 
                        label={format(new Date(event.date), 'PPP')}
                        color="primary"
                        variant="outlined"
                        sx={{ 
                          borderRadius: 1,
                          fontWeight: 'medium',
                        }}
                      />
                      <Chip 
                        icon={<AccessTimeIcon />} 
                        label={event.time || "Not specified"}
                        color="primary"
                        variant="outlined"
                        sx={{ 
                          borderRadius: 1,
                          fontWeight: 'medium',
                        }}
                      />
                      <Chip 
                        icon={<LocationIcon />} 
                        label={`Sangli - ${event.location}`}
                        color="secondary"
                        variant="outlined"
                        sx={{ 
                          borderRadius: 1,
                          fontWeight: 'medium',
                        }}
                      />
                    </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mb: 2,
                    }}
                  >
                    {event.description}
                  </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Creator Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar 
                        src={event.createdBy?.profilePicture} 
                        alt={event.createdBy?.name}
                        sx={{ width: 32, height: 32 }}
                      >
                        {event.createdBy?.name?.[0]}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary">
                        {translate('events.createdBy')} {event.createdBy?.name || translate('events.unknownCreator')}
                      </Typography>
                    </Box>

                    {viewType === 'my-events' && (
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          {translate('events.registrationsCount')}: {event.registrationCount || 0}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          fullWidth
                          onClick={() => handleShowRegistrations(event)}
                          startIcon={<AssignmentIcon />}
                          sx={{
                            borderRadius: 1,
                            textTransform: 'none',
                            fontWeight: 'bold',
                          }}
                        >
                          {translate('events.showRegistrations')}
                        </Button>
                      </Box>
                    )}
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate(`/events/${event._id}`)}
                    sx={{
                      borderRadius: 1,
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    {translate('events.viewDetails')}
                  </Button>
                  </CardActions>

                  {/* Show register button only in All Events view for non-logged in users */}
                  {viewType === 'all' && !user && activeTab === 0 && (
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<RegisterIcon />}
                        onClick={() => handleRegisterClick(event)}
                        sx={{
                          borderRadius: 1,
                          textTransform: 'none',
                          fontWeight: 'bold',
                        }}
                      >
                        {translate('events.register')}
                      </Button>
                    </CardActions>
                  )}
              </Card>
            </Grid>
          ))}
        </Grid>

          {/* No Events Message */}
          {events.length === 0 && (
            <Paper 
              elevation={0} 
              sx={{ 
                textAlign: 'center', 
                py: 8,
                background: 'linear-gradient(145deg, #f5f5f5, #ffffff)',
                borderRadius: 2,
              }}
            >
              <EventIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                {searchQuery
                  ? translate('events.noEventsSearch')
                  : `${translate('events.noEvents')} ${activeTab === 0 ? translate('events.upcoming').toLowerCase() : translate('events.past').toLowerCase()}`}
              </Typography>
            </Paper>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: 1,
                  }
                }}
              />
            </Box>
          )}
        </>
      )}

      {/* Registrations PDF Dialog */}
      <Dialog
        open={showRegistrationsPDF}
        onClose={() => setShowRegistrationsPDF(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {translate('events.registrationsFor')} {selectedEventForPDF?.title}
            </Typography>
            <IconButton onClick={() => setShowRegistrationsPDF(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedEventForPDF && (
            <RegistrationsPDF
              event={selectedEventForPDF}
              registrations={selectedEventForPDF.registrations || []}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Registration Dialog */}
      <Dialog 
        open={registrationDialog} 
        onClose={() => setRegistrationDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedEvent?.title ? `${translate('events.registerFor')} ${selectedEvent.title} in Sangli` : 'Register for Event in Sangli'}</DialogTitle>
        <DialogContent>
          {registrationError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {registrationError}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={registrationForm.name}
                onChange={handleRegistrationChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={registrationForm.email}
                onChange={handleRegistrationChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={registrationForm.phone}
                onChange={handleRegistrationChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={registrationForm.age}
                onChange={handleRegistrationChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={registrationForm.gender}
                  onChange={handleRegistrationChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={registrationForm.address}
                onChange={handleRegistrationChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="District"
                name="district"
                value={registrationForm.district}
                onChange={handleRegistrationChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Taluka"
                name="taluka"
                value={registrationForm.taluka}
                onChange={handleRegistrationChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Village"
                name="village"
                value={registrationForm.village}
                onChange={handleRegistrationChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Information"
                name="additionalInfo"
                value={registrationForm.additionalInfo}
                onChange={handleRegistrationChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRegistrationDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleRegistrationSubmit}
            disabled={!registrationForm.name || !registrationForm.email || !registrationForm.phone || 
                     !registrationForm.age || !registrationForm.gender || !registrationForm.address || 
                     !registrationForm.district || !registrationForm.taluka || !registrationForm.village}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Events; 