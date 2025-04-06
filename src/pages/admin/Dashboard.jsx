import React from 'react';
import { Box, Container, Typography, Paper, Tabs, Tab } from '@mui/material';
import InitiativeForm from '../../components/admin/InitiativeForm';

const Dashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Manage Initiatives" />
          <Tab label="Users" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>

      {value === 0 && (
        <Box>
          <InitiativeForm />
        </Box>
      )}
      {value === 1 && (
        <Box>
          <Typography>User Management (Coming Soon)</Typography>
        </Box>
      )}
      {value === 2 && (
        <Box>
          <Typography>Settings (Coming Soon)</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard; 