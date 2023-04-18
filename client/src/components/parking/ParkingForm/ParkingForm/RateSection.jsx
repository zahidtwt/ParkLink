import React, { useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
} from '@chakra-ui/react';

function RateSection({ parkingInfo, handleNumberInputChange }) {
  const [fromTime, setFromTime] = useState('');

  const handleFromTimeChange = (value) => {
    setFromTime(value);
    handleNumberInputChange('fromTime', value);
  };
  const showTimePicker = parkingInfo.bikeHourly || parkingInfo.carHourly;

  return (
    <VStack spacing={4} w={'100%'}>
      {parkingInfo.bike && (
        <>
          <FormControl>
            <FormLabel>Bike Parking Rates</FormLabel>
            <HStack w={'100%'}>
              {renderRateCheckbox('bikeHourly', 'Hourly')}
              {renderRateCheckbox('bikeMonthly', 'Monthly')}
            </HStack>
          </FormControl>
          {renderRateInputs('bike')}
        </>
      )}
      {parkingInfo.car && (
        <>
          <FormControl>
            <FormLabel>Car Parking Rates</FormLabel>
            <HStack>
              {renderRateCheckbox('carHourly', 'Hourly')}
              {renderRateCheckbox('carMonthly', 'Monthly')}
            </HStack>
          </FormControl>
          {renderRateInputs('car')}
        </>
      )}
      {showTimePicker && (
        <FormControl>
          <FormLabel>Time Range</FormLabel>
          <HStack>
            <Select
              value={fromTime}
              onChange={(e) => handleFromTimeChange(e.target.value)}>
              {generateTimeOptions().map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </Select>
            <Select
              value={parkingInfo.toTime}
              onChange={(e) =>
                handleNumberInputChange('toTime', e.target.value)
              }
              isDisabled={!fromTime}>
              {timeOptions().map((time) => (
                <option
                  key={time.value}
                  value={time.value}
                  disabled={time.disabled}>
                  {time.label}
                </option>
              ))}
            </Select>
          </HStack>
        </FormControl>
      )}
    </VStack>
  );
  function timeOptions() {
    const options = [];

    for (let hour = 7; hour <= 24; hour++) {
      const value = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      const label =
        hour < 12
          ? `${hour} AM`
          : hour === 24
          ? '12 AM'
          : hour === 12
          ? '12 PM'
          : `${hour - 12} PM`;

      options.push({ value, label });
    }

    return options.filter((option) => option.value > fromTime);
  }

  function renderRateCheckbox(name, label) {
    return (
      <Checkbox
        name={name}
        isChecked={parkingInfo[name]}
        onChange={(event) => {
          handleNumberInputChange(name, event.target.checked);
        }}>
        {label}
      </Checkbox>
    );
  }

  function renderRateInputs(vehicleType) {
    const hourly = `${vehicleType}Hourly`;
    const monthly = `${vehicleType}Monthly`;
    const hourlyRate = `${vehicleType}HourlyRate`;
    const monthlyRate = `${vehicleType}MonthlyRate`;

    return (
      <FormControl>
        <FormLabel>Rate Details</FormLabel>
        <HStack>
          {parkingInfo[hourly] && (
            <NumberInput
              min={0}
              value={parkingInfo[hourlyRate]}
              onChange={(value) => handleNumberInputChange(hourlyRate, value)}>
              <NumberInputField placeholder='Hourly Rate' />
            </NumberInput>
          )}
          {parkingInfo[monthly] && (
            <NumberInput
              min={0}
              value={parkingInfo[monthlyRate]}
              onChange={(value) => handleNumberInputChange(monthlyRate, value)}>
              <NumberInputField placeholder='Monthly Rate' />
            </NumberInput>
          )}
        </HStack>
      </FormControl>
    );
  }
}
function generateTimeOptions() {
  const options = [];

  for (let hour = 7; hour <= 24; hour++) {
    const value = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    const label =
      hour < 12 ? `${hour} AM` : hour === 24 ? '12 AM' : `${hour - 12} PM`;

    options.push({ value, label });
  }

  return options;
}

export default RateSection;
