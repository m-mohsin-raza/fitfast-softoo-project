import React from 'react'
import {Route, Routes} from 'react-router-dom';
import {Box} from '@mui/material';
import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from  './pages/Home';
import AuthPlaceholder from './pages/AuthPlaceholder';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Box sx={{ width: { xs: '100%', xl: '1488px' } }} m="auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/auth" element={<AuthPlaceholder />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
