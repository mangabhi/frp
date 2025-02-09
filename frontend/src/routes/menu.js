import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button , List, ListItem, ListItemText} from '@mui/material';
import { get_notes,logout } from '../endpoints/api';
// import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import Drawer from "./Drawer"

const Menu = () => {
    const [notes, setNotes] = useState([]);
    const nav=useNavigate()
    const [drawerOpen, setDrawerOpen] = useState(false);
const user =true
    useEffect(() => {
        const fetchNotes = async () => {
            const notes = await get_notes();
            setNotes(notes);
        };
        fetchNotes();
    }, []);

    const handleLogout = async () => {
        const success =await logout();
        if(success){
            nav('/login');
        }

    };
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };
    return (
        <Container>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography variant="h3" gutterBottom>
                    Welcome {user ? user.username : 'Guest'}
                </Typography>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <List>
                        <ListItem button onClick={() => nav('/')}>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button onClick={() => nav('/login')}>
                            <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem button onClick={() => nav('/register')}>
                            <ListItemText primary="Register" />
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>
                <Box mb={4}>
                    {notes.map((note) => (
                        <Typography key={note.id} variant="h6">
                            {note.name}
                        </Typography>
                    ))}
                </Box>
                <Button variant="contained" color="warning" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default Menu;