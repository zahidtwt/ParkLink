import React, { useEffect, useState } from 'react';
import MiniParkingInfo from './ParkListingInfo';
import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react';
import { useGetParkingByUserIdQuery } from '../../features/parking/parkingApi';
import PullToRefresh from 'react-simple-pull-to-refresh';

function ParkListing() {
  // const { data: bookings, error, isLoading } = useGetBookingsByUserIdQuery();

  const {
    data: parkings,
    error,
    isLoading,
    refetch,
  } = useGetParkingByUserIdQuery();
  const refresh = () => {
    return new Promise((resolve, reject) => {
      refetch();
      console.log('Refresh completed successfully!');
      resolve();
    });
  };
  const [activeButton, setActiveButton] = useState('all');
  const [expiredButton, setExpiredButton] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredBookings = parkings.filter((parking) => {
    if (activeButton === 'all') return true;
    if (activeButton === 'active') return !parking.onHold;
    if (activeButton === 'expired') return parking.onHold;
  });
  const handleFilterClick = (showExpired) => {
    setActiveButton(showExpired ? 'expired' : 'active');
    setExpiredButton(showExpired);
  };

  return (
    <PullToRefresh onRefresh={refresh}>
      <VStack mb={'100px'}>
        <Heading
          w={'100%'}
          shadow={'lg'}
          borderRadius={'lg'}
          as='h2'
          size='lg'
          mb={4}
          p={2}
          textAlign={'center'}
          borderBottom={'4px solid #CBC3E3'}>
          Your Parking Spots
        </Heading>
        <ButtonGroup mb={4}>
          <Button
            colorScheme={activeButton === 'all' ? 'purple' : 'gray'}
            onClick={() => {
              setActiveButton('all');
              setExpiredButton(false);
            }}>
            All Parkings
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
            On Hold
          </Button>
        </ButtonGroup>
        {filteredBookings.map((parking) => (
          <MiniParkingInfo
            key={parking._id}
            parking={parking}
            refetch={refetch}
          />
        ))}
      </VStack>
    </PullToRefresh>
  );
}

export default ParkListing;
