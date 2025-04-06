import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
} from '@mui/material';
import { login, clearError } from '../store/slices/authSlice';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const { translate } = useLanguage();
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
    
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    setFormError('');
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      const result = await dispatch(login(formData)).unwrap();
      if (!result) {
        setFormError('Login failed. Please try again.');
        return;
      }
      // Only navigate after successful login and when we have user data
      if (result.user && result.token) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setFormError(typeof err === 'string' ? err : 'Login failed. Please try again.');
      // Ensure loading state is reset on error
      dispatch(clearError());
    }
  };

  // Add loading state cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {translate('common.titles.login')}
        </Typography>

        {(error || formError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label={translate('auth.login.emailLabel')}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="email"
            error={!!formError}
            disabled={loading}
          />

          <TextField
            fullWidth
            label={translate('auth.login.passwordLabel')}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="current-password"
            error={!!formError}
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? translate('auth.login.loggingIn') : translate('auth.login.loginButton')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login; 