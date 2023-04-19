import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Flex,
  Input,
  VStack,
  Button,
  InputGroup,
  FormControl,
  InputLeftAddon,
  WrapItem,
  Avatar,
  Box,
  AlertIcon,
  AlertTitle,
  Alert,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { verifyMobile } from '../../../features/verifyNumber/verifyNumberAuthSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
export default function InitialCheck() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const { username, error, isError, isLoading } = useSelector(
    (state) => state.verifyMobile
  );
  // get signup true from url param
  const { state } = useLocation();
  const isSignupSuccess = state?.signup;
  const signedMobile = state?.mobile || '';

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values) => {
    try {
      let inputNumber =
        values.number.length > 10
          ? values.number.substring(values.number.length - 10)
          : values.number;
      await dispatch(verifyMobile(inputNumber));
    } catch (err) {
      onOpen();
      console.log(err);
    }
    if (isError) {
      onOpen();
    }
  };
  function handleClick() {
    navigate('/signup');
  }
  useEffect(() => {
    if (username) {
      navigate('pass');
    }
    if (error) {
      onOpen();
    }
  }, [username, error, navigate, onOpen]);

  return (
    <FormControl isRequired>
      <Flex
        height={'90vh'}
        justifyContent={'center'}
        justifyItems={'center'}
        alignItems={'center'}>
        <VStack shadow={'md'} w='350px' p='10px' spacing={10} borderRadius={10}>
          <WrapItem>
            <Avatar size='2xl' />
          </WrapItem>
          {isSignupSuccess && (
            <Alert status='success'>
              <AlertIcon />
              Sign Up Successful, Please Login!
            </Alert>
          )}
          <VStack h={15}></VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box h={'30'}></Box>
            <Box mb={10}>
              {errors.number && (
                <Alert status='error' mb={5} borderRadius={10}>
                  <AlertIcon />
                  <AlertTitle>{errors.number.message}</AlertTitle>
                </Alert>
              )}
              <InputGroup>
                <InputLeftAddon fontSize={'lg'} children='+880' />
                <Input
                  {...(signedMobile ? { value: signedMobile } : {})}
                  fontSize={'lg'}
                  type='tel'
                  placeholder='Mobile number'
                  name='number'
                  {...register('number', {
                    required: 'Type Valid Mobile No',
                    minLength: {
                      value: 10,
                      message: 'Mobile No. Invalid',
                    },
                  })}
                />
              </InputGroup>
            </Box>
            <Button
              isLoading={isLoading}
              loadingText='Checking'
              size='lg'
              colorScheme='purple'
              w={'100%'}
              type='submit'
              mb={5}>
              Next
            </Button>
          </form>
        </VStack>
      </Flex>
      <>
        <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
          <AlertDialogOverlay>
            <AlertDialogContent m={5}>
              <AlertDialogHeader fontSize='2xl' fontWeight='bold'>
                New User?
              </AlertDialogHeader>

              <AlertDialogBody fontSize='xl'>
                Your number isn't registered with us.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose}>Try Again</Button>
                <Button colorScheme='green' onClick={handleClick} ml={3}>
                  Create Account
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    </FormControl>
  );
}
