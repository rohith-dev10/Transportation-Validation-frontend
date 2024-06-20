import React from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Heading,
	Flex,
} from '@chakra-ui/react';

const CredentialsWorkForm = ({ formData, setFormData, onPrev, onNext }) => {
	const handleChange = (e) => {
		const { name, value } = e.target;
		const keys = name.split('.');
		const newFormData = { ...formData };

		let temp = newFormData;
		for (let i = 0; i < keys.length - 1; i++) {
			if (!temp[keys[i]]) temp[keys[i]] = {};
			temp = temp[keys[i]];
		}
		temp[keys[keys.length - 1]] = value;

		setFormData(newFormData);
	};

	const handleAddItem = (path, newItem) => {
		const keys = path.split('.');
		const newFormData = { ...formData };

		let temp = newFormData;
		for (let i = 0; i < keys.length - 1; i++) {
			if (!temp[keys[i]]) temp[keys[i]] = {};
			temp = temp[keys[i]];
		}
		temp[keys[keys.length - 1]] = [...(temp[keys[keys.length - 1]] || []), newItem];

		setFormData(newFormData);
	};

	const handleRemoveItem = (path, index) => {
		const keys = path.split('.');
		const newFormData = { ...formData };

		let temp = newFormData;
		for (let i = 0; i < keys.length - 1; i++) {
			if (!temp[keys[i]]) temp[keys[i]] = {};
			temp = temp[keys[i]];
		}
		temp[keys[keys.length - 1]] = temp[keys[keys.length - 1]].filter((_, i) => i !== index);

		setFormData(newFormData);
	};

	return (
		<Box p={6} maxW="600px" mx="auto">
			<Heading mb={6}>Credentials and Work</Heading>
			<form onSubmit={(e) => e.preventDefault()}>
				<VStack mb={12} spacing={4}>
					<FormControl>
						<FormLabel>Languages Spoken</FormLabel>
						{formData.personalCredentials.languages.map((language, index) => (
							<Flex mb={4} key={index} alignItems="center">
								<Input
									type="text"
									name={`personalCredentials.languages.${index}.language`}
									value={language.language}
									onChange={handleChange}
									placeholder="Language"
									mr={2}
									flex={1}
								/>
								<Input
									type="text"
									name={`personalCredentials.languages.${index}.proficiency`}
									value={language.proficiency}
									onChange={handleChange}
									placeholder="Proficiency Level"
									mr={2}
									flex={1}
								/>
								<Button
									onClick={() => handleRemoveItem('personalCredentials.languages', index)}
									colorScheme="red"
									size="sm"
									flex={0.25}
								>
									Remove
								</Button>
							</Flex>
						))}
						<Button onClick={() => handleAddItem('personalCredentials.languages', { language: '', proficiency: '' })} mt={2}>
							Add Language
						</Button>
					</FormControl>
					<FormControl>
						<FormLabel>Technical Skills</FormLabel>
						{formData.personalCredentials.skills.technical.map((skill, index) => (
							<Flex mb={4} key={index} alignItems="center">
								<Input
									type="text"
									name={`personalCredentials.skills.technical.${index}`}
									value={skill}
									onChange={handleChange}
									placeholder="Technical Skill"
									mr={2}
									flex={1}
								/>
								<Button
									onClick={() => handleRemoveItem('personalCredentials.skills.technical', index)}
									colorScheme="red"
									size="sm"
									flex={0.25}
								>
									Remove
								</Button>
							</Flex>
						))}
						<Button onClick={() => handleAddItem('personalCredentials.skills.technical', '')} mt={2}>
							Add Technical Skill
						</Button>
					</FormControl>
					<FormControl>
						<FormLabel>Soft Skills</FormLabel>
						{formData.personalCredentials.skills.soft.map((skill, index) => (
							<Flex mb={4} key={index} alignItems="center">
								<Input
									type="text"
									name={`personalCredentials.skills.soft.${index}`}
									value={skill}
									onChange={handleChange}
									placeholder="Soft Skill"
									mr={2}
									flex={1}
								/>
								<Button
									onClick={() => handleRemoveItem('personalCredentials.skills.soft', index)}
									colorScheme="red"
									size="sm"
									flex={0.25}
								>
									Remove
								</Button>
							</Flex>
						))}
						<Button onClick={() => handleAddItem('personalCredentials.skills.soft', '')} mt={2}>
							Add Soft Skill
						</Button>
					</FormControl>
					<FormControl>
						<FormLabel>Employment History</FormLabel>
						{formData.employmentHistory.map((job, index) => (
							<VStack mb={12} key={index} spacing={2} alignItems="flex-start" width="full">
								<Flex width="full" alignItems="center">
									<Input
										type="text"
										name={`employmentHistory.${index}.companyName`}
										value={job.companyName}
										onChange={handleChange}
										placeholder="Company Name"
										mr={2}
										flex={1}
									/>
									<Button
										onClick={() => handleRemoveItem('employmentHistory', index)}
										colorScheme="red"
										size="sm"
										flex={0.25}
									>
										Remove
									</Button>
								</Flex>
								<Input
									type="text"
									name={`employmentHistory.${index}.jobTitle`}
									value={job.jobTitle}
									onChange={handleChange}
									placeholder="Job Title"
									width="full"
								/>
								<Input
									// type="date"
									type="text"
									onFocus={(e) => e.target.type = 'date'}
									onBlur={(e) => e.target.type = 'text'}
									name={`employmentHistory.${index}.startDate`}
									value={job.startDate}
									onChange={handleChange}
									placeholder="Start Date"
									width="full"
								/>
								<Input
									// type="date"
									type="text"
									onFocus={(e) => e.target.type = 'date'}
									onBlur={(e) => e.target.type = 'text'}
									name={`employmentHistory.${index}.endDate`}
									value={job.endDate}
									onChange={handleChange}
									placeholder="End Date"
									width="full"
								/>
								<Input
									type="text"
									name={`employmentHistory.${index}.responsibilities`}
									value={job.responsibilities}
									onChange={handleChange}
									placeholder="Responsibilities"
									width="full"
								/>
								<Input
									type="text"
									name={`employmentHistory.${index}.achievements`}
									value={job.achievements}
									onChange={handleChange}
									placeholder="Achievements"
									width="full"
								/>
							</VStack>
						))}
						<Button onClick={() => handleAddItem('employmentHistory', { companyName: '', jobTitle: '', startDate: '', endDate: '', responsibilities: '', achievements: '' })} mt={2}>
							Add Employment History
						</Button>
					</FormControl>
					<FormControl>
						<FormLabel>Current Employment</FormLabel>
						<VStack mb={12} spacing={2} alignItems="flex-start" width="full">
							<Input
								type="text"
								name="currentEmployment.employer"
								value={formData.currentEmployment.employer}
								onChange={handleChange}
								placeholder="Employer"
								width="full"
							/>
							<Input
								type="text"
								name="currentEmployment.jobTitle"
								value={formData.currentEmployment.jobTitle}
								onChange={handleChange}
								placeholder="Job Title"
								width="full"
							/>
							<Input
								// type="date"
								name="currentEmployment.startDate"
								value={formData.currentEmployment.startDate}
								onChange={handleChange}
								placeholder="Start Date"
								type="text"
								onFocus={(e) => e.target.type = 'date'}
								onBlur={(e) => e.target.type = 'text'}
								width="full"
							/>
							<Input
								type="text"
								name="currentEmployment.responsibilities"
								value={formData.currentEmployment.responsibilities}
								onChange={handleChange}
								placeholder="Responsibilities"
								width="full"
							/>
						</VStack>
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

export default CredentialsWorkForm;
