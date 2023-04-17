// RulesSection.js
import React from 'react';
import {
  Checkbox,
  FormControl,
  FormLabel,
  Stack,
  VStack,
} from '@chakra-ui/react';

function RulesSection({ parkingInfo, handleCheckboxChange }) {
  const rules = [
    'No Overnight Parking Allowed',
    'Standard-Sized Vehicles Only',
    'No Smoking or Littering Permitted',
  ];

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel>Parking Rules</FormLabel>
        <Stack spacing={2}>
          {rules.map((rule, index) => (
            <Checkbox
              key={index}
              name={`rule${index}`}
              isChecked={parkingInfo.rules.includes(rule)}
              onChange={(e) => handleCheckboxChange(e, rule)}>
              {rule}
            </Checkbox>
          ))}
        </Stack>
      </FormControl>
    </VStack>
  );
}

export default RulesSection;
