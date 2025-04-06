import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Grid,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { getEvent, updateEvent, getEvents } from '../store/slices/eventSlice';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentEvent: event, loading, error } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
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
  const [existingImages, setExistingImages] = useState([]);
  const [existingReports, setExistingReports] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(getEvent(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        location: event.location || '',
        district: event.district || '',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        time: event.time || '',
      });
      setExistingImages(event.images || []);
      setExistingReports(event.reports || []);
    }
  }, [event]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const removeExistingReport = (index) => {
    setExistingReports(existingReports.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!formData.title || !formData.description || !formData.location || !formData.date) {
      setFormError('Please fill in all required fields');
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('district', formData.district);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('time', formData.time);

      // Add existing images that weren't removed (send their IDs)
      const remainingImages = existingImages.map(img => img._id);
      formDataToSend.append('existingImages', JSON.stringify(remainingImages));
      
      // Add existing reports that weren't removed (send their IDs)
      const remainingReports = existingReports.map(report => report._id);
      formDataToSend.append('existingReports', JSON.stringify(remainingReports));

      // Add new images
      if (selectedImages.length > 0) {
        selectedImages.forEach(image => {
          formDataToSend.append('images', image);
        });
      }

      // Add new reports
      if (selectedReports.length > 0) {
        selectedReports.forEach(report => {
          formDataToSend.append('reports', report);
        });
      }

      // Log form data for debugging
      console.log('Submitting form data:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      // Dispatch update action
      const result = await dispatch(updateEvent({ id, formData: formDataToSend })).unwrap();
      
      if (result) {
        // Force refresh the events list
        await dispatch(getEvents({}));
        // Navigate back to event details
        navigate(`/events/${id}`);
      }
    } catch (err) {
      console.error('Update error:', err);
      setFormError(err.message || 'Failed to update event. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Edit Event
        </Typography>

        {(error || formError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || formError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
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
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="District"
                name="district"
                value={formData.district}
                onChange={handleChange}
                disabled={user?.role === 'block_officer'}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Event Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Event Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Existing Images
                </Typography>
                <Grid container spacing={2}>
                  {existingImages.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box sx={{ position: 'relative' }}>
                        <img
                          src={image.url}
                          alt={`Event ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeExistingImage(index)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Add New Images
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
                    startIcon={<CloudUploadIcon />}
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
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeImage(index)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Existing Documents
                </Typography>
                <Grid container spacing={2}>
                  {existingReports.map((report, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2" noWrap>
                          {report.filename}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeExistingReport(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Add New Documents
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
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Documents
                  </Button>
                </label>
                {selectedReports.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Selected documents:
                    </Typography>
                    {selectedReports.map((file, index) => (
                      <Typography key={index} variant="body2">
                        {file.name}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/events/${id}`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Event'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditEvent; 