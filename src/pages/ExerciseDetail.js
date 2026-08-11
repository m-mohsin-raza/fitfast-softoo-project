import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
/*we imported this for determining ID of exercise we 
currently on so we can fetch addition data of that exercise*/
import {Alert, Box} from '@mui/material';

import {
  getExerciseDetail,
  getExerciseVideos,
  getRelatedExercises
} from '../services/exerciseApi';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const {id} = useParams();

  useEffect(() =>{
    const fetchExercisesData = async ()=>{
      setIsLoading(true);
      setError('');

      try {
        const exerciseDetailData = await getExerciseDetail(id);
        setExerciseDetail(exerciseDetailData);

        const [videos, relatedExercises] = await Promise.all([
          getExerciseVideos(exerciseDetailData.name),
          getRelatedExercises({
            target: exerciseDetailData.target,
            equipment: exerciseDetailData.equipment
          })
        ]);

        setExerciseVideos(videos);
        setTargetMuscleExercises(relatedExercises.targetMuscleExercises);
        setEquipmentExercises(relatedExercises.equipmentExercises);
      } catch (error) {
        setExerciseDetail({});
        setExerciseVideos([]);
        setTargetMuscleExercises([]);
        setEquipmentExercises([]);
        setError(error.message || 'Unable to load exercise details right now.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercisesData();
  }, [id]);




  return (
    <Box>
      {error ? (
        <Alert severity="error" sx={{ mx: '20px', mt: '20px' }}>
          {error}
        </Alert>
      ) : null}
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
        isLoading={isLoading}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
        isLoading={isLoading}
      />
    </Box>
  )
}

export default ExerciseDetail
