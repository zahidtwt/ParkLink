import { useState, useEffect } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';

import { FaSearchLocation } from 'react-icons/fa';

const DebouncedInput = ({ onChange, delay, ...rest }) => {
  const searchBg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('purple.900', 'white');
  // const searchIcon = useColorModeValue('purple', 'lighgray');

  const [value, setValue] = useState(rest.defaultValue || '');

  useEffect(() => {
    const timerId = setTimeout(() => {
      onChange(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, onChange, delay]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <InputGroup
      position='fixed'
      top='80px'
      left='50%'
      transform='translate(-50%, -50%)'
      zIndex={10}
      // mx={10}
      minWidth={'325px'}
      maxWidth={'325px'}>
      <InputRightElement
        pr={3}
        pointerEvents='none'
        children={<FaSearchLocation color={'#9F7AEA'} size={20} />}
      />
      <Input
        {...rest}
        textColor={textColor}
        defaultValue={value}
        onChange={handleChange}
        borderRadius='50'
        borderWidth={1}
        border='gray.100 2px solid'
        // boxShadow='xl'
        shadow={'xl'}
        fontSize='lg'
        bgColor={searchBg}
        p={5}
        _focus={{
          border: '#9F7AEA 2px solid',
          boxShadow: 'xl',
        }}
        placeholder='Search Places... (eg. Dhanmondi)'
      />
    </InputGroup>
  );
};

export default DebouncedInput;
