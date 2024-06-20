import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import { authState } from '../recoil/atom';
import { useSetRecoilState } from 'recoil';

const Profile = () => {
    const { userId } = useParams();
    const [profileData, setProfileData] = useState({});
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();
    const setAuthState = useSetRecoilState(authState);
    const baseurl=process.env.REACT_APP_baseurl
    // const baseurl="https://transportation-validation-platform.onrender.com"

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${baseurl}/api/users/${userId}`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                });
                setUser(res.data.user);
                setProfileData(res.data.profileData || {});
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, [userId]);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${baseurl}/api/users/${userId}/profile`, profileData, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            toast({
                title: "Profile updated.",
                description: "Your profile has been updated successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setAuthState({
                isAuthenticated: true,
                isProfileComplete: true,
            });
            navigate("/dashboard")
        } catch (err) {
            console.error(err);
            toast({
                title: "Error.",
                description: "There was an error updating your profile.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box p={6} maxW="600px" mx="auto">
            <Heading mb={6}>{user.fullName}'s Profile</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    {user.userType === 'Truck Owner' && (
                        <>
                            <FormControl>
                                <FormLabel>Company Name</FormLabel>
                                <Input
                                    type="text"
                                    name="companyName"
                                    value={profileData.companyName || ''}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Maintenance API</FormLabel>
                                <Input
                                    type="text"
                                    name="maintenanceAPI"
                                    value={profileData.maintenanceAPI || ''}
                                    onChange={handleChange}
                                    placeholder="Maintenance API"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Ownership Duration</FormLabel>
                                <Input
                                    type="text"
                                    name="ownershipDuration"
                                    value={profileData.ownershipDuration || ''}
                                    onChange={handleChange}
                                    placeholder="Ownership Duration"
                                />
                            </FormControl>
                        </>
                    )}
                    {user.userType === 'Driver' && (
                        <>
                            <FormControl>
                                <FormLabel>License Number</FormLabel>
                                <Input
                                    type="text"
                                    name="licenseNumber"
                                    value={profileData.licenseNumber || ''}
                                    onChange={handleChange}
                                    placeholder="License Number"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Driving History</FormLabel>
                                <Input
                                    type="text"
                                    name="drivingHistory"
                                    value={profileData.drivingHistory || ''}
                                    onChange={handleChange}
                                    placeholder="Driving History"
                                />
                            </FormControl>
                        </>
                    )}
                    {user.userType === 'Transportation Company' && (
                        <>
                            <FormControl>
                                <FormLabel>Company Name</FormLabel>
                                <Input
                                    type="text"
                                    name="companyName"
                                    value={profileData.companyName || ''}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Telematics API</FormLabel>
                                <Input
                                    type="text"
                                    name="telematicsAPI"
                                    value={profileData.telematicsAPI || ''}
                                    onChange={handleChange}
                                    placeholder="Telematics API"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>CRM API</FormLabel>
                                <Input
                                    type="text"
                                    name="crmAPI"
                                    value={profileData.crmAPI || ''}
                                    onChange={handleChange}
                                    placeholder="CRM API"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Fleet Size</FormLabel>
                                <Input
                                    type="number"
                                    name="fleetSize"
                                    value={profileData.fleetSize || ''}
                                    onChange={handleChange}
                                    placeholder="Fleet Size"
                                />
                            </FormControl>
                        </>
                    )}
                    <Button type="submit" colorScheme="blue" width="full">Submit</Button>
                </VStack>
            </form>
        </Box>
    );
};

export default Profile;
