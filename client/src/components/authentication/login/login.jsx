import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Flex,
  Input,
  VStack,
  Button,
  InputGroup,
  FormControl,
  WrapItem,
  Avatar,
  Box,
  AlertIcon,
  AlertTitle,
  Alert,
  InputRightElement,
  Text,
  Heading,
  InputLeftAddon,
} from '@chakra-ui/react';
import avatar from './avatar.svg';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../features/auth/authApi';

export default function Login() {
  const { username, mobile } = useSelector((state) => state.verifyMobile);
  const Navigate = useNavigate();
  const [login, { data, isLoading, error }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await login({
        username,
        password: values.password,
      });
    } catch (err) {}
  };
  useEffect(() => {
    if (error?.data) {
      console.log(error.data);
    }
    if (data) {
      Navigate('/profile');
    }
  }, [error, data, Navigate]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormControl isRequired>
      <Flex
        height={'90vh'}
        justifyContent={'center'}
        justifyItems={'center'}
        alignItems={'center'}>
        <VStack shadow={'md'} w='350px' p='10px' spacing={10} borderRadius={10}>
          <WrapItem>
            <Avatar size='2xl' name='Segun Adebayo' src={avatar} />{' '}
          </WrapItem>
          <Heading>Welcome {username}!</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box h={'20px'} mb={10}>
              {error?.data?.error && (
                <Alert status='error' mb={5} borderRadius={10}>
                  <AlertIcon />
                  <AlertTitle>{error?.data?.error}</AlertTitle>
                </Alert>
              )}
              {errors.password && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>{errors.password.message}</AlertTitle>
                </Alert>
              )}
            </Box>
            <Box mb={5}>
              <InputGroup>
                <InputLeftAddon children='+880' />
                <Input
                  value={mobile}
                  type='tel'
                  placeholder={mobile}
                  name='number'
                  disabled
                  fontSize={'xl'}
                />
              </InputGroup>
            </Box>

            <Box mb={5}>
              <InputGroup>
                <Input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Minimum 6 characters required.',
                    },
                  })}
                  pr='4.5rem'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  id='password'
                />
                <InputRightElement>
                  <Text
                    h='1.75rem'
                    size='sm'
                    onClick={togglePasswordVisibility}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Text>
                </InputRightElement>
              </InputGroup>
            </Box>

            <Button
              size='lg'
              isLoading={isLoading}
              colorScheme='purple'
              w={'100%'}
              type='submit'
              loadingText='Signing in...'>
              Sign in
            </Button>
          </form>
          <Text fontSize={'lg'}>
            Forgot Password?{' '}
            <Link to='/recovery'>
              <u>Reset here</u>
            </Link>
          </Text>
        </VStack>
      </Flex>
    </FormControl>
  );
}
