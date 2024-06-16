import React, { useState } from 'react';
import axios from 'axios';
import { useToast, Heading, Box, FormControl, FormLabel, Input, Button, Text, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [isOTPVerified, setIsOTPVerified] = useState(false);
    const [isLoading,setIsLoading]=useState(false)
    const toast = useToast();

    const handleSendOTP = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            toast({
                title: 'OTP Sent',
                description: res.data.msg,
                status: 'success',
                duration: 3000,
                isClosable: true
            });
            setIsOTPSent(true);
            setIsLoading(false)
        } catch (err) {
            toast({
                title: 'Error',
                description: err.response.data,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            setIsLoading(false)
        }
    };

    const handleVerifyOTP = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/reset-password', { email, otp, newPassword });
            toast({
                title: 'Password Reset',
                description: res.data.msg,
                status: 'success',
                duration: 3000,
                isClosable: true
            });
            setIsOTPVerified(true);
            setIsLoading(false)
            // Optionally, redirect the user to login after successful password reset
        } catch (err) {
            toast({
                title: 'Invalid OTP',
                description: 'Please enter a valid OTP.',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            setIsLoading(false)
        }
    };

    return (
        <Flex align="center" justify="center" height="100vh">
            <Box width="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
                <Heading as="h2" size="lg" textAlign="center" mb={6}>Forgot Password</Heading>
                {!isOTPSent ? (
                    <form onSubmit={handleSendOTP}>
                        <FormControl mb={4}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </FormControl>
                        <Button type="submit" colorScheme="teal" width="full" isLoading={isLoading}>Send OTP</Button>
                    </form>
                ) : !isOTPVerified ? (
                    <form onSubmit={handleVerifyOTP}>
                        <FormControl mb={4}>
                            <FormLabel>Enter OTP</FormLabel>
                            <Input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} required />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>New Password</FormLabel>
                            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        </FormControl>
                        <Button type="submit" colorScheme="teal" width="full" isLoading={isLoading}>Verify OTP and Set Password</Button>
                    </form>
                ) : (
                    <Text mt={4} textAlign="center">Password reset successfully.
                    <Link to={"/"} className='forgot-password'> Login</Link>
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default ForgotPassword;
