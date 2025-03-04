import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const UpcomingEvents = () => {
  const events = [
    { id: 1, name: 'Science Fair', date: '2025-03-10' },
    { id: 2, name: 'Art Exhibition', date: '2025-03-15' },
    { id: 3, name: 'Sports Day', date: '2025-03-20' },
    { id: 4, name: 'Music Concert', date: '2025-03-25' },
    { id: 5, name: 'Drama Play', date: '2025-03-30' },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={4}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      <Box sx={{ maxHeight: 300, overflow: 'auto', width: '100%',overflowX: 'hidden' }}>
        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id} variant="outlined" sx={{ mb: 2, width: '100%' }}>
              <CardContent>
                <Typography variant="h6">
                  {event.name}
                </Typography>
                <Typography color="textSecondary">
                  {event.date}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h6">No upcoming events</Typography>
        )}
      </Box>
    </Box>
  );
};

export default UpcomingEvents;