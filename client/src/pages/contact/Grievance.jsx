import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, TextField, Button, Stepper, Step, StepLabel, FormControl, InputLabel, Select, MenuItem, Alert, Snackbar } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

const Grievance = () => {
  const theme = useTheme();
  const { translate, language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    priority: '',
    location: '',
    description: '',
    attachments: []
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    translate('grievance.steps.personal'),
    translate('grievance.steps.details'),
    translate('grievance.steps.review')
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setShowSuccess(true);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label={translate('grievance.form.name')}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label={translate('grievance.form.email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label={translate('grievance.form.phone')}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>{translate('grievance.form.category')}</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label={translate('grievance.form.category')}
                >
                  <MenuItem value="service">{translate('grievance.categories.service')}</MenuItem>
                  <MenuItem value="staff">{translate('grievance.categories.staff')}</MenuItem>
                  <MenuItem value="facility">{translate('grievance.categories.facility')}</MenuItem>
                  <MenuItem value="other">{translate('grievance.categories.other')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>{translate('grievance.form.priority')}</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  label={translate('grievance.form.priority')}
                >
                  <MenuItem value="low">{translate('grievance.priorities.low')}</MenuItem>
                  <MenuItem value="medium">{translate('grievance.priorities.medium')}</MenuItem>
                  <MenuItem value="high">{translate('grievance.priorities.high')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label={translate('grievance.form.location')}
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label={translate('grievance.form.description')}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {translate('grievance.review.title')}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>{translate('grievance.form.name')}:</strong> {formData.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>{translate('grievance.form.email')}:</strong> {formData.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>{translate('grievance.form.phone')}:</strong> {formData.phone}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>{translate('grievance.form.category')}:</strong> {formData.category}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>{translate('grievance.form.priority')}:</strong> {formData.priority}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>{translate('grievance.form.location')}:</strong> {formData.location}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>{translate('grievance.form.description')}:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formData.description}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          {translate('grievance.title')} - Sangli
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center" paragraph sx={{ mb: 6 }}>
          {translate('grievance.subtitle')} {translate('common.in')} Sangli
        </Typography>

        <Paper sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  {translate('grievance.buttons.back')}
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<CheckCircleIcon />}
                >
                  {translate('grievance.buttons.submit')}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {translate('grievance.buttons.next')}
                </Button>
              )}
            </Box>
          </form>
        </Paper>

        {/* Success Message */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
            {translate('grievance.success.message')}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Grievance; 