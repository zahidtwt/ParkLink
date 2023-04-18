import {
  Flex,
  Input,
  VStack,
  Button,
  InputGroup,
  FormControl,
  InputLeftAddon,
  Heading,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import uploadMapboxImageToCloudinary from './mapimgtocloudinary';

import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useUpdateUserInfoMutation } from '../../../features/auth/authApi';

export default function Profile() {
  const longitude = 90.331753;
  const latitude = 24.004864;
  const yourAsyncFunction = async () => {
    // do something asynchronously and return a promise
    const imageUrl = await uploadMapboxImageToCloudinary(longitude, latitude);
    console.log(imageUrl);
  };

  const { user } = useSelector((state) => state.auth);
  const [updateUser, { isLoading, error }] = useUpdateUserInfoMutation();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      number: user.mobile,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      dob: user.dob ? new Date(user.dob).toISOString().slice(0, 10) : '',
      gender: user.gender,
    },
  });

  const onSubmit = async (data) => {
    yourAsyncFunction();
    try {
      await updateUser({
        mobile: data.number,
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        dob: data.dob,
        gender: data.gender,
      });
    } catch (err) {
      console.log(err);
    }
    console.log('error', error);
    console.log(data);
  };

  return (
    <FormControl>
      <Flex
        height={'90vh'}
        justifyContent={'center'}
        justifyItems={'center'}
        alignItems={'center'}>
        <VStack shadow={'md'} w='350px' p='10px' borderRadius={10}>
          <VStack h={15}></VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={5}>
              <Heading mb={10}>Update Your Profile</Heading>

              <InputGroup>
                <InputLeftAddon children='+880' />
                <Input
                  {...register('number')}
                  type='tel'
                  placeholder='Phone number'
                  name='number'
                  // disabled
                />
              </InputGroup>
              <Input
                {...register('firstName')}
                type='text'
                placeholder='First Name'
                id='firstName'
              />
              <Input
                {...register('lastName')}
                type='text'
                placeholder='Last Name'
                id='lastName'
              />
              <Input
                {...register('email')}
                type='email'
                id='email'
                placeholder='Email Address'
              />

              <Flex alignItems='center'>
                <FormLabel htmlFor='dob' textAlign='left' mr={4}>
                  Date of Birth
                </FormLabel>
                <Input {...register('dob')} type='date' id='dob' name='dob' />
              </Flex>
              <Flex alignItems='left'>
                <FormLabel htmlFor='gender' textAlign='left' mr={'90px'}>
                  Gender
                </FormLabel>
                <Select
                  {...register('gender')}
                  id='gender'
                  name='gender'
                  placeholder='Select gender'>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>

                  <option value='other'>Other</option>
                </Select>
              </Flex>
              <Button
                isLoading={isLoading}
                loadingText='Updating'
                size='lg'
                colorScheme='purple'
                w={'100%'}
                type='submit'>
                Update Profile
              </Button>
            </VStack>
          </form>
        </VStack>
      </Flex>
    </FormControl>
  );
}
