import React, { useState } from 'react';
import MiniParkingInfo from './BookingInfo';
import { useGetBookingsByUserIdQuery } from '../../features/booking/bookingApi';
import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react';

function AllBookings() {
  const { data: bookings, error, isLoading } = useGetBookingsByUserIdQuery();
  const [activeButton, setActiveButton] = useState('all');
  const [expiredButton, setExpiredButton] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const isBookingExpired = (booking) => {
    const startDate = new Date(booking.selectedDate);
    const endDate = booking.endDate ? new Date(booking.endDate) : null;
    const now = new Date();
    const endTime = convertToTimeObject(booking.toTime);

    if (endDate) {
      if (endDate.setHours(endTime.hours, endTime.minutes) < now) {
        return true;
      }
    } else {
      if (startDate.setHours(endTime.hours, endTime.minutes) < now) {
        return true;
      }
    }

    return false;
  };

  const convertToTimeObject = (time) => {
    const [hours, minutes] = time.split(':');
    return { hours: parseInt(hours), minutes: parseInt(minutes) };
  };

  const bookingsWithExpiration = bookings.map((booking) => ({
    ...booking,
    isExpired: isBookingExpired(booking),
  }));

  const handleFilterClick = (showExpired) => {
    setActiveButton(showExpired ? 'expired' : 'active');
    setExpiredButton(showExpired);
  };
  const filteredBookings = bookingsWithExpiration.filter((booking) => {
    if (activeButton === 'all') return true;
    if (activeButton === 'active') return !booking.isExpired;
    if (activeButton === 'expired') return booking.isExpired;
  });

  return (
    <VStack mb={'100px'}>
      <Heading
        shadow={'lg'}
        borderRadius={'lg'}
        as='h2'
        size='lg'
        mb={4}
        p={2}
        textAlign={'center'}
        borderBottom={'4px solid #CBC3E3'}>
        Booking History
      </Heading>
      <ButtonGroup mb={4}>
        <Button
          colorScheme={activeButton === 'all' ? 'purple' : 'gray'}
          onClick={() => {
            setActiveButton('all');
            setExpiredButton(false);
          }}>
          All Bookings
        </Button>
        <Button
          colorScheme={activeButton === 'active' ? 'green' : 'gray'}
          onClick={() => handleFilterClick(false)}
          disabled={expiredButton}>
          Active
        </Button>
        <Button
          colorScheme={activeButton === 'expired' ? 'red' : 'gray'}
          onClick={() => handleFilterClick(true)}
          disabled={!expiredButton}>
          Expired
        </Button>
      </ButtonGroup>
      {filteredBookings.map((booking) => (
        <MiniParkingInfo 
          key={booking.bookingId}
          booking={booking}
          isExpired={booking.isExpired}
        />
      ))}
    </VStack>
  );
}

export default AllBookings;
