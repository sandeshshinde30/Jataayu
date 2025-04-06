import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Share as ShareIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import axios from '../utils/axios';

const EventRegistrations = () => {
  const { eventId } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareDialog, setShareDialog] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchRegistrations();
    fetchUsers();
  }, [eventId]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/event-registrations/event/${eventId}`);
      setRegistrations(response.data);
    } catch (err) {
      setError('Failed to fetch registrations');
      console.error('Error fetching registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users/officials');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleStatusChange = async (registrationId, newStatus) => {
    try {
      await axios.put(`/event-registrations/${registrationId}/status`, {
        status: newStatus
      });
      fetchRegistrations();
    } catch (err) {
      setError('Failed to update status');
      console.error('Error updating status:', err);
    }
  };

  const handleShareClick = (registration) => {
    setSelectedRegistration(registration);
    setShareDialog(true);
  };

  const handleShareSubmit = async () => {
    try {
      await axios.post(`/event-registrations/share/${selectedRegistration._id}`, {
        userIds: selectedUsers
      });
      setShareDialog(false);
      setSelectedRegistration(null);
      setSelectedUsers([]);
      fetchRegistrations();
    } catch (err) {
      setError('Failed to share registration');
      console.error('Error sharing registration:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'warning';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Event Registrations
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrations.map((registration) => (
              <TableRow key={registration._id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon color="action" />
                    {registration.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <div>{registration.email}</div>
                    <div>{registration.phone}</div>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <div>{registration.village}, {registration.taluka}</div>
                    <div>{registration.district}</div>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={registration.status}
                    color={getStatusColor(registration.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Approve">
                      <IconButton
                        color="success"
                        onClick={() => handleStatusChange(registration._id, 'approved')}
                        disabled={registration.status === 'approved'}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reject">
                      <IconButton
                        color="error"
                        onClick={() => handleStatusChange(registration._id, 'rejected')}
                        disabled={registration.status === 'rejected'}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share">
                      <IconButton
                        color="primary"
                        onClick={() => handleShareClick(registration)}
                      >
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Share Dialog */}
      <Dialog open={shareDialog} onClose={() => setShareDialog(false)}>
        <DialogTitle>Share Registration</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Users</InputLabel>
            <Select
              multiple
              value={selectedUsers}
              onChange={(e) => setSelectedUsers(e.target.value)}
              label="Select Users"
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name} ({user.role})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleShareSubmit}
            disabled={selectedUsers.length === 0}
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventRegistrations; 