/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateBookingMutation } from '../../../features/booking/bookingApi';
import { useGetParkingByIdQuery } from '../../../features/parking/parkingApi';
import BookParkingSkeletor from './BookParkingSkeletor';
import { SummaryPage } from './SummaryPage';

export default function BookParking() {
  const [createBooking, { data, isLoading, error, isSuccess, isError }] =
    useCreateBookingMutation();

  const toast = useToast();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const parkingId = searchParams.get('parkingId');

  // const {data: } = useGet
  const { data: parkingInfo, isLoading: isParkingInfoLoading } =
    useGetParkingByIdQuery(parkingId);
  const minDate = new Date().toISOString().split('T')[0];

  const [vehicleType, setVehicleType] = useState('');
  const [selectedDate, setSelectedDate] = useState(minDate);
  const [fromTime, setFromTime] = useState('');
  const noAvailableTimeSlots = useRef(false);
  const [toTime, setToTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showEndDate, setShowEndDate] = useState(false);
  const [cost, setCost] = useState(0);
  const [formData, setFormData] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const fromHour = parseInt(fromTime.split(':')[0]);
    const nextHour = (fromHour + 1) % 24;
    const nextHourString = `${nextHour < 10 ? '0' : ''}${nextHour}:00`;

    if (nextHour <= parseInt(parkingInfo?.toTime.split(':')[0])) {
      setToTime(nextHourString);
    } else {
      setToTime('');
    }
  }, [fromTime, parkingInfo]);
  const handleReviewBooking = (e) => {
    e.preventDefault();
    setFormData({
      cost,
      vehicleType,
      parking_id: parkingInfo?._id,
      selectedDate,
      fromTime,
      toTime,
      ...(showEndDate && { endDate }),
    });
    setShowSummary(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingInfo = {
      cost,
      vehicleType,
      parking_id: parkingInfo._id,
      selectedDate,
      fromTime,
      toTime,
      ...(showEndDate && { endDate }),
    };
    try {
      createBooking(bookingInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const handleVehicleTypeChange = (e) => {
    setVehicleType(e.target.value);
  };
  const toastError = error?.data?.message;
  if (isError) {
    toast({
      title: 'Something went wrong',
      description: toastError,
      status: 'error',
      duration: 3000,
      isClosable: true,
      variant: 'left-accent',
      position: 'top',
    });
  }
  if (isSuccess) {
    console.log(data);
    setTimeout(() => {
      navigate('success', {
        bookingInfo: data?.booking,
        parkingInfo: parkingInfo,
      });
    }, 0);
  }

  const toggleShowEndDate = () => {
    setShowEndDate(!showEndDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;

    if (new Date(newEndDate) > new Date(selectedDate)) {
      setEndDate(newEndDate);
    } else {
      toast({
        title: 'Invalid Input',
        description: 'End date must be greater than the start date',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'left-accent',
        position: 'top',
      });
    }
  };
  const convertTo12Hour = (time) => {
    let hour = parseInt(time.split(':')[0]);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:00 ${suffix}`;
  };
  const generateTimeOptions = (
    startTime,
    endTime,
    disablePast,
    fromTimeValue
  ) => {
    const options = [];
    const start = parseInt(startTime?.split(':')[0]);
    const end = parseInt(endTime?.split(':')[0]);
    const fromHour = fromTimeValue
      ? parseInt(fromTimeValue.split(':')[0])
      : null;

    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    let availableTimeSlots = 0;

    for (let i = start; i <= end; i++) {
      if (fromHour && i <= fromHour) continue;
      const isDisabled =
        disablePast && selectedDate === minDate && i <= currentHour;
      const displayTime = convertTo12Hour(`${i}:00`);
      if (isDisabled) {
        options.push(
          <option key={i} value={`${i}:00`} disabled>
            {displayTime}
          </option>
        );
      } else {
        options.push(
          <option key={i} value={`${i}:00`}>
            {displayTime}
          </option>
        );
        availableTimeSlots++;
      }
    }

    noAvailableTimeSlots.current = availableTimeSlots === 0;

    return options;
  };

  const calculateCost = () => {
    if (!fromTime || !toTime) {
      setCost(0);
      return;
    }

    const fromHour = parseInt(fromTime.split(':')[0]);
    const toHour = parseInt(toTime.split(':')[0]);
    const totalHours = (toHour - fromHour) % 24;

    let days = 1;
    if (showEndDate && endDate) {
      const startDateObj = new Date(selectedDate);
      const endDateObj = new Date(endDate);
      const diffInDays = Math.ceil(
        (endDateObj - startDateObj + 1) / (1000 * 60 * 60 * 24)
      );
      days = diffInDays;
    }

    const hourlyRate =
      vehicleType.toLowerCase() === 'bike'
        ? parkingInfo.bikeHourlyRate
        : parkingInfo.carHourlyRate;
    const calculatedCost = totalHours * hourlyRate * days;

    setCost(calculatedCost);
  };

  useEffect(() => {
    calculateCost();
  }, [fromTime, toTime, selectedDate, endDate, vehicleType]);

  useEffect(() => {
    noAvailableTimeSlots.current = false;
    generateTimeOptions(parkingInfo?.fromTime, parkingInfo?.toTime, true);
  }, [selectedDate]);

  return (
    <VStack spacing={0} p={0} mb={'60px'}>
      {isParkingInfoLoading ? (
        <BookParkingSkeletor />
      ) : !showSummary ? (
        <>
          <Heading
            w={'100%'}
            shadow={'lg'}
            borderRadius={'lg'}
            as="h2"
            size="lg"
            mb={4}
            p={2}
            textAlign={'center'}
            borderBottom={'4px solid #CBC3E3'}
          >
            Book Parking
          </Heading>
          <Image
            src={parkingInfo?.images[0]}
            w={'80%'}
            borderRadius={'2xl'}
            shadow={'md'}
          />
          <Heading size="md" textAlign={'center'} my={'4!important'}>
            {parkingInfo?.location?.address}
          </Heading>
          <form onSubmit={handleReviewBooking}>
            <VStack spacing={4}>
              {(parkingInfo?.bikeSlot > 0 || parkingInfo?.carSlot > 0) && (
                <FormControl isRequired>
                  <FormLabel>Vehicle Type</FormLabel>
                  <Select
                    placeholder="Select Vehicle Type"
                    value={vehicleType}
                    onChange={handleVehicleTypeChange}
                  >
                    {parkingInfo?.bikeSlot > 0 && (
                      <option value="Bike">Bike</option>
                    )}
                    {parkingInfo?.carSlot > 0 && (
                      <option value="Car">Car</option>
                    )}
                  </Select>
                </FormControl>
              )}
              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={selectedDate}
                  min={minDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Checkbox isChecked={showEndDate} onChange={toggleShowEndDate}>
                  More than 1 day
                </Checkbox>
              </FormControl>
              {showEndDate && (
                <FormControl isRequired>
                  <FormLabel>End Date</FormLabel>
                  <Input
                    type="date"
                    value={endDate}
                    min={selectedDate}
                    onChange={handleEndDateChange}
                  />
                </FormControl>
              )}
              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>From</FormLabel>
                  <Select
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    placeholder="Start Time"
                  >
                    {generateTimeOptions(
                      parkingInfo?.fromTime,
                      parkingInfo?.toTime,
                      true
                    )}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>To</FormLabel>
                  <Select
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    placeholder="End Time"
                  >
                    {generateTimeOptions(
                      parkingInfo?.fromTime,
                      parkingInfo?.toTime,
                      true,
                      fromTime
                    )}
                  </Select>
                </FormControl>
              </HStack>
              {noAvailableTimeSlots.current && (
                <Text color="red.500" mt={2}>
                  All time slots for today are unavailable.
                </Text>
              )}
              <Text
                fontSize="xl"
                fontWeight="bold"
                border={'1px solid green'}
                padding={'5px 10px'}
                borderRadius={'md'}
                bg={'green.100'}
              >
                Cost: {cost} Taka
              </Text>

              <Button
                mb={'20!important'}
                w="100%"
                loadingText="Booking..."
                isLoading={isLoading}
                type="submit"
                colorScheme="purple"
                isDisabled={noAvailableTimeSlots.current}
              >
                {showSummary ? 'Book Parking' : 'Review Booking'}
              </Button>
            </VStack>
          </form>{' '}
        </>
      ) : (
        <SummaryPage
          formData={formData}
          onSubmit={handleSubmit}
          onEdit={() => setShowSummary(false)}
          isLoading={isLoading}
        />
      )}
    </VStack>
  );
}
