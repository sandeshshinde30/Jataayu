import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  IconButton,
  Badge,
  Typography,
  Box,
  Button,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Paper,
  Tooltip,
  Fade,
  Chip,
  Stack,
  useTheme,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useLanguage } from '../../context/LanguageContext';
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from '../../store/slices/notificationSlice';

const NotificationMenu = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications, unreadCount, loading } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    if (unreadCount === undefined) {
      dispatch(getUnreadCount());
    }
  }, [dispatch, unreadCount]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(getNotifications({ page: 1, limit: 10 }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await dispatch(markAsRead(notification._id));
    }
    if (notification.link) {
      navigate(notification.link);
    }
    handleClose();
  };

  const handleMarkAllAsRead = async () => {
    await dispatch(markAllAsRead());
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <>
      <Tooltip title={translate('nav.notifications')} TransitionComponent={Fade}>
        <IconButton 
          color="inherit" 
          onClick={handleClick}
          sx={{
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <Badge 
            badgeContent={unreadCount} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                animation: unreadCount > 0 ? 'pulse 2s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                    boxShadow: '0 0 0 0 rgba(211, 47, 47, 0.4)',
                  },
                  '70%': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 0 0 10px rgba(211, 47, 47, 0)',
                  },
                  '100%': {
                    transform: 'scale(1)',
                    boxShadow: '0 0 0 0 rgba(211, 47, 47, 0)',
                  },
                },
              },
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: 500,
            width: 400,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid',
            borderColor: 'divider',
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <NotificationsIcon />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {translate('nav.notifications')}
            </Typography>
          </Stack>
          {unreadCount > 0 && (
            <Button
              size="small"
              startIcon={<DoneAllIcon />}
              onClick={handleMarkAllAsRead}
              sx={{ 
                textTransform: 'none',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {translate('common.markAllAsRead')}
            </Button>
          )}
        </Paper>

        {loading ? (
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={24} />
          </Box>
        ) : notifications.length > 0 ? (
          <List sx={{ p: 0 }}>
            {notifications.map((notification) => (
              <ListItem
                key={notification._id}
                disablePadding
                sx={{
                  backgroundColor: notification.read ? 'inherit' : 'action.hover',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemButton
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    py: 1.5,
                    px: 2,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: notification.read ? 'grey.200' : `${getNotificationColor(notification.type)}20`,
                        color: notification.read ? 'grey.500' : getNotificationColor(notification.type),
                        border: '1px solid',
                        borderColor: notification.read ? 'grey.300' : getNotificationColor(notification.type),
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: notification.read ? 'normal' : 'bold',
                            color: notification.read ? 'text.primary' : 'primary.main',
                          }}
                        >
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Chip
                            label="New"
                            size="small"
                            sx={{
                              bgcolor: 'primary.main',
                              color: 'white',
                              height: 20,
                              '& .MuiChip-label': {
                                px: 1,
                                fontSize: '0.75rem',
                              },
                            }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: notification.read ? 'normal' : 'medium',
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                          <Typography
                            variant="caption"
                            sx={{ 
                              color: 'text.secondary',
                            }}
                          >
                            {formatTimeAgo(notification.createdAt)}
                          </Typography>
                          {notification.type && (
                            <Chip
                              label={notification.type}
                              size="small"
                              sx={{
                                bgcolor: `${getNotificationColor(notification.type)}20`,
                                color: getNotificationColor(notification.type),
                                height: 20,
                                '& .MuiChip-label': {
                                  px: 1,
                                  fontSize: '0.75rem',
                                },
                              }}
                            />
                          )}
                        </Stack>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'grey.100',
                color: 'grey.500',
                width: 60,
                height: 60,
              }}
            >
              <NotificationsIcon sx={{ fontSize: 30 }} />
            </Avatar>
            <Typography variant="body1" color="text.secondary">
              {translate('common.noNotifications')}
            </Typography>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default NotificationMenu; 