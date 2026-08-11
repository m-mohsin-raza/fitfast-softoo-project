import React, {useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import {Alert, Box, Stack, Typography} from '@mui/material';

import {getExercises} from '../services/exerciseApi';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({exercises, setExercises, bodyPart}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const exercisesPerPage = 9;

  const indexOfLastExercise =currentPage * exercisesPerPage;
  const indexOfFistExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice
  (indexOfFistExercise, indexOfLastExercise);



  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({top:1800, behavior:'smooth'})
  }

  useEffect(() =>{
    const fetchExercisesData = async () =>{
      setIsLoading(true);
      setError('');

      try {
        setExercises(await getExercises(bodyPart));
      } catch (error) {
        setExercises([]);
        setError(error.message || 'Unable to load exercises right now.');
      } finally {
        setIsLoading(false);
      }
    };

    setCurrentPage(1);
    fetchExercisesData();
  } ,[bodyPart, setExercises]);


  return (
    <Box id="exercises"
    sx={{
      mt:{lg:'110px'}
    }}
    mt="50px"
    p="20px"
    >
      <Typography variant="h3" fontWeight={800} mb="8px">Exercise library</Typography>
      <Typography color="#5d6a60" mb="36px">
        {isLoading ? 'Loading exercises…' : `${exercises.length} movements ready to explore`}
      </Typography>
      {error ? (
        <Alert severity="error" sx={{ mb: '30px' }}>
          {error}
        </Alert>
      ) : null}
      <Stack direction="row" 
      sx={{
        gap:{lg:'110px', xs:'50px'}
      }}
      flexWrap="wrap" justifyContent="center"
      >
        {isLoading ? <Loader /> : currentExercises.map((exercise) =>(
         <ExerciseCard key={exercise.id} exercise={exercise}/>
        ))}
      </Stack>
      {!isLoading && !error && !currentExercises.length ? (
        <Typography textAlign="center" mt="40px" color="#3A1212">
          No exercises found for this selection.
        </Typography>
      ) : null}
      <Stack
        mt="100px"
        alignItems="center"
        >
          {exercises.length>9 &&(
            <Pagination
            color='standard'
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
            />
          )}

        </Stack>
       
    </Box>
  )
}

export default Exercises
