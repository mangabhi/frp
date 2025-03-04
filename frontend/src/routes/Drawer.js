import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ClassIcon from '@mui/icons-material/Class';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNavigation = (path) => () => {
    navigate(path);
    setOpen(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: 'DashBoard', path: '/',icon:<HomeIcon /> },
          { text: 'Classes', path: '/starred',icon:<ClassIcon /> },
          { text: 'Schedule', path: '/send-email',icon:<ScheduleIcon /> },
          { text: 'Attendance', path: '/drafts',icon:<CoPresentIcon /> },
        ].map((item, index) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={handleNavigation(item.path)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} style={{top:"0"}}><IconButton>
        <HomeIcon />
        </IconButton> 
        </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
