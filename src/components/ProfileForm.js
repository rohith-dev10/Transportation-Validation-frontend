import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralDetailsForm from './GeneralDetailsForm';
import EducationIdentificationForm from './EducationIdentificationForm';
import RecommendationsRemarksForm from './RecommendationsRemarksForm';
import CredentialsWorkForm from './CredentialsWorkForm';
import { Heading, useToast } from '@chakra-ui/react';

const ProfileForm = () => {
    const { userId } = useParams();
    const [formData, setFormData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useNavigate();
    const toast = useToast();
    // const baseurl="https://transportation-validation-platform.onrender.com"
    const baseurl = process.env.REACT_APP_baseurl

    useEffect(() => {
        // Fetch user profile data based on userId
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${baseurl}/api/users/profile/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const userData = await response.json();
                setFormData(userData); // Populate form data with fetched user data
            } catch (error) {
                console.error('Error fetching user profile:', error);
                // Handle error fetching user data
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const token = localStorage.getItem('token');
        try {
            // Update user profile data
            const response = await fetch(`${baseurl}/api/users/profile/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update user profile');
            }

            const updatedUserData = await response.json();
            console.log(updatedUserData);

            toast({
                title: "Profile updated.",
                description: "Your profile has been updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            // Redirect or navigate to profile page after update
            history(`/user-profile/${userId}`);
        } catch (error) {
            console.error('Error updating user profile:', error);

            toast({
                title: "Error updating profile.",
                description: "There was an error updating your profile. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    // console.log(formData);

    return (
        <div className="profile-form-container">
            <Heading textAlign={'center'}>Complete Your Profile</Heading>

            {currentStep === 1 && (
                <GeneralDetailsForm formData={formData} setFormData={setFormData} onNext={handleNext} />
            )}

            {currentStep === 2 && (
                <EducationIdentificationForm
                    formData={formData}
                    setFormData={setFormData}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}

            {currentStep === 3 && (
                <CredentialsWorkForm
                    formData={formData}
                    setFormData={setFormData}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}

            {currentStep === 4 && (
                <RecommendationsRemarksForm
                    formData={formData}
                    setFormData={setFormData}
                    onPrev={handlePrev}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default ProfileForm;
