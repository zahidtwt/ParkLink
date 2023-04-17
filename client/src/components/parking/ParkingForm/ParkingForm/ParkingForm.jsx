import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  VStack,
  Progress,
  useToast,
  Text,
  Flex,
} from '@chakra-ui/react';

import { FaBiking, FaCar } from 'react-icons/fa';
import AddressSection from './AddressSection';
import RulesSection from './RulesSection';
import RateSection from './RateSection';
import VehicleSection from './VehicleSection';
import ImageUpload from './ImageUpload';
import ParkingInfo from './ParkingInfo';

function ParkingForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [parkingInfo, setParkingInfo] = useState({
    location: {
      address: '',
      area: '',
      city: '',
      postCode: '',
      longitude: '',
      latitude: '',
      ptype: '',
    },
    bikeHourly: false,
    bikeMonthly: false,
    carHourly: false,
    carMonthly: false,
    bikeHourlyRate: '',
    bikeMonthlyRate: '',
    carHourlyRate: '',
    carMonthlyRate: '',
    bike: false,
    car: false,
    bikeSlot: '',
    carSlot: '',
    cctv: false,
    guard: false,
    rules: [],
    images: [],
    fromTime: '',
    toTime: '',
  });
  // console.log('parkinginfo', parkingInfo);
  const [step, setStep] = useState(1);
  const [percent, setPercent] = useState(33);
  const [errors] = useState({});

  const toast = useToast();
  const handleCheckboxChange = (e, rule) => {
    if (rule) {
      if (e.target.checked) {
        setParkingInfo({ ...parkingInfo, rules: [...parkingInfo.rules, rule] });
      } else {
        setParkingInfo({
          ...parkingInfo,
          rules: parkingInfo.rules.filter((item) => item !== rule),
        });
      }
    } else {
      setParkingInfo({ ...parkingInfo, [e.target.name]: e.target.checked });
    }
  };
  const handleLocationChange = (e) => {
    setParkingInfo({
      ...parkingInfo,
      location: { ...parkingInfo.location, [e.target.name]: e.target.value },
    });
  };

  const handleInputChange = (e) => {
    setParkingInfo({ ...parkingInfo, [e.target.name]: e.target.value });
  };

  const handleNumberInputChange = (name, value) => {
    setParkingInfo({ ...parkingInfo, [name]: value });
  };
  const handleImageRemove = (imageUrl) => {
    setParkingInfo((prevParkingInfo) => ({
      ...prevParkingInfo,
      images: [prevParkingInfo.images.filter((img) => img !== imageUrl)],
    }));
  };
  const handleImageUpload = (newImages) => {
    setParkingInfo((prevParkingInfo) => ({
      ...prevParkingInfo,
      images: [...prevParkingInfo.images, newImages],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(parkingInfo);
  };
  function handleNextClick() {
    const validationErrors = validateForm(step, parkingInfo);
    if (Object.keys(validationErrors).length === 0) {
      if (step < 4) {
        setStep(step + 1);
        if (step === 1) {
          setPercent(66);
        } else if (step === 2) {
          setPercent(100);
        }
      } else {
        handleSubmit();
      }
    } else {
      toast({
        title: 'Form validation failed',
        description: Object.values(validationErrors).join('\n'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'left-accent',
        position: 'top',
      });
    }
  }
  function validateForm(step, parkingInfo) {
    const errors = {};
    if (step === 1) {
      if (!parkingInfo.location.address) {
        errors.address = 'Address is required';
      }
      if (!parkingInfo.location.city) {
        errors.city = 'City is required';
      }
    } else if (step === 2) {
      if (!parkingInfo.bike && !parkingInfo.car) {
        errors.vehicleTypes = 'At least one vehicle type is required';
      }
      if (parkingInfo.bike && !parkingInfo.bikeSlot) {
        errors.bikeSlot = 'Number of bike slots is required';
      }
      if (parkingInfo.car && !parkingInfo.carSlot) {
        errors.carSlot = 'Number of car slots is required';
      }
    } else if (step === 3) {
      // Validation for step 3
    }
    return errors;
  }
  function handleBackClick() {
    if (step > 1) {
      setStep(step - 1);
      if (step === 3) {
        setPercent(66);
      } else if (step === 2) {
        setPercent(33);
      }
    }
  }

  return (
    <Container maxWidth='container.md'>
      <Box
        mb={20}
        borderWidth={1}
        borderRadius='lg'
        p={6}
        mt={6}
        boxShadow='lg'
        border={'1px solid #CBC3E3'}>
        {' '}
        <Heading
          as='h2'
          size='md'
          mb={4}
          textAlign={'center'}
          textTransform={'uppercase'}>
          Add Parking Information
        </Heading>
        <Progress
          borderRadius={10}
          value={percent}
          size='lg'
          mb={4}
          isAnimated
          colorScheme='purple'
          hasStripe
          transition='all 0.3s ease-in-out'
        />{' '}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {step === 1 && (
              <AddressSection
                parkingInfo={parkingInfo}
                setParkingInfo={setParkingInfo}
                handleLocationChange={handleLocationChange}
                errors={errors}
              />
            )}
            {step === 2 && (
              <>
                <VehicleSection
                  parkingInfo={parkingInfo}
                  handleCheckboxChange={handleCheckboxChange}
                  handleNumberInputChange={handleNumberInputChange}
                  errors={errors}
                />
                <RateSection
                  parkingInfo={parkingInfo}
                  handleInputChange={handleInputChange}
                  handleNumberInputChange={handleNumberInputChange}
                  errors={errors}
                />
              </>
            )}
            {step === 3 && (
              <>
                <RulesSection
                  parkingInfo={parkingInfo}
                  handleCheckboxChange={handleCheckboxChange}
                />
                <ImageUpload
                  uploadedImages={parkingInfo.images}
                  handleImageRemove={handleImageRemove}
                  handleImageUpload={handleImageUpload}
                />
                <FormControl>
                  <FormLabel>Extra Services</FormLabel>
                  <Stack direction='row'>
                    {renderTagCheckbox('cctv', 'CCTV', FaBiking)}
                    {renderTagCheckbox('guard', 'Guard', FaCar)}
                  </Stack>
                </FormControl>
              </>
            )}
            {step === 4 && (
              <ParkingInfo
                parkingInfo={parkingInfo}
                handleEditClick={() => setStep(1)}
              />
            )}

            <Box mt={10}>
              <Stack direction='row' spacing={4} align='center'>
                {step > 1 && (
                  <Button
                    onClick={handleBackClick}
                    colorScheme='gray'
                    w={'100%'}>
                    Back
                  </Button>
                )}
                <Button
                  w={'100%'}
                  colorScheme='purple'
                  onClick={step === 4 ? handleSubmit : handleNextClick}
                  disabled={
                    (step === 1 &&
                      (!parkingInfo.address || !parkingInfo.city)) ||
                    (step === 2 &&
                      ((!parkingInfo.bike && !parkingInfo.car) ||
                        (parkingInfo.bike && !parkingInfo.bikeSlot) ||
                        (parkingInfo.car && !parkingInfo.carSlot)))
                  }>
                  {step === 4 ? 'Submit' : 'Next'}
                </Button>
              </Stack>
            </Box>
          </VStack>
        </form>
      </Box>
    </Container>
  );

  function renderTagCheckbox(name, label, icon) {
    return (
      <Flex
        fontSize={'20px'}
        width={'100%'}
        alignItems='center'
        p='2'
        borderRadius='md'
        transition='all 0.3s ease'
        _hover={{
          bg: 'gray.100',
          cursor: 'pointer',
        }}>
        {icon}
        <Checkbox
          fontSize={'40px'}
          name={name}
          isChecked={parkingInfo[name]}
          onChange={handleCheckboxChange}
          ml='2'
          fontWeight='bold'
          colorScheme='green'>
          <Text fontSize={'lg'}>{label}</Text>
        </Checkbox>
      </Flex>
    );
  }
}

export default ParkingForm;
