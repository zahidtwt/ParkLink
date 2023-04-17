import React from 'react';
import {
  Checkbox,
  FormControl,
  HStack,
  NumberInput,
  NumberInputField,
  VStack,
} from '@chakra-ui/react';
import { FaMotorcycle, FaCar } from 'react-icons/fa';

function VehicleSection({
  parkingInfo,
  handleCheckboxChange,
  handleNumberInputChange,
}) {
  return (
    <VStack spacing={4} justifyContent={'left'}>
      <FormControl>
        {/* <FormLabel>Vehicle Types</FormLabel> */}
        <HStack>
          {renderVehicleCheckbox('bike', 'Bike', <FaMotorcycle />)}
          {renderVehicleCheckbox('car', 'Car', <FaCar />)}
        </HStack>
      </FormControl>
      <FormControl>
        {/* <FormLabel>Available Slots</FormLabel> */}
        <HStack>
          {renderVehicleSlots('bike', 'Bike Slots')}
          {renderVehicleSlots('car', 'Car Slots')}
        </HStack>
      </FormControl>
    </VStack>
  );

  function renderVehicleCheckbox(name, label, icon) {
    return (
      <HStack>
        <Checkbox
          name={name}
          isChecked={parkingInfo[name]}
          onChange={handleCheckboxChange}>
          {label}
        </Checkbox>
        {icon}
      </HStack>
    );
  }

  function renderVehicleSlots(name, label) {
    const propName = `${name}Slot`;
    return parkingInfo[name] ? (
      <NumberInput
        min={0}
        value={parkingInfo[propName]}
        onChange={(value) => handleNumberInputChange(propName, value)}>
        <NumberInputField placeholder={label} />
      </NumberInput>
    ) : null;
  }
}

export default VehicleSection;
