import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const initiatives = {
  rehabilitation: {
    title: 'Rehabilitation Centers',
    subItems: [
      'Free medical treatment and counseling',
      'Residential rehabilitation programs',
      'Aftercare and follow-up services'
    ]
  },
  outreach: {
    title: 'Community Outreach',
    subItems: [
      'Street plays and awareness campaigns',
      'Community support groups',
      'Family counseling services'
    ]
  },
  education: {
    title: 'Education Programs',
    subItems: [
      'School prevention programs',
      'Peer education initiatives',
      'Teacher training workshops'
    ]
  },
  policy: {
    title: 'Policy Measures',
    subItems: [
      'Actions Taken',
      'NCord',
      'Anti-drug Task Force',
      'NDPS Act'
    ]
  }
};

// Add server URL configuration
const SERVER_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:5000';

const InitiativeForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    initiative: '',
    subCategory: '',
    title: '',
    description: '',
    content: '',
    images: [],
    videos: [],
    documents: [],
    audio: [],
    listItems: []
  });

  const [newListItem, setNewListItem] = useState('');
  const [imagePreview, setImagePreview] = useState([]);
  const [videoPreview, setVideoPreview] = useState([]);
  const [audioPreview, setAudioPreview] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      console.log('Initial Data received:', initialData);
      
      setFormData({
        initiative: initialData.initiative || '',
        subCategory: initialData.subCategory || '',
        title: initialData.title || '',
        description: initialData.description || '',
        content: initialData.content || '',
        images: initialData.images || [],
        videos: initialData.videos || [],
        documents: initialData.documents || [],
        audio: initialData.audio || [],
        listItems: initialData.listItems || []
      });

      // Set up image previews for existing images
      if (initialData.images?.length > 0) {
        console.log('Setting up image previews for:', initialData.images);
        const existingImagePreviews = initialData.images.map(file => {
          let url;
          if (file.path) {
            // Handle different path formats
            if (file.path.startsWith('http')) {
              url = file.path;
            } else if (file.path.startsWith('/')) {
              url = `${SERVER_URL}${file.path}`;
            } else if (file.path.startsWith('uploads/')) {
              url = `${SERVER_URL}/${file.path}`;
            } else {
              url = `${SERVER_URL}/uploads/${file.path}`;
            }
          } else if (file.url) {
            url = file.url;
          } else {
            console.error('Invalid file data:', file);
            return null;
          }

          console.log('Generated image URL:', url);
          
          return {
            file,
            url,
            isExisting: true,
            name: file.originalname || file.name || 'Image'
          };
        }).filter(Boolean);

        console.log('Setting image previews:', existingImagePreviews);
        setImagePreview(existingImagePreviews);
      }

      // Set up video previews for existing videos
      if (initialData.videos?.length > 0) {
        console.log('Setting up video previews for:', initialData.videos);
        const existingVideoPreviews = initialData.videos.map(file => {
          let url;
          if (file.path) {
            // Handle different path formats
            if (file.path.startsWith('http')) {
              url = file.path;
            } else if (file.path.startsWith('/')) {
              url = `${SERVER_URL}${file.path}`;
            } else if (file.path.startsWith('uploads/')) {
              url = `${SERVER_URL}/${file.path}`;
            } else {
              url = `${SERVER_URL}/uploads/${file.path}`;
            }
          } else if (file.url) {
            url = file.url;
          } else {
            console.error('Invalid file data:', file);
            return null;
          }

          console.log('Generated video URL:', url);
          
          return {
            file,
            url,
            isExisting: true,
            name: file.originalname || file.name || 'Video'
          };
        }).filter(Boolean);

        console.log('Setting video previews:', existingVideoPreviews);
        setVideoPreview(existingVideoPreviews);
      }

      // Set up audio previews for existing audio files
      if (initialData.audio?.length > 0) {
        console.log('Setting up audio previews for:', initialData.audio);
        const existingAudioPreviews = initialData.audio.map(file => {
          let url;
          if (file.path) {
            // Handle different path formats
            if (file.path.startsWith('http')) {
              url = file.path;
            } else if (file.path.startsWith('/')) {
              url = `${SERVER_URL}${file.path}`;
            } else if (file.path.startsWith('uploads/')) {
              url = `${SERVER_URL}/${file.path}`;
            } else {
              url = `${SERVER_URL}/uploads/${file.path}`;
            }
          } else if (file.url) {
            url = file.url;
          } else {
            console.error('Invalid file data:', file);
            return null;
          }

          console.log('Generated audio URL:', url);
          
          return {
            file,
            url,
            isExisting: true,
            name: file.originalname || file.name || 'Audio'
          };
        }).filter(Boolean);

        console.log('Setting audio previews:', existingAudioPreviews);
        setAudioPreview(existingAudioPreviews);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'initiative') {
      setFormData({
        ...formData,
        [name]: value,
        subCategory: '',
        listItems: []
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024;
      
      if (!isValidType) {
        setError(`Invalid file type: ${file.name}. Only images (JPG, PNG, GIF) are allowed.`);
        return false;
      }
      if (!isValidSize) {
        setError(`File too large: ${file.name}. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...validFiles]
      }));

      const newPreviews = validFiles.map(file => ({
        file,
        url: URL.createObjectURL(file),
        isExisting: false
      }));
      setImagePreview(prev => [...prev, ...newPreviews]);
    }
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('video/');
      const isValidSize = file.size <= 10 * 1024 * 1024;
      
      if (!isValidType) {
        setError(`Invalid file type: ${file.name}. Only videos (MP4, WebM) are allowed.`);
        return false;
      }
      if (!isValidSize) {
        setError(`File too large: ${file.name}. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        videos: [...prev.videos, ...validFiles]
      }));

      const newPreviews = validFiles.map(file => ({
        file,
        url: URL.createObjectURL(file),
        isExisting: false
      }));
      setVideoPreview(prev => [...prev, ...newPreviews]);
    }
  };

  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files);
    console.log('Document files selected:', files);
    
    const validFiles = files.filter(file => {
      const isValidType = file.type === 'application/pdf' ||
                         file.type === 'application/msword' ||
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isValidType) {
        setError(`Invalid file type: ${file.name}. Only documents (PDF, DOC, DOCX) are allowed.`);
        return false;
      }
      if (!isValidSize) {
        setError(`File too large: ${file.name}. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      console.log('Adding valid document files:', validFiles);
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...validFiles]
      }));
    }
  };

  const handleAudioChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('audio/');
      const isValidSize = file.size <= 10 * 1024 * 1024;
      
      if (!isValidType) {
        setError(`Invalid file type: ${file.name}. Only audio files (MP3, WAV, OGG, AAC) are allowed.`);
        return false;
      }
      if (!isValidSize) {
        setError(`File too large: ${file.name}. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        audio: [...prev.audio, ...validFiles]
      }));

      const newPreviews = validFiles.map(file => ({
        file,
        url: URL.createObjectURL(file),
        isExisting: false,
        name: file.name
      }));
      setAudioPreview(prev => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index) => {
    const preview = imagePreview[index];
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));

    if (!preview.isExisting) {
      URL.revokeObjectURL(preview.url);
    }
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveVideo = (index) => {
    const preview = videoPreview[index];
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));

    if (!preview.isExisting) {
      URL.revokeObjectURL(preview.url);
    }
    setVideoPreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveAudio = (index) => {
    const preview = audioPreview[index];
    setFormData(prev => ({
      ...prev,
      audio: prev.audio.filter((_, i) => i !== index)
    }));

    if (!preview.isExisting) {
      URL.revokeObjectURL(preview.url);
    }
    setAudioPreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddListItem = () => {
    if (newListItem.trim()) {
      setFormData({
        ...formData,
        listItems: [...formData.listItems, newListItem.trim()]
      });
      setNewListItem('');
    }
  };

  const handleRemoveListItem = (index) => {
    setFormData({
      ...formData,
      listItems: formData.listItems.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Update state to handle loading during submission
      setLoading(true);
      
      // Create form data
      const formDataObj = new FormData();
      
      // Log detailed information about the initiative being submitted
      console.log('Submitting initiative with details:');
      console.log('- Category (initiative):', formData.initiative);
      console.log('- Subcategory:', formData.subCategory);
      console.log('- Title:', formData.title);
      
      // Add text fields
      formDataObj.append('initiative', formData.initiative);
      formDataObj.append('subCategory', formData.subCategory);
      formDataObj.append('title', formData.title);
      formDataObj.append('description', formData.description);
      formDataObj.append('content', formData.content);
      formDataObj.append('listItems', JSON.stringify(formData.listItems));
      
      // Add existing files
      formDataObj.append('existingImages', JSON.stringify(imagePreview.filter(img => img.isExisting).map(img => img.file)));
      formDataObj.append('existingVideos', JSON.stringify(videoPreview.filter(vid => vid.isExisting).map(vid => vid.file)));
      formDataObj.append('existingAudio', JSON.stringify(audioPreview.filter(aud => aud.isExisting).map(aud => aud.file)));
      
      // Filter existing documents (those with path property)
      const existingDocs = formData.documents.filter(doc => doc.path || doc.isExisting);
      console.log('Existing documents to keep:', existingDocs);
      formDataObj.append('existingDocuments', JSON.stringify(existingDocs));
      
      // Add new files
      imagePreview.filter(img => !img.isExisting).forEach(img => {
        console.log('Adding new image:', img.file);
        formDataObj.append('files', img.file);
      });
      
      videoPreview.filter(vid => !vid.isExisting).forEach(vid => {
        console.log('Adding new video:', vid.file);
        formDataObj.append('files', vid.file);
      });
      
      // Add new audio files
      audioPreview.filter(aud => !aud.isExisting).forEach(aud => {
        console.log('Adding new audio:', aud.file);
        formDataObj.append('files', aud.file);
      });

      // Submit form
      const response = await onSubmit(formDataObj);
      
      // Signal success to parent component
      console.log('Initiative saved successfully:', response);
      console.log('Initiative will appear under category:', response.initiative, 'and subcategory:', response.subCategory);
      
      // Set success message
      setSuccessMessage('Initiative saved successfully! It will now appear in the appropriate category and subcategory pages.');
      
      // Reset form after short delay for user to see success message
      setTimeout(() => {
        setLoading(false);
        // Optional: refresh the page to show the new content
        if (!initialData) {
          window.location.reload();
        }
      }, 2000);
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred while saving the initiative');
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderImagePreview = (preview, index) => {
    console.log('Rendering image preview:', preview);
    return (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 1, 
            position: 'relative',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.default'
          }}
        >
          <Box
            sx={{
              height: '160px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <img 
              src={preview.url} 
              alt={preview.name || `Preview ${index}`}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              onError={(e) => {
                console.error('Image load error for:', preview.url);
                e.target.onerror = null;
                e.target.src = '/placeholder-image.jpg';
              }}
              onLoad={() => console.log('Image loaded successfully:', preview.url)}
            />
          </Box>
          <Typography 
            variant="caption" 
            noWrap 
            sx={{ 
              mt: 1, 
              width: '100%', 
              textAlign: 'center' 
            }}
          >
            {preview.name || `Image ${index + 1}`}
          </Typography>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
            }}
            onClick={() => handleRemoveImage(index)}
          >
            <DeleteIcon sx={{ color: 'white' }} />
          </IconButton>
        </Paper>
      </Grid>
    );
  };

  const renderVideoPreview = (preview, index) => {
    console.log('Rendering video preview:', preview);
    return (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 1, 
            position: 'relative',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.default'
          }}
        >
          <Box
            sx={{
              height: '160px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <video 
              src={preview.url}
              controls
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              onError={(e) => {
                console.error('Video load error for:', preview.url);
                e.target.onerror = null;
                e.target.poster = '/placeholder-video.jpg';
              }}
              onLoadedData={() => console.log('Video loaded successfully:', preview.url)}
            />
          </Box>
          <Typography 
            variant="caption" 
            noWrap 
            sx={{ 
              mt: 1, 
              width: '100%', 
              textAlign: 'center' 
            }}
          >
            {preview.name || `Video ${index + 1}`}
          </Typography>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
            }}
            onClick={() => handleRemoveVideo(index)}
          >
            <DeleteIcon sx={{ color: 'white' }} />
          </IconButton>
        </Paper>
      </Grid>
    );
  };

  const renderAudioPreview = () => {
    console.log('Rendering audio previews:', audioPreview);
    return (
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Audio Files
        </Typography>
        <Box sx={{ mb: 2 }}>
          <input
            accept="audio/*"
            id="audio-upload"
            type="file"
            multiple
            onChange={handleAudioChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="audio-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload Audio
            </Button>
          </label>
        </Box>
        
        {audioPreview.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <List dense>
              {audioPreview.map((audio, index) => (
                <ListItem
                  key={index}
                  sx={{
                    mb: 1,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <AudiotrackIcon color="primary" sx={{ mr: 2 }} />
                    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                      <Typography variant="body2" noWrap component="div">
                        {audio.name || audio.file.name}
                      </Typography>
                      <audio controls src={audio.url} style={{ maxWidth: '100%', marginTop: '8px' }} />
                    </Box>
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => handleRemoveAudio(index)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    );
  };

  const renderDocumentPreview = () => {
    console.log('Rendering document previews:', formData.documents);
    return (
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {formData.documents.map((doc, index) => {
          // Get document name (handle both file objects and saved document objects)
          const docName = doc.originalname || doc.filename || (doc.name ? doc.name : `Document ${index + 1}`);
          // Get document size
          const docSize = doc.size ? formatFileSize(doc.size) : '';
          
          console.log('Document info:', { docName, docSize, doc });
          
          return (
            <Grid item xs={12} key={index}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: 'background.default'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InsertDriveFileIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle2">{docName}</Typography>
                    {docSize && <Typography variant="caption" color="text.secondary">{docSize}</Typography>}
                  </Box>
                </Box>
                <IconButton
                  onClick={() => handleRemoveDocument(index)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box>
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <Typography variant="h6" gutterBottom>
        {initialData ? 'Edit Initiative' : 'Add New Initiative'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="initiative-label">Initiative Category</InputLabel>
              <Select
                labelId="initiative-label"
                id="initiative"
                name="initiative"
                value={formData.initiative}
                onChange={handleChange}
                required
                label="Initiative Category"
              >
                {Object.keys(initiatives).map((key) => (
                  <MenuItem key={key} value={key}>
                    {initiatives[key].title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={!formData.initiative}>
              <InputLabel id="subCategory-label">Sub Category</InputLabel>
              <Select
                labelId="subCategory-label"
                id="subCategory"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                label="Sub Category"
              >
                {formData.initiative && initiatives[formData.initiative].subItems.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="title"
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="content"
              name="content"
              label="Content"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={5}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Images
              </Typography>
              <Box sx={{ mb: 2 }}>
                <input
                  accept="image/*"
                  id="image-upload"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Images
                  </Button>
                </label>
              </Box>

              {imagePreview.length > 0 && (
                <Grid container spacing={2}>
                  {imagePreview.map((preview, index) => renderImagePreview(preview, index))}
                </Grid>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Videos
              </Typography>
              <Box sx={{ mb: 2 }}>
                <input
                  accept="video/*"
                  id="video-upload"
                  type="file"
                  multiple
                  onChange={handleVideoChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="video-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Videos
                  </Button>
                </label>
              </Box>

              {videoPreview.length > 0 && (
                <Grid container spacing={2}>
                  {videoPreview.map((preview, index) => renderVideoPreview(preview, index))}
                </Grid>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Documents
              </Typography>
              <Box sx={{ mb: 2 }}>
                <input
                  accept=".pdf,.doc,.docx"
                  id="document-upload"
                  type="file"
                  multiple
                  onChange={handleDocumentChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="document-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Documents
                  </Button>
                </label>
              </Box>

              {formData.documents.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  {renderDocumentPreview()}
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            {renderAudioPreview()}
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                List Items
              </Typography>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  id="new-list-item"
                  name="newListItem"
                  label="New Item"
                  value={newListItem}
                  onChange={(e) => setNewListItem(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddListItem();
                    }
                  }}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleAddListItem}
                  sx={{ ml: 1 }}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              {formData.listItems.length > 0 ? (
                <List>
                  {formData.listItems.map((item, index) => (
                    <ListItem key={index} divider>
                      <ListItemText primary={item} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveListItem(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" align="center">
                  No list items added yet
                </Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {initialData ? 'Update' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default InitiativeForm; 