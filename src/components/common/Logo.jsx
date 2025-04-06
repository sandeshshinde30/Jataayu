import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import logoImage from '../../assets/images/jataayu_logo_official.jpg';

const Logo = ({ size = 'medium', onClick }) => {
  // Size variants for the logo
  const sizes = {
    small: {
      width: 80,
      height: 80
    },
    medium: {
      width: 140,
      height: 140
    },
    large: {
      width: 200,
      height: 200
    }
  };

  const currentSize = sizes[size];

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Box
          component="img"
          src={logoImage}
          alt="JATAAYU Logo"
          sx={{
            width: currentSize.width,
            height: currentSize.height,
            objectFit: 'contain'
          }}
        />
      </motion.div>
    </Box>
  );
};

export default Logo; 