import {
  Checkbox,
  CheckboxGroup,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

const RulesForm = () => {
  const [rules, setRules] = useState({
    noOvernightParking: false,
    standardSizedVehiclesOnly: false,
    noSmokingOrLitteringPermitted: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRules((prevState) => ({ ...prevState, [name]: checked }));
  };

  return (
    <>
      <Heading as='h3' size='md' mt='4' fontWeight='bold'>
        Rules
      </Heading>
      <VStack align='flex-start' mt='2'>
        <CheckboxGroup colorScheme='green' onChange={handleCheckboxChange}>
          <Checkbox name='noOvernightParking'>
            No Overnight Parking Allowed
          </Checkbox>
          <Checkbox name='standardSizedVehiclesOnly'>
            Standard-Sized Vehicles Only
          </Checkbox>
          <Checkbox name='noSmokingOrLitteringPermitted'>
            No Smoking or Littering Permitted
          </Checkbox>
        </CheckboxGroup>
      </VStack>
    </>
  );
};

export default RulesForm;
