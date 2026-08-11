import React from 'react';
import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const weeklyPlan = [
  { day: 'Day 1', title: 'Upper-body strength', detail: 'Chest, back, shoulders and arms', tone: '#e9f5ef' },
  { day: 'Day 2', title: 'Lower-body power', detail: 'Quads, glutes, hamstrings and calves', tone: '#fff1e8' },
  { day: 'Day 3', title: 'Full-body conditioning', detail: 'A balanced session with a cardio finish', tone: '#eeeefe' }
];

const trainingPrinciples = [
  ['01', 'Choose a focus', 'Start by selecting the body area you want to train.'],
  ['02', 'Pick 3–5 movements', 'Use the exercise library to build a short, focused session.'],
  ['03', 'Repeat consistently', 'Leave a rest day between similar muscle groups when possible.']
];

const AuthPlaceholder = () => (
  <Box px={{ xs: '16px', md: '28px' }} py={{ xs: '32px', md: '56px' }} maxWidth="1280px" mx="auto">
    <Stack spacing={4}>
      <Paper elevation={0} sx={{ p: { xs: '28px', md: '48px' }, borderRadius: '28px', background: '#17221b', color: '#fff' }}>
        <Chip label="MY TRAINING" sx={{ bgcolor: '#d9f55a', color: '#17221b', fontWeight: 800, letterSpacing: '.08em' }} />
        <Typography variant="h2" fontWeight={800} sx={{ mt: 3, fontSize: { xs: '2.35rem', md: '3.5rem' }, maxWidth: '720px', letterSpacing: '-.04em' }}>
          Start with a plan you can actually keep.
        </Typography>
        <Typography sx={{ mt: 2, maxWidth: '650px', color: '#d7dfd9', fontSize: '1.1rem', lineHeight: 1.7 }}>
          Choose a focus, find movements that suit your equipment, and build a simple three-day training rhythm.
        </Typography>
        <Button component={RouterLink} to="/#exercises" variant="contained" sx={{ mt: 4, bgcolor: '#d9f55a', color: '#17221b', fontWeight: 800, px: 3, py: 1.4, '&:hover': { bgcolor: '#ecff9b' } }}>
          Browse exercises
        </Button>
      </Paper>

      <Box>
        <Typography variant="h4" fontWeight={800}>A simple weekly rhythm</Typography>
        <Typography color="#5d6a60" mt={1}>Use this as a flexible starting point. Adjust it to your experience, schedule, and recovery.</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={3}>
          {weeklyPlan.map((session) => (
            <Paper key={session.day} elevation={0} sx={{ flex: 1, p: 3, borderRadius: '20px', bgcolor: session.tone, border: '1px solid rgba(23,34,27,.08)' }}>
              <Typography fontWeight={800} color="#58703d">{session.day}</Typography>
              <Typography variant="h5" fontWeight={800} mt={2}>{session.title}</Typography>
              <Typography color="#48564c" mt={1.5} lineHeight={1.6}>{session.detail}</Typography>
            </Paper>
          ))}
        </Stack>
      </Box>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '24px', bgcolor: '#fff', border: '1px solid #e4e8e3' }}>
        <Typography variant="h4" fontWeight={800}>How to use FitFast</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mt={3}>
          {trainingPrinciples.map(([number, title, description]) => (
            <Box key={number} flex={1}>
              <Typography color="#ff2625" fontWeight={800}>{number}</Typography>
              <Typography variant="h6" fontWeight={800} mt={1}>{title}</Typography>
              <Typography color="#5d6a60" mt={1} lineHeight={1.65}>{description}</Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Stack>
  </Box>
);

export default AuthPlaceholder;
