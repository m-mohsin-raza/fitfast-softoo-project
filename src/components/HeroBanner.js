import React from 'react'
import {Box, Typography, Button } from '@mui/material';

import HeroBannerImage from '../assets/images/hero-fitness-professional.png';
 
const HeroBanner = () => {
  return (
    <Box className="hero-banner">
      <Box className="hero-banner-copy">
      <Typography
       color="#FF2625"
       fontWeight="600"
       fontSize="2rem"
      >
        FITFAST / TRAIN SMARTER
      </Typography>

    <Typography fontWeight={700}
    sx={{fontSize: {lg:'2.5rem', xs: '2.2rem'}}}
    mb="23px" mt="30px">
      Build strength <br/> that lasts.
      
    </Typography>

     <Typography fontSize="1.5rem"
     lineHeight="35px" mb={4}>
     Discover exercises, muscle focus, and equipment guidance for every training day.
    </Typography>

    <Button 
    variant='contained'
    color="error"
    href="#exercises"
    sx={{backgroundColor:'#ff2625', padding:'10px'}}
    >
      Explore library
    </Button>
      </Box>

    <img 
    src={HeroBannerImage} 
    alt="Workout banner"
    className="hero-banner-img"
    />

    </Box>
  )
}

export default HeroBanner
