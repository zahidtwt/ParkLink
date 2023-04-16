import {
  useColorMode,
  useToast,
  FormControl,
  FormLabel,
  Switch,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

function SwitchDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const handleClick = () => {
    toggleColorMode();
    toast({
      status: 'success',
      // position: "top",
      title: 'Success',
      description: 'Mode Changed!',
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <Flex justifyContent={'end'}>
      <IconButton
        // border={'1px solid lightgray'}
        aria-label='Toggle light dark mode'
        onClick={handleClick}
        icon={
          colorMode === 'dark' ? (
            <FaSun color='orange' />
          ) : (
            <FaMoon color='black' />
          )
        }
      />
    </Flex>
  );
}

export default SwitchDarkMode;
