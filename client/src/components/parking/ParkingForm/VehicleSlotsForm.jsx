import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
} from '@chakra-ui/react';

function VehicleSlotsForm(props) {
  const { vehicleType } = props;
  const [slots, setSlots] = useState('');

  const handleSlotsChange = (event) => {
    setSlots(event.target.value);
  };

  return (
    <>
      <FormControl id={`${vehicleType}-slots`} mt={4} isRequired>
        <FormLabel>{`${vehicleType} Slots`}</FormLabel>
        <Input
          placeholder={`${vehicleType} Slots`}
          value={slots}
          onChange={handleSlotsChange}
          type='number'
          min={0}
        />
      </FormControl>

      <FormControl id={`${vehicleType}-free-slots`} mt={4}>
        <FormLabel>{`${vehicleType} Free Slots`}</FormLabel>
        <Stack direction='row'>
          {[...Array(parseInt(slots)).keys()].map((i) => (
            <Checkbox key={i} colorScheme='green'>
              {i + 1}
            </Checkbox>
          ))}
        </Stack>
      </FormControl>
    </>
  );
}

export default VehicleSlotsForm;
