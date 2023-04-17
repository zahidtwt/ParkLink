import { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

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
  let localAddress = useSelector((state) => state.location);
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Input
      {...rest}
      name='address'
      value={localAddress.locationValue || inputValue}
      onFocus={showResults}
      onChange={handleChange}
      placeholder='Address'
    />
  );
};

export default AddressInput;
