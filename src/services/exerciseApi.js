import { YOUTUBE_DATA_URL } from '../constants/api';
import { fetchJson } from './http';

// The hosted V1 ExerciseDB API is public, so the library works without a RapidAPI plan.
const EXERCISE_API_URL = 'https://oss.exercisedb.dev/api/v1/exercises';
const INITIAL_LIBRARY_PAGES = 6;
let exerciseCache;

const firstValue = (value) => Array.isArray(value) ? value[0] : value;

const normalizeExercise = (exercise) => ({
  ...exercise,
  id: exercise.exerciseId || exercise.id,
  bodyPart: firstValue(exercise.bodyParts) || exercise.bodyPart || 'full body',
  target: firstValue(exercise.targetMuscles) || exercise.target || 'general fitness',
  equipment: firstValue(exercise.equipments) || exercise.equipment || 'body weight',
  gifUrl: exercise.gifUrl || exercise.imageUrl
});

const extractExercises = (response) => {
  const exercises = Array.isArray(response) ? response : response.data;
  if (!Array.isArray(exercises)) {
    throw new Error('The exercise service returned an unexpected response. Please try again.');
  }
  return exercises.map(normalizeExercise);
};

const loadExercises = async () => {
  if (!exerciseCache) {
    exerciseCache = (async () => {
      let response = await fetchJson(EXERCISE_API_URL);
      const allExercises = extractExercises(response);
      let pagesLoaded = 1;

      while (response.meta?.hasNextPage && response.meta.nextCursor && pagesLoaded < INITIAL_LIBRARY_PAGES) {
        const cursor = encodeURIComponent(response.meta.nextCursor);
        response = await fetchJson(`${EXERCISE_API_URL}?cursor=${cursor}`);
        allExercises.push(...extractExercises(response));
        pagesLoaded += 1;
      }

      return allExercises;
    })()
      .catch((error) => {
        exerciseCache = undefined;
        throw error;
      });
  }
  return exerciseCache;
};

export const getBodyParts = async () => {
  const exercises = await loadExercises();
  return ['all', ...new Set(exercises.map((exercise) => exercise.bodyPart))];
};

export const getExercises = async (bodyPart = 'all') => {
  const exercises = await loadExercises();
  return bodyPart === 'all' ? exercises : exercises.filter((exercise) => exercise.bodyPart === bodyPart);
};

export const searchExercises = async (query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  const exercises = await loadExercises();
  return exercises.filter((exercise) => [exercise.name, exercise.target, exercise.equipment, exercise.bodyPart]
    .some((value) => String(value || '').toLowerCase().includes(normalizedQuery)));
};

export const getExerciseDetail = async (id) => {
  const exercises = await loadExercises();
  const exercise = exercises.find((item) => item.id === id);
  if (!exercise) throw new Error('That exercise could not be found. Return to the library and choose another exercise.');
  return exercise;
};

export const getExerciseVideos = async (name) => {
  const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  if (!youtubeApiKey) return [];

  const params = new URLSearchParams({ part: 'snippet', q: `${name} exercise form`, type: 'video', maxResults: '6', key: youtubeApiKey });
  const result = await fetchJson(`${YOUTUBE_DATA_URL}/search?${params.toString()}`);
  return (result.items || []).map((item) => ({
    video: {
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelName: item.snippet.channelTitle,
      thumbnails: [item.snippet.thumbnails.high || item.snippet.thumbnails.medium || item.snippet.thumbnails.default]
    }
  })).filter((item) => item.video.videoId && item.video.thumbnails[0]?.url);
};

export const getRelatedExercises = async ({ target, equipment }) => {
  const exercises = await loadExercises();
  return {
    targetMuscleExercises: exercises.filter((exercise) => exercise.target === target).slice(0, 10),
    equipmentExercises: exercises.filter((exercise) => exercise.equipment === equipment).slice(0, 10)
  };
};
