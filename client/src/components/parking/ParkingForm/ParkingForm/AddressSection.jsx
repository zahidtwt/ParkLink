// AddressSection.js
import React, { useState } from 'react';
import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import DebouncedAddress from './DebouncedAddress';

function AddressSection({
  parkingInfo,
  handleLocationChange,
  errors,
  setParkingInfo,
  // handleLocation,
}) {
  const [locationValue, setLocationValue] = useState({});
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
  console.log(parkingInfo);

  // handleLocationChange();
  // console.log(locationValue);
  return (
    <VStack spacing={4}>
      <FormControl isRequired>
        <FormLabel>Address</FormLabel>
        <DebouncedAddress
          setLocationValue={handleLocation}
          addressValue={'zahid'}
        />
        {/* <Input
          name='address'
          value={parkingInfo.address}
          onChange={handleInputChange}
          placeholder='Address'
        /> */}
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
