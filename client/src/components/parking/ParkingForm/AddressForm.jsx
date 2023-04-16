import { useState } from 'react';
import { Box, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';

function AddressForm() {
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');

  return (
    <Box maxW='xl' mx='auto' mt={8}>
      <FormControl id='address' isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          placeholder='Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>

      <Flex mt={4}>
        <FormControl id='area' isRequired flex={1} mr={2}>
          <FormLabel>Area</FormLabel>
          <Input
            placeholder='Area'
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </FormControl>

        <FormControl id='city' isRequired flex={1} ml={2}>
          <FormLabel>City</FormLabel>
          <Input
            placeholder='City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormControl>
      </Flex>

      <FormControl id='postcode' isRequired mt={4}>
        <FormLabel>Post Code</FormLabel>
        <Input
          placeholder='Post Code'
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </FormControl>
    </Box>
  );
}

export default AddressForm;
