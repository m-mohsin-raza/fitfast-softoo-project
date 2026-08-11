import React from 'react';
import {Box, Stack,Typography} from '@mui/material';

import HorizontalScrollbar from './HorizontalScrollbar';
import Loader from './Loader';

const SimilarExercises = ({
  targetMuscleExercises,
  equipmentExercises,
  isLoading
}) => {
  return (
    <Box
    sx={{
      mt:{lg:'100px', xs:'0'}
    }}
    >
     <Typography variant="h3" mb={5}>
      Exercises that target the same muscle group
     </Typography> 
     <Stack
     direction="row"
     sx={{
      p:'2', position:'relative'
     }}
     >
     {isLoading ? <Loader /> : targetMuscleExercises.length ? <HorizontalScrollbar data={targetMuscleExercises}/>
     : <Typography color="#3A1212">No similar exercises were found.</Typography>
     }
     </Stack>


    <Typography variant="h3" mb={5}>
      Exercises that use the same equipment
     </Typography> 
     <Stack
     direction="row"
     sx={{
      p:'2', position:'relative'
     }}
     >
     {isLoading ? <Loader /> : equipmentExercises.length ? <HorizontalScrollbar data={equipmentExercises}/>
     : <Typography color="#3A1212">No similar exercises were found.</Typography>
     }
     </Stack>
    </Box>
  )
}

export default SimilarExercises
