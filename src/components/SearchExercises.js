import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, Stack, TextField, Typography} from '@mui/material'

import {getBodyParts, searchExercises} from '../services/exerciseApi';

import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  const [error, setError] = useState('');

  useEffect(()=>{
    const fetchExercisesData = async () =>{
      setError('');

      try {
        setBodyParts(await getBodyParts());
      } catch (error) {
        setBodyParts(['all']);
        setError(error.message || 'Unable to load body parts right now.');
      }
    };

    fetchExercisesData();
  },[]);
/*this function is for handle change 
and it is async because we have to fetch data from it.
it will take sometime */
  const handleSearch = async()=>{
    const trimmedSearch = search.trim();

    if(trimmedSearch){
      setError('');

      try {
        const searchedExercises = await searchExercises(trimmedSearch);
        setSearch('');
        setExercises(searchedExercises);
        setBodyPart('all');
        window.scrollTo({top: 1800, left: 100, behavior: 'smooth'});
      } catch (error) {
        setError(error.message || 'Unable to search exercises right now.');
      }
    }
  };
  return (
    <Stack 
    alignItems="center"
    mt={{ xs: '44px', md: '72px' }}
    justifyContent="center"
    p="20px"
    >
     <Typography
     fontWeight={700} 
     sx={{fontSize:{lg:'44px',xs:'30px'}}}
     mb="10px"
     textAlign="center"
     >
      Find your next movement</Typography>
    <Typography color="#5d6a60" textAlign="center" mb="30px" maxWidth="620px">
      Search by exercise, muscle group, body area, or equipment — then build a session that fits today.
    </Typography>

    <Box position="relative" mb="42px" className="search-panel">

      <TextField
      sx={{
          input:{
            fontWeight:'700',
            border:'none',
            borderRadius:'4px'},
            width:{lg:'760px', xs:'min(350px, 88vw)'},
            backgroundColor:'#fff',
            borderRadius:"4px"
      }}
      height="76px"
      value={search}
      /*purpose of this function is to ensure there is no difference
       between caps or small letter while searching*/
      onChange={(e)=>setSearch(e.target.value.toLowerCase())}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      }}
      placeholder="Try “dumbbell”, “chest”, or “squat”"
      type="text"
      />

      <Button
      className="search-btn"
      sx={{
        bgcolor: '#FF2625',
        color:'#fff',
        textTransform: 'none',
        width: {lg:'175px', xs:'80px'},
        fontSize: {lg:'20px', xs:'14px'},
        height:'56px',
        position:'absolute',
        right: '0'
      }}
      onClick={handleSearch}
      >Find</Button>


    </Box>
    {error ? (
      <Alert severity="warning" sx={{ mb: '24px', width: '100%', maxWidth: '800px' }}>
        {error}
      </Alert>
    ) : null}

    <Typography fontWeight={700} color="#17221b" sx={{ alignSelf: 'flex-start', width: '100%', maxWidth: '1280px', px: '20px', mb: 1 }}>
      Browse by focus area
    </Typography>
    <Box sx={{position:'relative', width:'100%', p:'20px', maxWidth: '1320px'}}>
      <HorizontalScrollbar data={bodyParts}
      // these are those body parts which we are clicked on 
      bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts />
    </Box> 


    </Stack>
  )
}

export default SearchExercises
