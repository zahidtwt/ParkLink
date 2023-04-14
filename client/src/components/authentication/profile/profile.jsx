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

import { useFormik } from 'formik';

export default function Profile() {
  const formik = useFormik({
    initialValues: {
      number: '1953534243',
      name: '',
      email: '',
      dob: '',
      gender: '',
    },
    // validate: async (values) => {
    //     const errors = {};
    //     if (!values.password) {
    //         errors.password = "Can't leave empty";
    //     } else if (values.password.length <= 6) {
    //         errors.password = "Minimum 6 characters required.";
    //     }
    //     return errors;
    // },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <FormControl isRequired>
      <Flex
        height={'90vh'}
        justifyContent={'center'}
        justifyItems={'center'}
        alignItems={'center'}>
        <VStack shadow={'md'} w='350px' p='10px' borderRadius={10}>
          <VStack h={15}></VStack>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={5}>
              <Heading mb={10}>Update Your Profile</Heading>

              <InputGroup>
                <InputLeftAddon children='+880' />
                <Input
                  {...formik.getFieldProps('number')}
                  type='tel'
                  placeholder='Phone number'
                  name='number'
                  disabled
                />
              </InputGroup>
              <Input
                {...formik.getFieldProps('name')}
                type='text'
                placeholder='Full Name'
                id='name'
              />
              <Input
                {...formik.getFieldProps('email')}
                type='email'
                id='email'
                placeholder='Email Address'
              />

              <Flex alignItems='center'>
                <FormLabel htmlFor='dob' textAlign='left' mr={4}>
                  Date of Birth
                </FormLabel>
                <Input
                  {...formik.getFieldProps('dob')}
                  type='date'
                  id='dob'
                  name='dob'
                />
              </Flex>
              <Flex alignItems='left'>
                <FormLabel htmlFor='gender' textAlign='left' mr={4}>
                  Gender
                </FormLabel>
                <Select
                  {...formik.getFieldProps('gender')}
                  id='gender'
                  name='gender'
                  placeholder='Select gender'>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>

                  <option value='other'>Other</option>
                </Select>
              </Flex>
              <Button size='lg' colorScheme='purple' w={'100%'} type='submit'>
                Update Profile
              </Button>
            </VStack>
          </form>
        </VStack>
      </Flex>
    </FormControl>
  );
}
