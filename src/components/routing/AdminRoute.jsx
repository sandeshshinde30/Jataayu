import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

const AdminRoute = ({ element }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return isAuthenticated && (user?.role === 'admin' || user?.role === 'Official_member') ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

AdminRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default AdminRoute; 