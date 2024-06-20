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

const EducationIdentificationForm = ({ formData, setFormData, onPrev, onNext }) => {
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
			<Heading mb={6}>Education and Identification</Heading>
			<form onSubmit={(e) => e.preventDefault()}>
				<VStack spacing={4}>
					<FormControl>
						<FormLabel>Highest Level of Education</FormLabel>
						<Select
							name="education.level"
							value={formData.education.level}
							onChange={handleChange}
							placeholder="Select Education Level"
						>
							<option value="High School">High School</option>
							<option value="Bachelor's">Bachelor's</option>
							<option value="Master's">Master's</option>
							<option value="PhD">PhD</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>Institution Attended</FormLabel>
						<Input
							type="text"
							name="education.institution.name"
							value={formData.education.institution.name}
							onChange={handleChange}
							placeholder="Institution Name"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Degree Earned</FormLabel>
						<Input
							type="text"
							name="education.institution.degreeEarned"
							value={formData.education.institution.degreeEarned}
							onChange={handleChange}
							placeholder="Degree Earned"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Field of Study</FormLabel>
						<Input
							type="text"
							name="education.institution.fieldOfStudy"
							value={formData.education.institution.fieldOfStudy}
							onChange={handleChange}
							placeholder="Field of Study"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Graduation Date</FormLabel>
						<Input
							type="date"
							name="education.institution.graduationDate"
							value={formData.education.institution.graduationDate}
							onChange={handleChange}
							placeholder="Graduation Date"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Type of ID</FormLabel>
						<Select
							name="identification.typeOfId"
							value={formData.identification.typeOfId}
							onChange={handleChange}
							placeholder="Select ID Type"
						>
							<option value="Passport">Passport</option>
							<option value="Driver's License">Driver's License</option>
							<option value="Aadhar ID">Aadhar ID</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>ID Number</FormLabel>
						<Input
							type="text"
							name="identification.idNumber"
							value={formData.identification.idNumber}
							onChange={handleChange}
							placeholder="ID Number"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Expiry Date</FormLabel>
						<Input
							type="date"
							name="identification.expiryDate"
							value={formData.identification.expiryDate}
							onChange={handleChange}
							placeholder="Expiry Date"
						/>
					</FormControl>
					<Button onClick={onPrev} mr={3}>
						Previous
					</Button>
					<Button onClick={onNext} colorScheme="blue" width="full">
						Next
					</Button>
				</VStack>
			</form>
		</Box>
	);
};

export default EducationIdentificationForm;
