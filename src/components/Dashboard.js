import React from 'react';
import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { authState } from '../recoil/atom';
import { useSetRecoilState } from 'recoil';

const Dashboard = () => {
    const navigate = useNavigate();
    const setAuthState = useSetRecoilState(authState);

    const handleProfileSetup = () => {
        // Add logic to check if the user profile is incomplete and redirect accordingly
        // For now, just navigate to the profile page
        // navigate('/profile');
    };

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        
        // Update the authentication state
        setAuthState({
            isAuthenticated: false,
            isProfileComplete: false,
        });
        
        // Navigate to the login page
        navigate('/');
    };

    return (
        <Box p={6} maxW="800px" mx="auto">
            <Heading mb={6}>Dashboard</Heading>
            <VStack spacing={4}>
                <Text>Welcome to your dashboard. Here you can manage your profile, view statistics, and more.</Text>
                {/* <Button colorScheme="blue" onClick={handleProfileSetup}>Set Up Profile</Button> */}
                {/* Add more dashboard content here */}
                <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
            </VStack>
        </Box>
    );
};

export default Dashboard;
