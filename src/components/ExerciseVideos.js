import React from 'react';
import {Box, Stack, Typography} from '@mui/material';
import Loader from './Loader';

const ExerciseVideos = ({exerciseVideos, name, isLoading}) => {
  const validVideos = (exerciseVideos || []).filter((item) => (
    item?.video?.videoId && item.video?.title && item.video?.thumbnails?.[0]?.url
  ));
  const hasVideos = validVideos.length > 0;

  return (
    <Box
    sx={{
      marginTop:{lg:'200px',xs:'20px'}}
    }
    p="20px"
    >
      <Typography
      variant="h3"
      mb="33px"
      >
      Watch <span style={{color:'#ff2625', textTransform:'capitalize'}}>{name}</span> exercise videos
      </Typography>

      <Stack
      justifyContent="center"
      flexWrap="wrap"
      alignItems="center"
      sx={{
        flexDirection:{lg:'row'},
        gap:{lg:'80px', xs:'0'}
      }}
      >
      {isLoading ? <Loader /> : null}
      {!isLoading && !hasVideos ? (
        <Typography textAlign="center" color="#3A1212">
          No related videos were found for this exercise yet.
        </Typography>
      ) : null}
      {!isLoading ? validVideos.slice(0,6).map((item) =>(
        <a
        key={item.video.videoId}
        className="exercise-video"
        href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
        target="_blank"
        rel="noreferrer"
        >
          <img src={item.video.thumbnails[0].url} alt={item.video.title}/>
          <Box>
            <Typography
            variant="h5"
            color="#000"
            >
              {item.video.title}
            </Typography>

             <Typography
            variant="h6"
            color="#FF2526"
            fontWeight="bold"
            >
              {item.video.channelName}
            </Typography>

          </Box>
        </a>
      )) : null}
      </Stack>

    </Box>
  )
}

export default ExerciseVideos
