import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import {Button, Stack, Typography} from '@mui/material';
import Logo from '../assets/images/Logo.png';

const Navbar = () => {
  return (
    <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ maxWidth: '1280px', mx: 'auto', mt: { sm:'24px', xs:'14px'}, gap: 2 }} px={{ xs: '16px', sm: '28px' }}
    >
      <Link to="/">
      <Stack direction="row" alignItems="center" spacing={1}>
        <img src={Logo} alt="FitFast" style={{width:'42px', height:'42px'}} />
        <Typography fontWeight={800} letterSpacing="-.04em" fontSize="1.25rem" color="#17221b">fitfast</Typography>
      </Stack>
      </Link>
      <Stack
      direction="row"
      gap={{ xs: '16px', sm: '32px' }}
      fontSize={{ xs: '15px', sm: '17px' }}
      alignItems="center"
      >
        <NavLink to="/" style={({ isActive }) => ({
          textDecoration: 'none',
          color: '#3A1212',
          borderBottom: isActive ? '3px solid #FF2625' : '3px solid transparent'
        })}>Home</NavLink>
        <a href="#exercises" style={{textDecoration:'none', color:'#3A1212'}}>Exercises</a>
        <Button
          component={NavLink}
          to="/auth"
          variant="outlined"
          color="error"
          sx={{ textTransform: 'none', borderRadius: '999px', px: { xs: 1.5, sm: 2.5 }, whiteSpace: 'nowrap' }}
        >
          My training
        </Button>
      </Stack>
    </Stack>
  )
}

export default Navbar
