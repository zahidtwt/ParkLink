// AddressSection.js
import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import DebouncedAddress from './DebouncedAddress';

function AddressSection({
  parkingInfo,
  handleLocationChange,
  errors,
  setParkingInfo,
  // handleLocation,
}) {
  const [, setLocationValue] = useState({});
  const handleLocation = (location) => {
    setLocationValue(location);
    setParkingInfo((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        area: location.area,
        postCode: location.postCode,
        address: location.address,
        city: location.city,
        longitude: location.longitude,
        latitude: location.latitude,
        ptype: location.pType,
      },
    }));
  };

  return (
    <VStack spacing={4} w={'100%'}>
      <FormControl>
        <FormLabel>Search Your Place</FormLabel>
        <Text fontSize={'sm'} fontStyle={'italic'} mb={1}>
          Search your place and select from the list
        </Text>
        <DebouncedAddress
          setLocationValue={handleLocation}
          addressValue={'zahid'}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          name='address'
          value={parkingInfo.location.address}
          onChange={handleLocationChange}
          placeholder='Address'
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Area</FormLabel>
        <Input
          name='area'
          value={parkingInfo.location.area}
          onChange={handleLocationChange}
          placeholder='Area'
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>City</FormLabel>
        <Input
          name='city'
          value={parkingInfo.location.city}
          onChange={handleLocationChange}
          placeholder='City'
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Post Code</FormLabel>
        <Input
          name='postCode'
          value={parkingInfo.location.postCode}
          onChange={handleLocationChange}
          placeholder='Post Code'
        />
      </FormControl>
    </VStack>
  );
}

export default AddressSection;
