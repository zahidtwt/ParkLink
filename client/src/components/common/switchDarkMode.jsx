import {
  useColorMode,
  useToast,
  FormControl,
  FormLabel,
  Switch,
  Flex,
} from '@chakra-ui/react';
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
    <Flex py={3}>
      <FormControl
        display='flex'
        alignItems='center'
        justifyContent={'space-between'}>
        <FormLabel htmlFor='dark-mode-toggle' mb='0'>
          Enable dark mode?
        </FormLabel>
        <Switch
          id='dark-mode-toggle'
          onChange={handleClick}
          isChecked={colorMode === 'dark'}
          size='md'
          colorScheme='purple'
          ml='2'
        />
      </FormControl>
    </Flex>
  );
}

export default SwitchDarkMode;
