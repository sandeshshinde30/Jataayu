import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Divider,
  Breadcrumbs,
  Link,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import axios from '../utils/axios';

const ManageOfficials = () => {
  const [officials, setOfficials] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    officialRole: '',
  });
  const [error, setError] = useState('');
  const { translate } = useLanguage();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchOfficials();
    }
  }, [user]);

  const fetchOfficials = async () => {
    try {
      const response = await axios.get('/users/officials');
      setOfficials(response.data);
    } catch (err) {
      console.error('Error fetching officials:', err);
    }
  };

  const handleOpenDialog = (official = null) => {
    if (official) {
      setSelectedOfficial(official);
      setFormData({
        name: official.name,
        email: official.email,
        password: '',
        officialRole: official.officialRole || '',
      });
    } else {
      setSelectedOfficial(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        officialRole: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (selectedOfficial) {
        // Update existing official
        await axios.put(`/users/officials/${selectedOfficial._id}`, {
          name: formData.name,
          email: formData.email,
          password: formData.password || undefined,
          officialRole: formData.officialRole,
        });
      } else {
        // Create new official
        await axios.post('/auth/create-official', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          officialRole: formData.officialRole,
          // Don't send role, server will enforce the correct role
        });
      }
      handleCloseDialog();
      fetchOfficials();
    } catch (err) {
      console.error('Error handling official:', err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this official member?')) {
      try {
        await axios.delete(`/users/officials/${id}`);
        fetchOfficials();
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error deleting official';
        setError(errorMessage);
        console.error('Error deleting official:', err);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mb: 3 }}
      >
        <Link 
          component={RouterLink} 
          to="/admin" 
          color="inherit" 
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Admin Dashboard
        </Link>
        <Typography color="text.primary">Manage Officials</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          backgroundColor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Manage Official Members
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add, edit, or remove official members of the organization
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
          startIcon={<PersonAddIcon />}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          Add Official Member
        </Button>
      </Box>

      {/* Table */}
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
              <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Official Role</TableCell>
              <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {officials.map((official) => (
              <TableRow 
                key={official._id}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'action.hover' 
                  }
                }}
              >
                <TableCell sx={{ fontSize: '1rem' }}>{official.name}</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>{official.email}</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>{official.officialRole || '-'}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleOpenDialog(official)}
                    title="Edit Official Member"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(official._id)}
                    title="Delete Official Member"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
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
          {selectedOfficial
            ? 'Edit Official Member'
            : 'Add New Official Member'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ px: 3, py: 4 }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 1
                }}
              >
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Official Role/Designation"
              name="officialRole"
              value={formData.officialRole}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
              placeholder="e.g., Collector Office Sangli, Chief Executive Officer ZP Sangli"
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required={!selectedOfficial}
              helperText={selectedOfficial ? "Leave blank to keep current password" : ""}
              variant="outlined"
            />
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
              type="submit" 
              variant="contained" 
              color="primary"
              sx={{ 
                borderRadius: 2,
                px: 3
              }}
            >
              {selectedOfficial ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default ManageOfficials; 