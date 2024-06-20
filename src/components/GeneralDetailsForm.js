import React from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Select,
	Heading,
} from '@chakra-ui/react';

const GeneralDetailsForm = ({ formData, setFormData, onNext }) => {
	const handleNestedFieldChange = (path, value) => {
        setFormData(prevFormData => {
            const keys = path.split('.');
            let temp = { ...prevFormData };

            keys.reduce((acc, key, idx) => {
                if (idx === keys.length - 1) {
                    acc[key] = value;
                } else {
                    if (!acc[key]) acc[key] = {}; // Ensure intermediate objects are created
                }
                return acc[key];
            }, temp);

            return temp;
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            handleNestedFieldChange(name, value);
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };


	return (
		<Box p={6} maxW="600px" mx="auto">
			<Heading mb={6}>General Details and Communication</Heading>
			<form onSubmit={(e) => e.preventDefault()}>
				<VStack spacing={4}>
					<FormControl>
						<FormLabel>Full Name</FormLabel>
						<Input
							type="text"
							name="fullName"
							value={formData.fullName}
							onChange={handleChange}
							placeholder="Full Name"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Date of Birth</FormLabel>
						<Input
							type="date"
							name="dateOfBirth"
							value={formData.dateOfBirth}
							onChange={handleChange}
							placeholder="Date of Birth"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Nationality</FormLabel>
						<Input
							type="text"
							name="nationality"
							value={formData.nationality}
							onChange={handleChange}
							placeholder="Nationality"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Gender</FormLabel>
						<Select
							name="gender"
							value={formData.gender}
							onChange={handleChange}
							placeholder="Select Gender"
						>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>Email Address</FormLabel>
						<Input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Email Address"
							isDisabled={true}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Phone Number</FormLabel>
						<Input
							type="tel"
							name="contactInformation.phoneNumber"
							value={formData.contactInformation?.phoneNumber}
							onChange={handleChange}
							placeholder="Phone Number"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Address</FormLabel>
						<Input
							type="text"
							name="contactInformation.address"
							value={formData.contactInformation?.address}
							onChange={handleChange}
							placeholder="Address"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>LinkedIn Profile</FormLabel>
						<Input
							type="text"
							name="professionalNetworks.linkedInProfile"
							value={formData.professionalNetworks?.linkedInProfile}
							onChange={handleChange}
							placeholder="LinkedIn Profile"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Personal Website/Portfolio</FormLabel>
						<Input
							type="text"
							name="professionalNetworks.personalWebsite"
							value={formData.professionalNetworks?.personalWebsite}
							onChange={handleChange}
							placeholder="Personal Website/Portfolio"
						/>
					</FormControl>
					<Button onClick={onNext} colorScheme="blue" width="full">
						Next
					</Button>
				</VStack>
			</form>
		</Box>
	);
};

export default GeneralDetailsForm;
