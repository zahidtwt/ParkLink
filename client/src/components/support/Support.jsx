import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';

export default function SupportUsForm() {
  const toast = useToast(); // Toast notification hook

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Add form submission logic here
    // ...

    // Show success toast notification
    toast({
      title: 'Form submitted',
      description: 'Thank you for your support!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    // Clear form data
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <Box maxW='600px' mx='auto' my='8' padding={10}>
      <Heading mb={10}>Fill the form with your problem</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter your name'
          />
        </FormControl>

        <FormControl isRequired mt='4'>
          <FormLabel>Email</FormLabel>
          <Input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email'
          />
        </FormControl>

        <FormControl isRequired mt='4'>
          <FormLabel>Message</FormLabel>
          <Textarea
            name='message'
            value={formData.message}
            onChange={handleChange}
            placeholder='Enter your message'
            size='sm'
            resize='none'
            minH='120px'
          />
        </FormControl>

        <Button type='submit' colorScheme='purple' mt='4' w={'100%'}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
