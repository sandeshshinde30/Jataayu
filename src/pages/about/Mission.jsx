import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';

const Mission = () => {
  const { translate } = useLanguage();

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              mb: 4
            }}
          >
            {translate('mission.title')}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom color="primary.dark" fontWeight={600}>
                {translate('mission.vision')}
              </Typography>
              <Typography paragraph>
                {translate('mission.visionText')}
              </Typography>

              <Typography variant="h5" gutterBottom color="primary.dark" fontWeight={600} sx={{ mt: 4 }}>
                {translate('mission.purpose')}
              </Typography>
              <Typography paragraph>
                {translate('mission.purposeText')}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom color="primary.dark" fontWeight={600}>
                {translate('mission.goals')}
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Typography
                    key={item}
                    component="li"
                    sx={{
                      mb: 2,
                      '&::marker': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    {translate(`mission.goal${item}`)}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 6, p: 3, bgcolor: 'primary.light', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="primary.dark" fontWeight={600}>
              {translate('mission.commitment')}
            </Typography>
            <Typography color="text.primary">
              {translate('mission.commitmentText')}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Mission; 