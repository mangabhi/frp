import { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login_user} = useAuth();
  
    const handleLogin =  () => {
        login_user(username, password);
    }
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                minHeight="500px"
                justifyContent="flex-start"
                alignItems="flex-start"
                width="70%"
                maxWidth="400px"
                mx="auto"
                mt={4}
            >
                <Typography variant="h3" color="textPrimary" gutterBottom alignItems={'center'}>
                    Login
                </Typography>
                <Box mb={2} width="100%">
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your username here"
                    />
                </Box>
                <Box mb={2} width="100%">
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password here"
                    />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{ mb: 2 }}
                >
                    Login
                </Button>
                <Typography variant="body2" color="textSecondary" sx={{ cursor: 'pointer' }}>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default Login;