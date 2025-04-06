import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  Alert,
  Divider,
  TextField,
  Tabs,
  Tab,
  Collapse,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Event as EventIcon,
  Group as GroupIcon,
  ManageAccounts as ManageAccountsIcon,
  Article as ArticleIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { getEvents, createEvent } from '../store/slices/eventSlice';
import axios from '../utils/axios';
import InitiativeForm from '../components/admin/InitiativeForm';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 3,
      boxShadow: 3,
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 6,
      },
    }}
  >
    <CardContent sx={{ width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: `${color}.lighter`,
            borderRadius: 2,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ fontSize: 32, color: `${color}.main` }} />
        </Box>
      </Box>
      <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 0);
  const [initiatives, setInitiatives] = useState([]);
  const [showInitiativeForm, setShowInitiativeForm] = useState(false);
  const [editingInitiative, setEditingInitiative] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    description: '',
    location: '',
    district: '',
    date: '',
    time: '',
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Stats
  const stats = {
    totalUsers: users.length,
    totalEvents: events.length,
    officials: users.filter((user) => user.role === 'Official_member').length,
    activeDistricts: [...new Set(events.map((event) => event.district))].length,
  };

  const isAdmin = user?.role === 'admin';
  const isOfficialMember = user?.role === 'Official_member';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', err);
      }
    };

    // Only fetch users if the user is an admin
    if (user?.role === 'admin') {
    fetchUsers();
    }
    
    dispatch(getEvents({}));
    const fetchInitiatives = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/initiatives');
        setInitiatives(response.data);
      } catch (err) {
        console.error('Error fetching initiatives:', err);
        setError('Failed to load initiatives');
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, [dispatch, user]);

  useEffect(() => {
    // Update the active tab when redirected from /create-event
    if (location.state?.activeTab !== undefined) {
      setActiveTab(location.state.activeTab);
      // Clear location state after using it
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleEditUser = (user) => {
    setEditUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditUser(null);
    setOpenDialog(false);
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`/users/${editUser._id}/role`, {
        role: editUser.role,
        officialRole: editUser.officialRole
      });

      if (response.data) {
        setUsers(
          users.map((user) =>
            user._id === editUser._id ? { ...user, ...response.data } : user
          )
        );
        handleCloseDialog();
      }
    } catch (err) {
      setError('Failed to update user');
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDeleteInitiative = async (id) => {
    if (!window.confirm('Are you sure you want to delete this initiative?')) return;
    
    try {
      await axios.delete(`/initiatives/${id}`);
      setInitiatives(initiatives.filter(init => init._id !== id));
    } catch (err) {
      console.error('Error deleting initiative:', err);
      setError('Failed to delete initiative');
    }
  };

  const handleEditInitiative = (initiative) => {
    setEditingInitiative(initiative);
    setShowInitiativeForm(true);
  };

  const handleInitiativeSubmit = async (formData) => {
    try {
      const url = editingInitiative 
        ? `/initiatives/${editingInitiative._id}`
        : '/initiatives';
      
      const method = editingInitiative ? 'put' : 'post';
      const response = await axios[method](url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Refresh the initiatives list after submission
      const fetchLatestInitiatives = async () => {
        try {
          const refreshResponse = await axios.get('/initiatives');
          setInitiatives(refreshResponse.data);
        } catch (err) {
          console.error('Error refreshing initiatives:', err);
        }
      };
      
      // Show success message
      setAlert({
        open: true,
        message: editingInitiative 
          ? 'Initiative updated successfully! Changes are now visible to users.' 
          : 'New initiative added successfully! It is now visible in its respective category.',
        severity: 'success'
      });
      
      // Refresh data
      fetchLatestInitiatives();
      
      setShowInitiativeForm(false);
      setEditingInitiative(null);
      return response.data;
    } catch (err) {
      console.error('Error saving initiative:', err);
      setAlert({
        open: true,
        message: `Failed to save initiative: ${err.response?.data?.message || err.message}`,
        severity: 'error'
      });
      throw err; // Let the form component handle the error too
    }
  };

  const handleCancelInitiative = () => {
    setShowInitiativeForm(false);
    setEditingInitiative(null);
  };
  
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  // Event form handlers
  const handleEventFormChange = (e) => {
    setEventFormData({ ...eventFormData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleReportChange = (e) => {
    setSelectedReports(Array.from(e.target.files));
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    
    if (!eventFormData.title || !eventFormData.description || !eventFormData.location || !eventFormData.date || !eventFormData.time) {
      setError('Please fill all required fields');
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(eventFormData).forEach(key => {
      formDataToSend.append(key, eventFormData[key]);
    });

    selectedImages.forEach(image => {
      formDataToSend.append('images', image);
    });

    selectedReports.forEach(report => {
      formDataToSend.append('reports', report);
    });

    try {
      await dispatch(createEvent(formDataToSend)).unwrap();
      setAlert({
        open: true,
        message: 'Event created successfully!',
        severity: 'success'
      });
      resetEventForm();
      // Refresh events list
      dispatch(getEvents({}));
    } catch (err) {
      console.error('Failed to create event:', err);
      setAlert({
        open: true,
        message: `Failed to create event: ${err.message}`,
        severity: 'error'
      });
    }
  };

  const resetEventForm = () => {
    setEventFormData({
      title: '',
      description: '',
      location: '',
      district: '',
      date: '',
      time: '',
    });
    setSelectedImages([]);
    setSelectedReports([]);
    setImagePreviews([]);
    setShowEventForm(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Alert Snackbar */}
      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

      {/* Header */}
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            {isAdmin ? 'Admin Dashboard' : 'Management Dashboard'} - Sangli
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {isAdmin 
              ? 'Welcome to the administration panel for Sangli' 
              : `Welcome ${user?.name}, you can manage initiatives and events for Sangli here`}
          </Typography>
        </Box>
        {isAdmin && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ManageAccountsIcon />}
            onClick={() => navigate('/admin/officials')}
            sx={{
              py: 1.5,
              px: 3,
              borderRadius: 2,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            Manage Officials
          </Button>
        </Box>
        )}
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {isAdmin && (
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={PersonIcon}
            title="Total Users"
            value={stats.totalUsers}
            color="primary"
          />
        </Grid>
        )}
        <Grid item xs={12} sm={6} md={isAdmin ? 3 : 4}>
          <StatCard
            icon={EventIcon}
            title="Total Events"
            value={stats.totalEvents}
            color="info"
          />
        </Grid>
        {isAdmin && (
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={GroupIcon}
            title="Officials"
            value={stats.officials}
            color="success"
          />
        </Grid>
        )}
        <Grid item xs={12} sm={6} md={isAdmin ? 3 : 4}>
          <StatCard
            icon={ArticleIcon}
            title="Outreach Locations in Sangli"
            value={stats.activeDistricts}
            color="warning"
          />
        </Grid>
        {!isAdmin && (
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={GroupIcon}
              title="Your Role"
              value={user?.officialRole || "Official Member"}
              color="success"
            />
          </Grid>
        )}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {isAdmin && <Tab label="Users" />}
          <Tab label="Initiatives" />
          <Tab label="Events" />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      {isAdmin && activeTab === 0 && (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 4 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {/* Users Table */}
          <TableContainer 
            component={Paper}
            sx={{ 
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'hidden'
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Role</TableCell>
                  <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow 
                    key={user._id}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'action.hover' 
                      }
                    }}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.role === 'Official_member' ? user.officialRole : user.role}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditUser(user)}
                        title="Edit User"
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteUser(user._id)}
                        title="Delete User"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainer>
      )}

      {((isAdmin && activeTab === 1) || (!isAdmin && activeTab === 0)) && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Initiatives Management
          </Typography>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 2 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            startIcon={showInitiativeForm ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={() => setShowInitiativeForm(!showInitiativeForm)}
            sx={{ mb: 2 }}
          >
            {showInitiativeForm ? 'Hide Form' : 'Add Initiative'}
          </Button>

          <Collapse in={showInitiativeForm}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <InitiativeForm
                initialData={editingInitiative}
                onSubmit={handleInitiativeSubmit}
                onCancel={handleCancelInitiative}
              />
            </Paper>
          </Collapse>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Sub-Category</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <CircularProgress size={24} />
                    </TableCell>
                  </TableRow>
                ) : initiatives.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No initiatives found
                    </TableCell>
                  </TableRow>
                ) : (
                  initiatives.map((initiative) => (
                    <TableRow key={initiative._id}>
                      <TableCell>{initiative.title}</TableCell>
                      <TableCell>{initiative.initiative}</TableCell>
                      <TableCell>{initiative.subCategory}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleEditInitiative(initiative)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteInitiative(initiative._id)}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {((isAdmin && activeTab === 2) || (!isAdmin && activeTab === 1)) && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Events Management
          </Typography>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 2 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            startIcon={showEventForm ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={() => setShowEventForm(!showEventForm)}
            sx={{ mb: 2 }}
          >
            {showEventForm ? 'Hide Form' : 'Create Event'}
          </Button>

          <Collapse in={showEventForm}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Create New Event
              </Typography>

              <Box component="form" onSubmit={handleEventSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Event Title"
                      name="title"
                      value={eventFormData.title}
                      onChange={handleEventFormChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Description"
                      name="description"
                      value={eventFormData.description}
                      onChange={handleEventFormChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="Location"
                      name="location"
                      value={eventFormData.location}
                      onChange={handleEventFormChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="District"
                      name="district"
                      value={eventFormData.district}
                      onChange={handleEventFormChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
                      Event Date and Time
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Event Date"
                      name="date"
                      type="date"
                      value={eventFormData.date}
                      onChange={handleEventFormChange}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Event Time"
                      name="time"
                      type="time"
                      value={eventFormData.time}
                      onChange={handleEventFormChange}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Event Images
                      </Typography>
                      <input
                        accept="image/*"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          sx={{ mb: 2 }}
                        >
                          Upload Images
                        </Button>
                      </label>
                      <Grid container spacing={2}>
                        {imagePreviews.map((preview, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box sx={{ position: 'relative' }}>
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                style={{
                                  width: '100%',
                                  height: '200px',
                                  objectFit: 'cover',
                                  borderRadius: '4px',
                                }}
                              />
                              <Button
                                size="small"
                                color="error"
                                onClick={() => removeImage(index)}
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                }}
                              >
                                Remove
                              </Button>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Event Reports
                      </Typography>
                      <input
                        accept=".pdf,.doc,.docx"
                        type="file"
                        multiple
                        onChange={handleReportChange}
                        style={{ display: 'none' }}
                        id="report-upload"
                      />
                      <label htmlFor="report-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          sx={{ mb: 2 }}
                        >
                          Upload Reports
                        </Button>
                      </label>
                      <Box>
                        {selectedReports.map((report, index) => (
                          <Typography key={index} variant="body2">
                            {report.name}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={resetEventForm}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                      >
                        {loading ? 'Creating Event...' : 'Create Event'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Collapse>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <CircularProgress size={24} />
                    </TableCell>
                  </TableRow>
                ) : events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No events found
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event) => (
                    <TableRow key={event._id}>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                      <TableCell>{event.time || "Not set"}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>{event.createdBy?.name || 'Unknown'}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => navigate(`/events/${event._id}/edit`)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this event?')) {
                              axios.delete(`/events/${event._id}`)
                                .then(() => {
                                  dispatch(getEvents({}));
                                  setAlert({
                                    open: true,
                                    message: 'Event deleted successfully',
                                    severity: 'success'
                                  });
                                })
                                .catch(err => {
                                  console.error('Error deleting event:', err);
                                  setAlert({
                                    open: true,
                                    message: 'Failed to delete event',
                                    severity: 'error'
                                  });
                                });
                            }
                          }}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
        </TableContainer>
        </Box>
      )}

      {/* Edit User Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          px: 3,
          py: 2,
          backgroundColor: 'primary.main',
          color: 'common.white'
        }}>
          Edit User Role
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 4 }}>
          <FormControl fullWidth sx={{ mb: editUser?.role === 'Official_member' ? 2 : 0 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={editUser?.role || ''}
              label="Role"
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="Official_member">Official Member</MenuItem>
            </Select>
          </FormControl>
          
          {editUser?.role === 'Official_member' && (
            <TextField
              fullWidth
              label="Official Role/Designation"
              value={editUser?.officialRole || ''}
              onChange={(e) => setEditUser({ ...editUser, officialRole: e.target.value })}
              required
              placeholder="e.g., Collector Office Sangli"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ 
          px: 3, 
          py: 2,
          borderTop: 1,
          borderColor: 'divider'
        }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdateUser} 
            variant="contained"
            color="primary"
            sx={{ 
              borderRadius: 2,
              px: 3
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 