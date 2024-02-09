import { Alert, Box } from '@mui/material';
import React from 'react';

const NotFound = () => {
  return (
    <Box pt={2}>
      <Alert severity="error">Page not found 404</Alert>
    </Box>
  );
};
export default NotFound;
