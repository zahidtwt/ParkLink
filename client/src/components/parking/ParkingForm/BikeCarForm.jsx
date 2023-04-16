import React from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MdAdd, MdRemove } from 'react-icons/md';

const BikeCarForm = ({ vehicleType, setVehicleType, slots, setSlots }) => {
  const handleSlotsChange = (index, value) => {
    const newSlots = [...slots];
    newSlots[index] = value;
    setSlots(newSlots);
  };

  const handleAddSlot = () => {
    setSlots([...slots, '']);
  };

  const handleRemoveSlot = (index) => {
    const newSlots = [...slots];
    newSlots.splice(index, 1);
    setSlots(newSlots);
  };

  return (
    <Box>
      <Flex align='center' justify='space-between'>
        <Heading as='h3' fontSize='xl' mb='4'>
          {vehicleType === 'bike' ? 'Bike Slots' : 'Car Slots'}
        </Heading>
        <Flex align='center'>
          <Text fontSize='md' mr='4'>
            {vehicleType === 'bike' ? 'Add Bike Slot' : 'Add Car Slot'}
          </Text>
          <IconButton
            icon={<MdAdd />}
            size='sm'
            variant='outline'
            onClick={handleAddSlot}
            aria-label='Add Slot'
          />
        </Flex>
      </Flex>
      {slots.map((slot, index) => (
        <Flex align='center' key={index} mb='2'>
          <Input
            type='text'
            value={slot}
            onChange={(event) => handleSlotsChange(index, event.target.value)}
            mr='2'
          />
          <IconButton
            icon={<MdRemove />}
            size='sm'
            variant='outline'
            onClick={() => handleRemoveSlot(index)}
            aria-label='Remove Slot'
          />
        </Flex>
      ))}
    </Box>
  );
};

export default BikeCarForm;
