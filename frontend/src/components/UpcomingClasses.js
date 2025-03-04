import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const UpcomingClasses = () => {
  const classes = [
    { id: 1, name: 'Yoga', date: '2021-12-01' },
    { id: 2, name: 'Pilates', date: '2021-12-05' },
    { id: 3, name: 'Zumba', date: '2021-12-10' },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={4}>
      <Typography variant="h4" gutterBottom>
        Upcoming Classes
      </Typography>
      {classes.length > 0 ? (
        classes.map((classItem) => (
          <Card key={classItem.id} variant="outlined" sx={{ mb: 2, width: '100%' }}>
            <CardContent>
              <Typography variant="h6">
                {classItem.name}
              </Typography>
              <Typography color="textSecondary">
                {classItem.date}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6">No upcoming classes</Typography>
      )}
    </Box>
  );
};

export default UpcomingClasses;