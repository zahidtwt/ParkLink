import React from 'react';
import {
  Checkbox,
  Flex,
  FormControl,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaMotorcycle, FaCar } from 'react-icons/fa';

function VehicleSection({
  parkingInfo,
  handleCheckboxChange,
  handleNumberInputChange,
}) {
  return (
    <VStack spacing={4} justifyContent={'center'} width={'100%'}>
      <FormControl>
        <VStack spacing={2}>
          {renderVehicleCheckbox('bike', 'Bike', <FaMotorcycle />)}
          {renderVehicleSlots('bike', 'Bike Slots')}
        </VStack>
      </FormControl>
      <FormControl>
        <VStack spacing={2}>
          {renderVehicleCheckbox('car', 'Car', <FaCar />)}
          {renderVehicleSlots('car', 'Car Slots')}
        </VStack>
      </FormControl>
    </VStack>
  );

  function renderVehicleCheckbox(name, label, icon) {
    return (
      <Flex
        fontSize={'30px'}
        width={'100%'}
        alignItems='center'
        p='2'
        borderRadius='md'
        transition='all 0.3s ease'
        _hover={{
          bg: 'gray.100',
          cursor: 'pointer',
        }}>
        {icon}
        <Checkbox
          fontSize={'40px'}
          name={name}
          isChecked={parkingInfo[name]}
          onChange={handleCheckboxChange}
          ml='2'
          fontWeight='bold'
          colorScheme='green'>
          <Text fontSize={'xl'}>{label}</Text>
        </Checkbox>
      </Flex>
    );
  }

  function renderVehicleSlots(name, label) {
    const propName = `${name}Slot`;
    return parkingInfo[name] ? (
      <NumberInput
        w={'100%'}
        min={1}
        value={parkingInfo[propName]}
        onChange={(value) => handleNumberInputChange(propName, value)}>
        <NumberInputField placeholder={label} />
      </NumberInput>
    ) : null;
  }
}

export default VehicleSection;
