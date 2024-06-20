import React from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
} from '@chakra-ui/react';

const RecommendationsRemarksForm = ({ formData, setFormData, onPrev, onSubmit }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        let temp = { ...formData };

        for (let i = 0; i < keys.length - 1; i++) {
            if (!temp[keys[i]]) temp[keys[i]] = {};
            temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = value;

        setFormData({ ...temp, ...formData });
    };

    const handleAddItem = (path, newItem) => {
        const keys = path.split('.');
        let temp = { ...formData };

        for (let i = 0; i < keys.length - 1; i++) {
            if (!temp[keys[i]]) temp[keys[i]] = {};
            temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = [...(temp[keys[keys.length - 1]] || []), newItem];

        setFormData({ ...formData, ...temp });
    };

    const handleRemoveItem = (path, index) => {
        const keys = path.split('.');
        const newFormData = { ...formData };

        let temp = newFormData;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!temp[keys[i]]) {
                // If the nested object doesn't exist, handle the error or create an empty object
                console.error(`Nested object ${keys[i]} does not exist.`);
                return;
            }
            temp = temp[keys[i]];
        }

        if (Array.isArray(temp[keys[keys.length - 1]])) {
            // Filter out the item at the specified index from the array
            temp[keys[keys.length - 1]] = temp[keys[keys.length - 1]].filter((_, idx) => idx !== index);
        } else {
            // Handle error if the target property is not an array
            console.error(`${keys[keys.length - 1]} is not an array.`);
            return;
        }

        // Update formData state with the modified nested structure
        setFormData(newFormData);
    };


    return (
        <Box p={6} maxW="600px" mx="auto">
            <Heading mb={6}>Recommendations and Remarks</Heading>
            <form onSubmit={(e) => e.preventDefault()}>
                <VStack spacing={4}>
                    <FormControl>
                        <FormLabel>Professional References</FormLabel>
                        {formData.recommendations.map((recommendation, index) => (
                            <Box key={index} mb={4}>
                                <Input
                                    type="text"
                                    name={`recommendations.${index}.name`}
                                    value={recommendation.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    mb={2}
                                />
                                <Input
                                    type="text"
                                    name={`recommendations.${index}.relationship`}
                                    value={recommendation.relationship}
                                    onChange={handleChange}
                                    placeholder="Relationship"
                                    mb={2}
                                />
                                <Input
                                    type="text"
                                    name={`recommendations.${index}.company`}
                                    value={recommendation.company}
                                    onChange={handleChange}
                                    placeholder="Company"
                                    mb={2}
                                />
                                <Input
                                    type="text"
                                    name={`recommendations.${index}.contactInformation.phone`}
                                    value={recommendation.contactInformation.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    mb={2}
                                />
                                <Input
                                    type="text"
                                    name={`recommendations.${index}.contactInformation.email`}
                                    value={recommendation.contactInformation.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    mb={2}
                                />
                                <Input
                                    type="text"
                                    name={`recommendations.${index}.letterContent`}
                                    value={recommendation.letterContent}
                                    onChange={handleChange}
                                    placeholder="Recommendation Letter Content"
                                    mb={2}
                                />
                                <Input
                                    // type="date"
                                    type="text"
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = 'text'}
                                    name={`recommendations.${index}.dateOfIssue`}
                                    value={recommendation.dateOfIssue}
                                    onChange={handleChange}
                                    placeholder="Date of Issue"
                                    mb={2}
                                />
                                <Input
                                    type="text"
                                    name={`recommendations.${index}.issuerNameAndPosition`}
                                    value={recommendation.issuerNameAndPosition}
                                    onChange={handleChange}
                                    placeholder="Issuer's Name and Position"
                                    mb={4}
                                />
                                <Button
                                    onClick={() => handleRemoveItem('recommendations', index)}
                                    colorScheme="red"
                                    size="sm"
                                >
                                    Remove
                                </Button>
                            </Box>
                        ))}
                        <Button onClick={() => handleAddItem('recommendations', {
                            name: '',
                            relationship: '',
                            company: '',
                            contactInformation: { phone: '', email: '' },
                            letterContent: '',
                            dateOfIssue: '',
                            issuerNameAndPosition: '',
                        })} mb={4}>
                            Add Recommendation
                        </Button>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Remarks History/Logs</FormLabel>
                        {formData.remarksHistory.map((remark, index) => (
                            <Box key={index} mb={4}>
                                <Input
                                    type="text"
                                    name={`remarksHistory.${index}.sourceOfFeedback`}
                                    value={remark.sourceOfFeedback}
                                    onChange={handleChange}
                                    placeholder="Source of Feedback (Supervisor, Peer, Client)"
                                    mb={2}
                                />
                                <Input
                                    // type="date"
                                    type="text"
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = 'text'}
                                    name={`remarksHistory.${index}.date`}
                                    value={remark.date}
                                    onChange={handleChange}
                                    placeholder="Date"
                                    mb={2}
                                />
                                <Input
                                    type="text"
                                    name={`remarksHistory.${index}.feedbackContent`}
                                    value={remark.feedbackContent}
                                    onChange={handleChange}
                                    placeholder="Feedback Content"
                                    mb={4}
                                />
                                <Button
                                    onClick={() => handleRemoveItem('remarksHistory', index)}
                                    colorScheme="red"
                                    size="sm"
                                >
                                    Remove
                                </Button>
                            </Box>
                        ))}
                        <Button onClick={() => handleAddItem('remarksHistory', {
                            sourceOfFeedback: '',
                            date: '',
                            feedbackContent: '',
                        })} mb={4}>
                            Add Remark
                        </Button>
                    </FormControl>
                    <Button onClick={onPrev} mr={3}>
                        Previous
                    </Button>
                    <Button onClick={onSubmit} colorScheme="blue" width="full">
                        Submit
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default RecommendationsRemarksForm;
