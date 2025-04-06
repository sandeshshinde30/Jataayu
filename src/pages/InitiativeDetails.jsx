import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  useTheme,
  Avatar,
  Breadcrumbs,
  IconButton,
  Fade,
  Grow,
  Slide,
  Zoom,
  Modal,
  Backdrop,
  Tabs,
  Tab
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  CheckCircle as CheckCircleIcon,
  Description as DescriptionIcon,
  Article as ArticleIcon,
  ListAlt as ListAltIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  ArrowBackIos as ArrowBackIosIcon,
  VerifiedUser as VerifiedUserIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  DateRange as DateRangeIcon,
  Category as CategoryIcon,
  Close as CloseIcon,
  ZoomIn as ZoomInIcon,
  PictureAsPdf as PdfIcon,
  VideoLibrary as VideoIcon,
  Image as ImageIcon,
  Audiotrack as AudiotrackIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { API_BASE_URL } from '../config/api';

const SERVER_URL = API_BASE_URL;

const InitiativeDetails = () => {
  const theme = useTheme();
  const { category, id } = useParams();
  const [initiative, setInitiative] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [pdfOpen, setPdfOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState('');
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [mediaTab, setMediaTab] = useState(0);
  const documentsRef = useRef(null);

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to determine file type with improved PDF detection
  const getFileType = (filename, mimetype) => {
    if (!filename && !mimetype) return 'unknown';
    
    console.log('Checking file type for:', filename, 'mimetype:', mimetype);
    
    // First check by mimetype if available - most reliable method
    if (mimetype) {
      if (mimetype.startsWith('image/')) return 'image';
      if (mimetype === 'application/pdf' || mimetype === 'application/x-pdf') return 'pdf';
      if (mimetype.startsWith('video/')) return 'video';
      if (mimetype.startsWith('audio/')) return 'audio';
    }
    
    // Then check by extension as fallback
    if (filename) {
      // Force lowercase and get extension
      const lowerFilename = filename.toLowerCase();
      const ext = lowerFilename.split('.').pop();
      console.log('File extension:', ext);
      
      // Check for common extensions
      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
      if (['pdf'].includes(ext)) return 'pdf';
      if (['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext)) return 'video';
      if (['mp3', 'wav', 'ogg', 'aac', 'm4a'].includes(ext)) return 'audio';
      
      // Additional check for PDFs in the filename
      if (lowerFilename.includes('.pdf')) return 'pdf';
    }
    
    return 'document';
  };

  useEffect(() => {
    const fetchInitiativeDetails = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/initiatives/${id}`);
        if (!response.ok) {
          throw new Error('Initiative not found');
        }
        const data = await response.json();
        setInitiative(data);
        
        // Set animation to complete after a short delay
        setTimeout(() => {
          setAnimationComplete(true);
        }, 300);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiativeDetails();
  }, [id]);

  const nextImage = (e) => {
    e.stopPropagation(); // Prevent triggering lightbox when clicking arrows
    if (initiative?.images?.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === initiative.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = (e) => {
    e.stopPropagation(); // Prevent triggering lightbox when clicking arrows
    if (initiative?.images?.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? initiative.images.length - 1 : prevIndex - 1
      );
    }
  };

  const openLightbox = (imgPath) => {
    setLightboxImage(`${SERVER_URL}/${imgPath}`);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const openPdfViewer = (pdfPath) => {
    setSelectedPdf(`${SERVER_URL}/${pdfPath}`);
    setPdfOpen(true);
  };

  const closePdfViewer = () => {
    setPdfOpen(false);
  };

  const openVideoPlayer = (videoPath) => {
    setSelectedVideo(`${SERVER_URL}/${videoPath}`);
    setVideoOpen(true);
  };

  const closeVideoPlayer = () => {
    setVideoOpen(false);
  };

  const handleMediaTabChange = (event, newValue) => {
    setMediaTab(newValue);
  };

  // Organize documents by type with improved logging
  const organizeDocuments = () => {
    console.log('Organizing documents from initiative data:', initiative);
    
    const organized = {
      images: [],
      pdfs: [],
      videos: [],
      audio: [],
      others: []
    };

    // Add images from the images array if it exists
    if (initiative?.images && initiative.images.length > 0) {
      console.log('Found images:', initiative.images.length);
      organized.images = initiative.images;
    }

    // Add videos from the videos array if it exists
    if (initiative?.videos && initiative.videos.length > 0) {
      console.log('Found videos:', initiative.videos.length);
      organized.videos = initiative.videos;
    }

    // Add audio from the audio array if it exists
    if (initiative?.audio && initiative.audio.length > 0) {
      console.log('Found audio files:', initiative.audio.length);
      organized.audio = initiative.audio;
    }

    // Add all documents and categorize them
    if (initiative?.documents && initiative.documents.length > 0) {
      console.log('Found documents:', initiative.documents.length);
      
      initiative.documents.forEach(doc => {
        const fileType = getFileType(doc.filename, doc.mimetype);
        
        console.log(`Document: ${doc.filename}, Type: ${fileType}`);
        
        switch (fileType) {
          case 'image':
            organized.images.push(doc);
            break;
          case 'pdf':
          organized.pdfs.push(doc);
            break;
          case 'video':
          organized.videos.push(doc);
            break;
          case 'audio':
            organized.audio.push(doc);
            break;
          default:
          organized.others.push(doc);
        }
      });
    }
    
    console.log('Organized documents:', organized);
    return organized;
  };

  // Set initial tab based on available media
  useEffect(() => {
    if (initiative) {
      const docs = organizeDocuments();
      if (docs.images.length > 0) {
        setMediaTab(0);
      } else if (docs.pdfs.length > 0) {
        setMediaTab(0);
      } else if (docs.videos.length > 0) {
        setMediaTab(0);
      }
    }
  }, [initiative]);

  // Add a function to force document detection
  const forceRefreshDocuments = () => {
    const docs = organizeDocuments();
    console.log('Refreshed document detection:', docs);
    // Scroll to documents section
    if (documentsRef.current) {
      documentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
        sx={{
          background: `linear-gradient(to right, ${theme.palette.background.default}, ${theme.palette.primary.light}20, ${theme.palette.background.default})`,
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Fade in timeout={1000}>
          <Box 
            sx={{ 
              textAlign: 'center',
              p: 6,
              borderRadius: 4,
              bgcolor: 'error.light',
              color: 'error.contrastText'
            }}
          >
            <Typography variant="h4" gutterBottom>
              {error}
            </Typography>
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                component={Link}
                to="/"
                startIcon={<ArrowBackIcon />}
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  boxShadow: 4,
                  '&:hover': {
                    boxShadow: 6,
                  }
                }}
              >
                Back to Home
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>
    );
  }

  if (!initiative) {
    return null;
  }

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  const documents = organizeDocuments();
  const hasMedia = documents.images.length > 0 || documents.pdfs.length > 0 || documents.videos.length > 0;

  return (
    <Box 
      sx={{ 
        py: 6,
        background: 'linear-gradient(to bottom, #f5f7fa, #ffffff)',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={800}>
          <Box>
            <Breadcrumbs 
              separator={<ArrowForwardIosIcon fontSize="small" sx={{ fontSize: 12 }} />} 
              sx={{ mb: 2, color: 'text.secondary' }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                Home
              </Link>
              <Link to={`/initiatives/${category}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                {categoryTitle} - Sangli
              </Link>
              <Typography color="text.primary" fontWeight="medium">
                {initiative.title}
              </Typography>
            </Breadcrumbs>

            <Button
              component={Link}
              to={`/initiatives/${category}`}
              startIcon={<ArrowBackIcon />}
              variant="contained"
              sx={{ 
                mb: 4, 
                borderRadius: 2,
                boxShadow: 2,
                textTransform: 'none',
                px: 3,
                py: 1,
                '&:hover': {
                  boxShadow: 4,
                }
              }}
            >
              Back to {categoryTitle} - Sangli
            </Button>
          </Box>
        </Fade>

        <Grow in timeout={1000}>
          <Paper 
            elevation={5} 
            sx={{ 
              borderRadius: 4, 
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
              }
            }}
          >
            <Box sx={{ position: 'relative' }}>
              {documents.images.length > 0 ? (
                <Box 
                  sx={{ 
                    position: 'relative', 
                    height: 400,
                    cursor: 'zoom-in',
                    overflow: 'hidden'
                  }}
                  onClick={() => openLightbox(documents.images[currentImageIndex].path)}
                >
                  <Fade in timeout={500}>
                    <CardMedia
                      component="img"
                      height="400"
                      image={`${SERVER_URL}/${documents.images[currentImageIndex].path}`}
                      alt={initiative.title}
                      sx={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'rgba(0,0,0,0.03)'
                      }}
                      onError={(e) => {
                        console.error('Image load error:', e);
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </Fade>

                  {/* Zoom indicator overlay */}
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      px: 2,
                      py: 1,
                    }}
                  >
                    <ZoomInIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="caption" fontWeight="medium">
                      Click to zoom
                    </Typography>
                  </Box>

                  {/* Download button */}
                  <Button
                    component="a"
                    href={`${SERVER_URL}/${documents.images[currentImageIndex].path}`}
                    download
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.8)',
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Download
                  </Button>

                  {documents.images.length > 1 && (
                    <>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          left: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                        }}
                        onClick={prevImage}
                      >
                        <ArrowBackIosIcon />
                      </IconButton>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          right: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                        }}
                        onClick={nextImage}
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          bottom: 16, 
                          left: '50%', 
                          transform: 'translateX(-50%)',
                          display: 'flex',
                          gap: 1
                        }}
                      >
                        {documents.images.map((_, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              bgcolor: index === currentImageIndex ? 'primary.main' : 'rgba(255, 255, 255, 0.7)',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(index);
                            }}
                          />
                        ))}
                      </Box>
                    </>
                  )}
                </Box>
              ) : (
                <Box 
                  sx={{ 
                    height: 200, 
                    bgcolor: 'primary.light', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                >
                  <ArticleIcon sx={{ fontSize: 80, color: 'primary.contrastText', opacity: 0.7 }} />
                </Box>
              )}

              <Box 
                sx={{ 
                  position: 'absolute',
                  bottom: -30,
                  left: 40,
                  display: 'flex',
                  gap: 1
                }}
              >
                <Zoom in timeout={1200}>
                  <Chip 
                    label={initiative.subCategory}
                    color="primary"
                    sx={{ 
                      borderRadius: 4,
                      py: 3,
                      boxShadow: 2,
                      fontWeight: 'bold'
                    }}
                    icon={<CategoryIcon />}
                  />
                </Zoom>
                <Zoom in timeout={1400}>
                  <Chip 
                    label={initiative.initiative} 
                    color="secondary"
                    sx={{ 
                      borderRadius: 4,
                      py: 3,
                      boxShadow: 2,
                      fontWeight: 'bold'
                    }}
                  />
                </Zoom>
                {initiative.createdAt && (
                  <Zoom in timeout={1600}>
                    <Chip
                      icon={<DateRangeIcon />}
                      label={formatDate(initiative.createdAt)}
                      variant="outlined"
                      sx={{ 
                        borderRadius: 4,
                        py: 3,
                        boxShadow: 2,
                        bgcolor: 'background.paper'
                      }}
                    />
                  </Zoom>
                )}
              </Box>
            </Box>

            <Box sx={{ p: 6, pt: 5 }}>
              <Slide direction="down" in={animationComplete} timeout={800}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 700, 
                    color: 'text.primary',
                    mt: 3,
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    pb: 1,
                    display: 'inline-block'
                  }}
                >
                  {initiative.title} - Sangli
                </Typography>
              </Slide>
              
              <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item xs={12} md={8}>
                  <Fade in={animationComplete} timeout={1000}>
                    <Card elevation={0} sx={{ bgcolor: 'transparent', mb: 4 }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" mb={2}>
                          <DescriptionIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 28 }} />
                          <Typography variant="h5" component="h2" fontWeight="bold" color="primary">
                            Description
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                          {initiative.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>

                  <Fade in={animationComplete} timeout={1200}>
                    <Card elevation={0} sx={{ bgcolor: 'transparent', mb: 4 }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" mb={2}>
                          <ArticleIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 28 }} />
                          <Typography variant="h5" component="h2" fontWeight="bold" color="primary">
                            Content
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                          {initiative.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>

                  {/* Media Section (PDFs, Videos, Images) */}
                  {hasMedia && (
                    <Fade in={animationComplete} timeout={1300}>
                      <Card elevation={0} sx={{ bgcolor: 'transparent', mb: 4 }} id="media-section">
                        <CardContent sx={{ p: 3 }}>
                          <Box display="flex" alignItems="center" mb={2}>
                            <VideoIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 28 }} />
                            <Typography variant="h5" component="h2" fontWeight="bold" color="primary">
                              Media & Documents
                            </Typography>
                          </Box>
                          <Divider sx={{ mb: 3 }} />
                          
                          {/* Media Tabs */}
                          <Tabs 
                            value={mediaTab} 
                            onChange={handleMediaTabChange}
                            sx={{ 
                              mb: 3,
                              borderBottom: 1,
                              borderColor: 'divider',
                              '& .MuiTab-root': {
                                fontWeight: 'bold',
                                textTransform: 'none',
                                fontSize: '1rem',
                              }
                            }}
                          >
                            <Tab icon={<ImageIcon />} label={`Images (${documents.images.length})`} disabled={documents.images.length === 0} />
                            <Tab icon={<PdfIcon />} label={`Documents (${documents.pdfs.length})`} disabled={documents.pdfs.length === 0} />
                            <Tab icon={<VideoIcon />} label={`Videos (${documents.videos.length})`} disabled={documents.videos.length === 0} />
                            <Tab icon={<AudiotrackIcon />} label={`Audio (${documents.audio.length})`} disabled={documents.audio.length === 0} />
                          </Tabs>
                          
                          {/* Images Panel */}
                          {mediaTab === 0 && documents.images.length > 0 && (
                            <Grid container spacing={2}>
                              {documents.images.map((image, index) => (
                                <Grid item xs={6} sm={4} key={index}>
                                  <Zoom in timeout={500 + (index * 100)}>
                                    <Card 
                                      elevation={2}
                                      sx={{ 
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                          transform: 'scale(1.03)',
                                        }
                                      }}
                                    >
                                      <CardMedia
                                        component="img"
                                        height={160}
                                        image={`${SERVER_URL}/${image.path}`}
                                        alt={`Image ${index + 1}`}
                                        sx={{ 
                                          objectFit: 'cover',
                                          cursor: 'zoom-in'
                                        }}
                                        onClick={() => openLightbox(image.path)}
                                        onError={(e) => {
                                          e.target.src = '/placeholder-image.jpg';
                                        }}
                                      />
                                      <CardContent sx={{ py: 1, px: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <Typography variant="caption" color="text.secondary" sx={{ 
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '70%'
                                          }}>
                                          {image.originalname || image.filename || `Image ${index + 1}`}
                                        </Typography>
                                          <Button
                                            component="a"
                                            href={`${SERVER_URL}/${image.path}`}
                                            download
                                            size="small"
                                            sx={{ minWidth: 'auto', p: 0.5 }}
                                            aria-label="Download image"
                                          >
                                            <DownloadIcon fontSize="small" />
                                          </Button>
                                        </Box>
                                      </CardContent>
                                    </Card>
                                  </Zoom>
                                </Grid>
                              ))}
                            </Grid>
                          )}
                          
                          {/* PDFs Panel - Fixes the tab selection logic for displaying PDFs */}
                          {(() => {
                            // Get the tab index for PDFs based on what tabs are visible
                            let pdfTabIndex = 0;
                            if (documents.images.length > 0) pdfTabIndex++;
                            
                            // Check if this tab is currently selected
                            const isPdfTabSelected = mediaTab === pdfTabIndex;
                            
                            console.log('PDF tab logic:', {
                              pdfTabIndex, 
                              isPdfTabSelected, 
                              mediaTab,
                              pdfCount: documents.pdfs.length
                            });
                            
                            if (isPdfTabSelected && documents.pdfs.length > 0) {
                              return (
                                <Grid container spacing={2}>
                                  {documents.pdfs.map((pdf, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                      <Zoom in timeout={500 + (index * 100)}>
                                        <Card 
                                          elevation={2}
                                          sx={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            p: 2,
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            '&:hover': {
                                              transform: 'translateY(-4px)',
                                              boxShadow: 3
                                            }
                                          }}
                                          onClick={() => openPdfViewer(pdf.path)}
                                        >
                                          <PdfIcon 
                                            sx={{ 
                                              fontSize: 40, 
                                              color: 'error.main',
                                              mr: 2
                                            }} 
                                          />
                                          <Box>
                                            <Typography variant="subtitle1" fontWeight="medium">
                                              {pdf.originalname || pdf.filename || 'PDF Document'}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                              Click to view PDF
                                            </Typography>
                                          </Box>
                                        </Card>
                                      </Zoom>
                                    </Grid>
                                  ))}
                                </Grid>
                              );
                            }
                            return null;
                          })()}
                          
                          {/* Videos Panel - Fixes the tab selection logic for displaying videos */}
                          {(() => {
                            // Get the tab index for videos based on what tabs are visible
                            let videoTabIndex = 0;
                            if (documents.images.length > 0) videoTabIndex++;
                            if (documents.pdfs.length > 0) videoTabIndex++;
                            
                            // Check if this tab is currently selected
                            const isVideoTabSelected = mediaTab === videoTabIndex;
                            
                            console.log('Video tab logic:', {
                              videoTabIndex, 
                              isVideoTabSelected, 
                              mediaTab,
                              videoCount: documents.videos.length
                            });
                            
                            if (isVideoTabSelected && documents.videos.length > 0) {
                              return (
                                <Grid container spacing={2}>
                                  {documents.videos.map((video, index) => (
                                    <Grid item xs={12} key={index}>
                                      <Zoom in timeout={500 + (index * 100)}>
                                        <Card elevation={2} sx={{ p: 2, mb: 2 }}>
                                          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                                            {video.originalname || video.filename || `Video ${index + 1}`}
                                          </Typography>
                                          
                                          <Box sx={{ position: 'relative', width: '100%', pt: 2 }}>
                                            <video
                                              controls
                                              width="100%"
                                              poster="/video-placeholder.jpg"
                                              style={{ 
                                                borderRadius: '8px',
                                                maxHeight: '400px',
                                                backgroundColor: '#000'
                                              }}
                                            >
                                              <source src={`${SERVER_URL}/${video.path}`} type="video/mp4" />
                                              Your browser does not support the video tag.
                                            </video>
                                            
                                            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              startIcon={<VideoIcon />}
                                              sx={{ 
                                                borderRadius: 2
                                              }}
                                              onClick={() => openVideoPlayer(video.path)}
                                            >
                                              Open in Fullscreen
                                            </Button>
                                              
                                              <Button
                                                variant="outlined"
                                                color="primary"
                                                startIcon={<DownloadIcon />}
                                                component="a"
                                                href={`${SERVER_URL}/${video.path}`}
                                                download
                                                sx={{ 
                                                  borderRadius: 2
                                                }}
                                              >
                                                Download Video
                                              </Button>
                                            </Box>
                                          </Box>
                                        </Card>
                                      </Zoom>
                                    </Grid>
                                  ))}
                                </Grid>
                              );
                            }
                            return null;
                          })()}

                          {/* Audio Files Tab Panel */}
                          {mediaTab === 3 && (
                            <Box sx={{ p: 3 }}>
                              {documents.audio.length > 0 ? (
                                <Grid container spacing={3}>
                                  {documents.audio.map((audio, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                      <Card sx={{ 
                                        height: '100%',
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        borderRadius: 2,
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                          transform: 'translateY(-4px)',
                                          boxShadow: 4
                                        }
                                      }}>
                                        <Box sx={{ 
                                          p: 2, 
                                          display: 'flex', 
                                          alignItems: 'center',
                                          borderBottom: 1,
                                          borderColor: 'divider'
                                        }}>
                                          <AudiotrackIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                                          <Typography variant="subtitle1" component="div" sx={{ 
                                            fontWeight: 'medium',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                          }}>
                                            {audio.filename || 'Audio File'}
                                          </Typography>
                                        </Box>
                                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                          <Box sx={{ 
                                            bgcolor: 'action.hover', 
                                            p: 2, 
                                            mb: 2, 
                                            borderRadius: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: 100
                                          }}>
                                            <AudiotrackIcon sx={{ fontSize: 64, color: 'primary.main', opacity: 0.8 }} />
                                          </Box>
                                          
                                          <audio 
                                            controls 
                                            src={`${SERVER_URL}/${audio.path}`} 
                                            style={{ width: '100%', marginBottom: 16 }}
                                          />
                                          
                                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="caption" color="text.secondary">
                                              {formatFileSize(audio.size)}
                                            </Typography>
                                            
                                            <Button
                                              variant="outlined"
                                              size="small"
                                              startIcon={<DownloadIcon />}
                                              component="a"
                                              href={`${SERVER_URL}/${audio.path}`}
                                              download
                                            >
                                              Download
                                            </Button>
                                          </Box>
                                        </CardContent>
                                      </Card>
                                    </Grid>
                                  ))}
                                </Grid>
                              ) : (
                                <Box sx={{ py: 5, textAlign: 'center' }}>
                                  <AudiotrackIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                                  <Typography variant="h6" color="text.secondary">
                                    No audio files available
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Fade>
                  )}

                  {/* Dedicated Documents Section - Ensures documents always display */}
                  {initiative.documents && initiative.documents.length > 0 && (
                    <Fade in={animationComplete} timeout={1400}>
                      <Card elevation={3} sx={{ bgcolor: 'white', mb: 4, mt: 4, borderRadius: 2 }} ref={documentsRef}>
                        <CardContent sx={{ p: 3 }}>
                          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                            <Box display="flex" alignItems="center">
                              <PdfIcon sx={{ color: 'error.main', mr: 1.5, fontSize: 28 }} />
                              <Typography variant="h5" component="h2" fontWeight="bold" color="error.main">
                                Documents ({initiative.documents.length})
                              </Typography>
                            </Box>
                            
                            <Button 
                              size="small" 
                              onClick={forceRefreshDocuments}
                              startIcon={<RefreshIcon />}
                              sx={{ display: documents.pdfs.length === 0 ? 'flex' : 'none' }}
                            >
                              Refresh
                            </Button>
                          </Box>
                          <Divider sx={{ mb: 3 }} />
                          
                          {documents.pdfs.length > 0 ? (
                            <Grid container spacing={2}>
                              {documents.pdfs.map((pdf, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                  <Zoom in timeout={500 + (index * 100)}>
                                    <Card 
                                      elevation={2}
                                      sx={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        border: '1px solid rgba(0,0,0,0.1)',
                                        '&:hover': {
                                          transform: 'translateY(-4px)',
                                          boxShadow: 3
                                        }
                                      }}
                                      onClick={() => openPdfViewer(pdf.path)}
                                    >
                                      <PdfIcon 
                                        sx={{ 
                                          fontSize: 40, 
                                          color: 'error.main',
                                          mr: 2
                                        }} 
                                      />
                                      <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle1" fontWeight="medium">
                                          {pdf.originalname || pdf.filename || 'PDF Document'}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                          Click to view PDF
                                        </Typography>
                                      </Box>
                                      
                                      <Button
                                        component="a"
                                        href={`${SERVER_URL}/${pdf.path}`}
                                        target="_blank"
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                        sx={{ ml: 2 }}
                                        onClick={(e) => {
                                          e.stopPropagation(); // Prevent triggering parent onClick
                                        }}
                                      >
                                        Download
                                      </Button>
                                    </Card>
                                  </Zoom>
                                </Grid>
                              ))}
                            </Grid>
                          ) : (
                            <Box sx={{ p: 3, bgcolor: 'rgba(0,0,0,0.03)', borderRadius: 1, textAlign: 'center' }}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Found {initiative.documents.length} documents, but none were identified as PDFs.
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                This might be due to incorrect file type detection.
                              </Typography>
                              {/* List all documents with direct links for debugging */}
                              <Box sx={{ mt: 3, textAlign: 'left' }}>
                                {initiative.documents.map((doc, idx) => (
                                  <Box key={idx} sx={{ mb: 1, p: 1, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                                    <Typography variant="body2" fontWeight="medium">
                                      {idx+1}. {doc.originalname || doc.filename || 'Unknown Document'}
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ ml: 2, color: 'text.secondary' }}>
                                      Type: {doc.mimetype || 'unknown'} | Size: {doc.size ? formatFileSize(doc.size) : 'unknown'}
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ ml: 2, color: 'text.secondary', wordBreak: 'break-all' }}>
                                      Path: {doc.path || 'N/A'}
                                    </Typography>
                                    <Button 
                                      variant="outlined" 
                                      size="small"
                                      color="primary"
                                      sx={{ mt: 0.5, ml: 2 }}
                                      component="a"
                                      href={`${SERVER_URL}/${doc.path}`}
                                      target="_blank"
                                    >
                                      Open Document
                                    </Button>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Fade>
                  )}
                  
                  {/* Show debug info about available documents (if none are detected) */}
                  {documents.pdfs.length === 0 && initiative.documents && initiative.documents.length > 0 && (
                    <Box sx={{ mt: 2, mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px dashed' }}>
                      <Typography variant="subtitle2" gutterBottom>Document Debug Info:</Typography>
                      {initiative.documents.map((doc, idx) => (
                        <Box key={idx} sx={{ mb: 1 }}>
                          <Typography variant="caption" display="block">
                            {idx+1}. {doc.originalname || doc.filename || 'Unknown'} 
                            ({doc.mimetype || 'unknown type'})
                          </Typography>
                          <Typography variant="caption" display="block" sx={{ ml: 2 }}>
                            Path: {doc.path || 'N/A'}
                          </Typography>
                          <Button 
                            variant="outlined" 
                            size="small"
                            sx={{ mt: 0.5, ml: 2 }}
                            component="a"
                            href={`${SERVER_URL}/${doc.path}`}
                            target="_blank"
                          >
                            Try Direct Link
                          </Button>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {initiative.listItems && initiative.listItems.length > 0 && (
                    <Fade in={animationComplete} timeout={1400}>
                      <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box display="flex" alignItems="center" mb={2}>
                            <ListAltIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 28 }} />
                            <Typography variant="h5" component="h2" fontWeight="bold" color="primary">
                              Key Points
                            </Typography>
                          </Box>
                          <Divider sx={{ mb: 3 }} />
                          <List>
                            {initiative.listItems.map((item, index) => (
                              <Zoom in={animationComplete} timeout={1000 + (index * 200)} key={index}>
                                <ListItem sx={{ 
                                  py: 1.5, 
                                  px: 2, 
                                  mb: 1.5, 
                                  bgcolor: 'background.paper', 
                                  borderRadius: 2,
                                  boxShadow: 1,
                                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                  '&:hover': {
                                    transform: 'translateX(8px)',
                                    boxShadow: 2
                                  }
                                }}>
                                  <ListItemIcon>
                                    <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={item} 
                                    primaryTypographyProps={{ 
                                      fontWeight: 500,
                                      fontSize: '1rem'
                                    }} 
                                  />
                                </ListItem>
                              </Zoom>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </Fade>
                  )}
                </Grid>

                <Grid item xs={12} md={4}>
                  <Slide direction="left" in={animationComplete} timeout={1000}>
                    <Card 
                      sx={{ 
                        borderRadius: 4, 
                        overflow: 'hidden',
                        position: 'sticky',
                        top: 20,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }}
                    >
                      <Box sx={{ bgcolor: 'primary.main', py: 2, px: 3 }}>
                        <Typography variant="h6" sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>
                          Initiative Details
                        </Typography>
                      </Box>
                      <CardContent>
                        <List sx={{ py: 0 }}>
                          <ListItem sx={{ py: 2 }}>
                            <ListItemIcon>
                              <CategoryIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Category" 
                              secondary={initiative.initiative}
                              primaryTypographyProps={{ fontWeight: 500 }}
                              secondaryTypographyProps={{ fontWeight: 600 }}
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                          <ListItem sx={{ py: 2 }}>
                            <ListItemIcon>
                              <ArticleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Subcategory" 
                              secondary={initiative.subCategory}
                              primaryTypographyProps={{ fontWeight: 500 }}
                              secondaryTypographyProps={{ fontWeight: 600 }}
                            />
                          </ListItem>
                          {initiative.createdAt && (
                            <>
                              <Divider variant="inset" component="li" />
                              <ListItem sx={{ py: 2 }}>
                                <ListItemIcon>
                                  <DateRangeIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary="Published Date" 
                                  secondary={formatDate(initiative.createdAt)}
                                  primaryTypographyProps={{ fontWeight: 500 }}
                                />
                              </ListItem>
                            </>
                          )}
                        </List>
                        
                        <Box sx={{ display: 'flex', mt: 3, gap: 2 }}>
                          <Button 
                            variant="contained" 
                            fullWidth
                            startIcon={<ShareIcon />}
                            sx={{ 
                              borderRadius: 2,
                              py: 1.5,
                              textTransform: 'none',
                              fontWeight: 'bold'
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.href);
                              alert('Link copied to clipboard!');
                            }}
                          >
                            Share
                          </Button>
                          
                          {documents.pdfs.length > 0 && (
                            <Button 
                              variant="outlined" 
                              fullWidth
                              startIcon={<PdfIcon />}
                              sx={{ 
                                borderRadius: 2,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 'bold'
                              }}
                              onClick={() => {
                                const tabIndex = documents.images.length > 0 ? 1 : 0;
                                setMediaTab(tabIndex);
                                // Scroll to media section
                                document.getElementById('media-section')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              View PDFs
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Slide>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grow>
      </Container>

      {/* Image Lightbox */}
      <Modal
        open={lightboxOpen}
        onClose={closeLightbox}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                zIndex: 10,
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
              }}
              onClick={closeLightbox}
            >
              <CloseIcon />
            </IconButton>
            
            <Button
              component="a"
              href={lightboxImage}
              download
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                zIndex: 10,
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
              }}
            >
              Download
            </Button>
            
            <img
              src={lightboxImage}
              alt="Enlarged view"
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                display: 'block',
                backgroundColor: '#000',
              }}
              onError={(e) => {
                console.error('Lightbox image load error:', e);
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          </Box>
        </Box>
      </Modal>

      {/* PDF Viewer Modal */}
      <Modal
        open={pdfOpen}
        onClose={closePdfViewer}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
        }}
      >
        <Fade in={pdfOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              height: '90vh',
              outline: 'none',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 1,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              p: 1,
              borderBottom: 1,
              borderColor: 'divider'
            }}>
              <Typography variant="h6">PDF Viewer</Typography>
              <IconButton
                onClick={closePdfViewer}
                sx={{
                  color: 'text.primary',
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
              {selectedPdf ? (
                <iframe
                  src={selectedPdf}
                  width="100%"
                  height="100%"
                  style={{ border: 'none', borderRadius: '8px' }}
                  title="PDF Viewer"
                  onLoad={() => console.log('PDF iframe loaded:', selectedPdf)}
                  onError={(e) => console.error('PDF iframe error:', e)}
                />
              ) : (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: '100%' 
                  }}
                >
                  <Typography>No PDF selected</Typography>
                </Box>
              )}
            </Box>
            
            <Box sx={{ p: 1, borderTop: 1, borderColor: 'divider' }}>
              <Button 
                variant="outlined"
                href={selectedPdf}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<DownloadIcon />}
              >
                Open in New Tab
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Video Player Modal */}
      <Modal
        open={videoOpen}
        onClose={closeVideoPlayer}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
        }}
      >
        <Fade in={videoOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              height: '90vh',
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton
              onClick={closeVideoPlayer}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
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
            
            <video
              controls
              autoPlay
              width="100%"
              height="100%"
              style={{ 
                maxHeight: '90vh', 
                maxWidth: '100%',
                outline: 'none',
                borderRadius: '8px'
              }}
            >
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default InitiativeDetails; 