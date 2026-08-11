import React from 'react';
import {Box, Stack, Typography} from '@mui/material';

import Logo from '../assets/images/strongman.png';

const Footer = () => {
  return (
    <Box
    mt="80px"
    bgcolor="#17221b"
    >
      <Stack
      gap="14px"
      alignItems="center"
      px="40px"
      pt="24px"
      >
        <img src={Logo} alt="FitFast" width="62px" height="50px" />
         <Typography
         alignItems="center"
          variant="h2" mt="5px"
          fontWeight="600"
          fontSize="1.5rem"
          color="#ffffff">
        FIT FAST
          </Typography>
        <Typography
        alignItems="center"
          variant="h5" pb="20px" mt="10px"
          fontSize="1rem"
          fontWeight="Bold">
          Move with purpose. Train at your pace.
          </Typography>
      </Stack>
    </Box>
  )
}

export default Footer
