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
  Avatar,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useUpdateUserInfoMutation } from '../../../features/auth/authApi';
import ProfileImageUploader from './ProfileImageUploader';
import { useState } from 'react';
export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [updateUser, { isLoading, error }] = useUpdateUserInfoMutation();
  const [profileImage, setProfileImage] = useState('');
  console.log(profileImage);
  const handleUploadSuccess = (imageUrl) => {
    setProfileImage(imageUrl);
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      mobile: user.mobile,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dob: user.dob ? new Date(user.dob).toISOString().slice(0, 10) : '',
      gender: user.gender,
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateUser({
        mobile: data.mobile,
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        dob: data.dob,
        gender: data.gender,
        profileImage,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormControl>
      <Flex
        height={'100vh'}
        justifyContent={'center'}
        justifyItems={'center'}
        alignItems={'center'}
        mb={40}>
        <VStack shadow={'md'} w='350px' p='10px' borderRadius={10}>
          <VStack h={15}></VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={5}>
              <Heading mb={10}>Update Your Profile</Heading>
              <Avatar size='xl' src={user.profileImage} />
              <ProfileImageUploader onUploadSuccess={handleUploadSuccess} />
              <InputGroup>
                <InputLeftAddon children='+880' />
                <Input
                  {...register('mobile')}
                  type='tel'
                  placeholder='Phone number'
                  name='mobile'
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
