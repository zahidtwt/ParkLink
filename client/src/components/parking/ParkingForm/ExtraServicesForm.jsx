import { Checkbox, CheckboxGroup, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';

const ExtraServicesForm = () => {
  const [extraServices, setExtraServices] = useState({
    cctv: false,
    guard: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setExtraServices((prevState) => ({ ...prevState, [name]: checked }));
  };

  return (
    <>
      <Text fontWeight='bold' mt='4'>
        Extra Services
      </Text>
      <CheckboxGroup colorScheme='green' onChange={handleCheckboxChange}>
        <HStack mt='2'>
          <Checkbox name='cctv'>CCTV</Checkbox>
          <Checkbox name='guard'>Guard</Checkbox>
        </HStack>
      </CheckboxGroup>
    </>
  );
};

export default ExtraServicesForm;
