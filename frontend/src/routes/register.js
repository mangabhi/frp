import { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const { registered_user } = useAuth();
  
    const handleRegister = () => {
         registered_user(username, email, password, passwordConfirm);
    };

    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        position="relative"
        sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
        >
             <Typography
                variant="h1"
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    opacity: 0.1,
                    fontWeight: 'bold',
                    color: 'white',
                    userSelect: 'none',
                }}
            >
                LMS Portal
            </Typography>
            <Container maxWidth="sm">
                <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, position: 'relative', zIndex: 1 }}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        width="100%"
                        maxWidth="400px"
                        mx="auto"
                    >
                        <Typography variant="h3" color="textPrimary" gutterBottom textAlign="center">
                            Register
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
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email here"
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
                        <Box mb={2} width="100%">
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                variant="outlined"
                                type="password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                placeholder="Confirm password here"
                            />
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleRegister}
                            sx={{ mb: 2 }}
                        >
                            Register
                        </Button>
                        <Typography variant="body2" color="textSecondary">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;