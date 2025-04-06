import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  ImageList,
  ImageListItem,
  Chip,
  Divider,
  Alert,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn,
  Person,
  Description,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  InsertDriveFile as FileIcon,
  Close as CloseIcon,
  ZoomIn as ZoomInIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { getEvent, deleteEvent } from '../store/slices/eventSlice';
import { useLanguage } from '../context/LanguageContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentEvent: event, loading, error } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  const { translate, language } = useLanguage();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(getEvent(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm(translate('common.confirmDelete') || 'Are you sure you want to delete this event?')) {
      try {
        await dispatch(deleteEvent(id)).unwrap();
        navigate('/events');
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      // Use appropriate locale based on current language
      { en: 'en-US', mr: 'mr-IN' }[language] || 'en-US', 
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getFileIcon = (mimetype) => {
    if (mimetype.includes('pdf')) return <PdfIcon />;
    if (mimetype.includes('word') || mimetype.includes('document')) return <DocIcon />;
    return <FileIcon />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };

  const getMimeType = (filename) => {
    const ext = getFileExtension(filename);
    const mimeTypes = {
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    return mimeTypes[ext] || 'application/octet-stream';
  };

  const handleDownloadDocument = async (fileUrl, filename) => {
    try {
      // For downloads, use the fl_attachment flag
      const downloadUrl = fileUrl
        .replace('/upload/', '/upload/fl_attachment/');
      
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const file = new Blob([blob], { type: getMimeType(filename) });
      const url = window.URL.createObjectURL(file);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      // Fallback to direct download
      window.open(fileUrl.replace('/upload/', '/upload/fl_attachment/'), '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/events')}>
              {translate('events.backToEvents')}
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert 
          severity="warning" 
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/events')}>
              {translate('events.backToEvents')}
            </Button>
          }
        >
          {translate('events.eventNotFound')}
        </Alert>
      </Container>
    );
  }

  const canModifyEvent =
    user &&
    (user.role === 'admin' ||
      (user.role === 'block_officer' && event.createdBy._id === user.id) ||
      (user.role === 'Official_member' && event.createdBy._id === user.id));

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          borderRadius: 2,
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
        }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {event.title} - Sangli
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="body1">
                  {formatDate(event.date)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="body1">
                  {event.time || "Time not specified"}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1 }} color="primary" />
                <Typography variant="body1">
                  Sangli - {event.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1 }} color="primary" />
                <Typography variant="body1">
                  {translate('events.organizedBy')}: {event.createdBy.name}
                </Typography>
              </Box>
            </Grid>
            {canModifyEvent && (
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/events/${id}/edit`)}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  {translate('common.edit')} {translate('events.event')}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  {translate('common.delete')} {translate('events.event')}
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Description Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            <Description sx={{ mr: 1 }} />
            {translate('events.description')}
          </Typography>
          <Typography 
            variant="body1" 
            paragraph
            sx={{
              lineHeight: 1.8,
              color: 'text.secondary',
            }}
          >
            {event.description}
          </Typography>
        </Box>

        {/* Images Section */}
        {event.images && event.images.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
              }}
            >
              {translate('events.eventPhotos')}
            </Typography>
            <ImageList
              sx={{ 
                width: '100%', 
                height: 'auto',
                borderRadius: 2,
                overflow: 'hidden',
              }}
              cols={3}
              gap={16}
            >
              {event.images.map((image, index) => (
                <ImageListItem 
                  key={index} 
                  onClick={() => handleImageClick(image)}
                  sx={{ 
                    cursor: 'pointer',
                    height: '250px',
                    overflow: 'hidden',
                    borderRadius: 2,
                    boxShadow: 1,
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'scale(1.02)',
                      transition: 'all 0.3s ease',
                    }
                  }}
                >
                  <img
                    src={image.url}
                    alt={`Event photo ${index + 1}`}
                    loading="lazy"
                    style={{ 
                      height: '100%', 
                      width: '100%', 
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      padding: '8px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                    }}
                  >
                    <ZoomInIcon sx={{ mr: 1 }} />
                    {translate('common.view')}
                  </Box>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}

        {/* Image Zoom Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Fade in={openModal}>
            <Box
              sx={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                outline: 'none',
              }}
            >
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                  },
                  zIndex: 10,
                }}
              >
                <CloseIcon />
              </IconButton>
              {selectedImage && (
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src={selectedImage.url}
                    alt={`Photo from event: ${event.title}`}
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '90vw',
                      maxHeight: '80vh',
                      objectFit: 'contain',
                      display: 'block',
                      backgroundColor: '#000',
                    }}
                  />
                  {/* Gradient overlay to mask placeholder text in development images */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '40%', // Cover more of the image where the text appears
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)',
                      pointerEvents: 'none', // Allow clicks to pass through
                    }}
                  />
                  {/* Caption overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '12px',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="subtitle1">
                      {event.title}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Fade>
        </Modal>

        {/* Documents Section */}
        {event.reports && event.reports.length > 0 && (
          <Box>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 2,
              }}
            >
              {translate('events.eventDocuments')}
            </Typography>
            <List sx={{ width: '100%' }}>
              {event.reports.map((report, index) => (
                <Card 
                  key={index}
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        flex: 1,
                      }}>
                        {getFileIcon(report.mimetype)}
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {report.filename}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatFileSize(report.size)} • {getFileExtension(report.filename).toUpperCase()}
                          </Typography>
                        </Box>
                      </Box>
                      <CardActions>
                        <Tooltip title={`${translate('common.download')} ${getFileExtension(report.filename).toUpperCase()} ${translate('common.document')}`}>
                          <IconButton 
                            color="primary"
                            onClick={() => handleDownloadDocument(report.fileUrl, report.filename)}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default EventDetails; 