import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function BookParking() {
  const location = useLocation();
  const parkingInfo = location.state?.parkingInfo;
  const minDate = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(minDate);
  const [fromTime, setFromTime] = useState('');
  const noAvailableTimeSlots = useRef(false);
  const [toTime, setToTime] = useState('');

  useEffect(() => {
    const fromHour = parseInt(fromTime.split(':')[0]);
    const nextHour = (fromHour + 1) % 24;
    const nextHourString = `${nextHour < 10 ? '0' : ''}${nextHour}:00`;

    if (nextHour <= parseInt(parkingInfo.toTime.split(':')[0])) {
      setToTime(nextHourString);
    } else {
      setToTime('');
    }
  }, [fromTime, parkingInfo.toTime]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingInfo = {
      selectedDate,
      fromTime,
      toTime,
    };
    console.log(bookingInfo);
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
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
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
  useEffect(() => {
    noAvailableTimeSlots.current = false;
    generateTimeOptions(parkingInfo.fromTime, parkingInfo.toTime, true);
  }, [selectedDate]);

  return (
    <VStack spacing={4}>
      <Image src={parkingInfo.images[0]} />
      <Text>{parkingInfo.location.area}</Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type='date'
              value={selectedDate}
              min={minDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </FormControl>
          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>From</FormLabel>
              <Select
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                placeholder='Start Time'>
                {generateTimeOptions(
                  parkingInfo.fromTime,
                  parkingInfo.toTime,
                  true
                )}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>To</FormLabel>
              <Select
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                placeholder='End Time'>
                {generateTimeOptions(
                  parkingInfo.fromTime,
                  parkingInfo.toTime,
                  true,
                  fromTime
                )}
              </Select>
            </FormControl>
          </HStack>
          {noAvailableTimeSlots.current && (
            <Text color='red.500' mt={2}>
              All time slots for today are unavailable.
            </Text>
          )}
          <Button
            type='submit'
            colorScheme='purple'
            isDisabled={noAvailableTimeSlots.current}>
            Book Parking
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  VStack,
  Button,
  Select,
} from '@chakra-ui/react';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/red.css';

// ... (other imports and code)

const BookingPage = ({ parkingInfo }) => {
  // ... (states, variables, and functions)

  const [selectedDates, setSelectedDates] = useState([]);

  // ... (other states, variables, and functions)

  return (
    <Box>
      {/* ... (rest of the component) */}
      <FormControl isRequired>
        <FormLabel>Select Dates</FormLabel>
        <DatePicker
          value={selectedDates}
          onChange={setSelectedDates}
          multiple
          format='YYYY-MM-DD'
          calendarPosition='bottom-left'
          disableDay={(date) => date < new Date()}
          hideFooter
          className='rmdp-red'
        />
      </FormControl>
      {/* ... (rest of the component) */}
    </Box>
  );
};
