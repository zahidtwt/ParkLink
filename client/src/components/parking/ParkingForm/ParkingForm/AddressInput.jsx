import { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';

const AddressInput = ({
  addressValue,
  onChange,
  delay,
  showResults,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(addressValue || '');
  useEffect(() => {
    const timerId = setTimeout(() => {
      onChange(inputValue);
    }, delay);

    return () => clearTimeout(timerId);
  }, [inputValue, onChange, delay, addressValue]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    // console.log(address);
  };

  return (
    <Input
      {...rest}
      name='address'
      value={addressValue}
      onFocus={showResults}
      onChange={handleChange}
      placeholder='Address'
    />
  );
};

export default AddressInput;
