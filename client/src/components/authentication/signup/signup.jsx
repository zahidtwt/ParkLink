import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  VStack,
  Button,
  InputGroup,
  FormControl,
  InputLeftAddon,
  Box,
  AlertIcon,
  AlertTitle,
  Alert,
  InputRightElement,
  Text,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Signup() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <FormControl isRequired>
      <Flex
        height={'90vh'}
        justifyContent={'center'}
        justifyItems={'center'}
        alignItems={'center'}>
        <VStack shadow={'md'} w='350px' p='10px' borderRadius={10}>
          <VStack h={15}></VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={5}>
              <Heading mb={10}>Welcome to ParkLink</Heading>
              <InputGroup>
                <InputLeftAddon children='+880' />
                <Input
                  {...register('number')}
                  type='tel'
                  placeholder='Phone number'
                  name='number'
                />
              </InputGroup>
              <HStack>
                {' '}
                <Input
                  {...register('firstName')}
                  type='text'
                  placeholder='First Name'
                  id='firstName'
                />{' '}
                <Input
                  {...register('lastName')}
                  type='text'
                  placeholder='Last Name'
                  id='lastName'
                />
              </HStack>
              =
              <Input
                {...register('email')}
                type='email'
                id='email'
                placeholder='Email Address'
              />
              <InputGroup>
                <Input
                  {...register('password', {
                    required: "Can't leave empty",
                    minLength: {
                      value: 6,
                      message: 'Minimum 6 characters required.',
                    },
                  })}
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Password'
                  // variant={"filled"}
                  id='password'
                />

                <InputRightElement>
                  <Text h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Text>
                </InputRightElement>
              </InputGroup>
              <Box>
                {errors.password && (
                  <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>{errors.password.message}</AlertTitle>
                  </Alert>
                )}
              </Box>
              <Button size='lg' colorScheme='purple' w={'100%'} type='submit'>
                Sign up
              </Button>
            </VStack>
          </form>
        </VStack>
      </Flex>
    </FormControl>
  );
}
