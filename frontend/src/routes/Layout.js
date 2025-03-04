import React from "react";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { get_notes, logout } from "../endpoints/api";
import {
  Home,
  ClassOutlined,
  TodayOutlined,
  ImportContactsOutlined,
} from "@mui/icons-material";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/login");
    }
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={2}
      >
        <Avatar
          alt="Profile"
          src="/path/to/profile.jpg"
          sx={{ width: 80, height: 80, mb: 2 }}
        />
        <Typography variant="h6">Username</Typography>
      </Box>
      <List>
        <ListItem button onClick={() => navigate("/dashboard")}>
          <IconButton>
            <Home />
          </IconButton>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigate("/classes")}>
          <IconButton>
            <ClassOutlined />
          </IconButton>
          <ListItemText primary="Classes" />
        </ListItem>
        <ListItem button onClick={() => navigate("/dashboard")}>
          <IconButton>
            <TodayOutlined />
          </IconButton>
          <ListItemText primary="Schedule" />
        </ListItem>
        <ListItem button onClick={() => navigate("/dashboard")}>
          <IconButton>
            <ImportContactsOutlined />
          </IconButton>
          <ListItemText primary="Homework" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Container sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            LMS
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
      <Box mt={2}>{children}</Box>
    </Container>
  );
};

export default Layout;
