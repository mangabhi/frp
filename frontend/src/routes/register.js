import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const { registered_user } = useAuth();
  
    const handleRegister =  () => {
         registered_user(username, email, password, passwordConfirm);
    };

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
                <Typography variant="h3" color="textPrimary" gutterBottom>
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
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleRegister}
                >
                    Register
                </Button>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ cursor: 'pointer', marginTop: '10px' }}
                >
                    Already Have an account? <Link to="/login">Sign In</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;