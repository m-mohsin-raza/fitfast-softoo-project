let api;

const exercises = [
  { exerciseId: 'push-up', name: 'Push Up', bodyParts: ['chest'], targetMuscles: ['pectorals'], equipments: ['body weight'], gifUrl: 'push.gif' },
  { exerciseId: 'squat', name: 'Squat', bodyParts: ['upper legs'], targetMuscles: ['quads'], equipments: ['body weight'], gifUrl: 'squat.gif' }
];

describe('exerciseApi', () => {
  beforeEach(() => {
    jest.resetModules();
    global.fetch = jest.fn();
    api = require('./exerciseApi');
  });

  afterEach(() => jest.resetAllMocks());

  const mockExercises = () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true, data: exercises }) });
  };

  it('normalizes the free ExerciseDB response and derives body parts', async () => {
    mockExercises();

    await expect(api.getBodyParts()).resolves.toEqual(['all', 'chest', 'upper legs']);
    await expect(api.getExercises('chest')).resolves.toMatchObject([{ id: 'push-up', target: 'pectorals' }]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toContain('oss.exercisedb.dev/api/v1/exercises');
  });

  it('searches the cached exercise library', async () => {
    mockExercises();

    await expect(api.searchExercises('  QUAD ')).resolves.toMatchObject([{ id: 'squat' }]);
  });

  it('uses cached data for details and related exercises', async () => {
    mockExercises();

    await expect(api.getExerciseDetail('push-up')).resolves.toMatchObject({ id: 'push-up', bodyPart: 'chest' });
    await expect(api.getRelatedExercises({ target: 'pectorals', equipment: 'body weight' })).resolves.toMatchObject({
      targetMuscleExercises: [{ id: 'push-up' }],
      equipmentExercises: [{ id: 'push-up' }, { id: 'squat' }]
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('uses the official YouTube API only when a key is configured', async () => {
    const originalKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    process.env.REACT_APP_YOUTUBE_API_KEY = 'youtube-key';
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [{ id: { videoId: 'video-1' }, snippet: { title: 'Push-up form', channelTitle: 'Fit channel', thumbnails: { high: { url: 'thumb.jpg' } } } }] })
    });

    try {
      await expect(api.getExerciseVideos('push up')).resolves.toMatchObject([{ video: { videoId: 'video-1' } }]);
    } finally {
      if (originalKey === undefined) delete process.env.REACT_APP_YOUTUBE_API_KEY;
      else process.env.REACT_APP_YOUTUBE_API_KEY = originalKey;
    }
  });
});
