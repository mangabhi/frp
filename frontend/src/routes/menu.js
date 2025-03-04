import React, { useEffect, useState } from 'react';
import { Box, Typography ,Divider} from '@mui/material';
import { get_notes } from '../endpoints/api';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import ReactBigCalendar from '../components/ReactBigCalendar';
import UpcomingClasses from '../components/UpcomingClasses';
import UpcomingEvents from '../components/UpcomingEvents';
import Attendance from '../components/Attendance';
import { Typewriter } from 'react-simple-typewriter'

const Menu = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const user = true;

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await get_notes();
      setNotes(notes);
    };
    fetchNotes();
  }, []);

  return (
    <Layout>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h3" gutterBottom>
        <Typewriter
          words={['Welcome Roopa!','What would you like to do today?']}
          loop={0}
          cursor
          cursorStyle='@'
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={3000}/>
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" mb={4}>
          <UpcomingClasses />
          <Attendance/>
          <UpcomingEvents />
        </Box>
      <Divider />
      <ReactBigCalendar />
    </Box>
  </Layout>
  );
};

export default Menu;