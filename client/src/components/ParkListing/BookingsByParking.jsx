import React, { useEffect } from 'react';
import MiniProduct from './MiniProduct';
import { Box, Heading } from '@chakra-ui/react';
import { useGetAllBookmarkedParkingsQuery } from '../../features/booking/bookingApi';
import LoadingOverlay from '../common/LoadingOverlay';

function BookingsByParking(parkingId) {
  const {
    data: parkings,
    isLoading,
    refetch,
  } = useGetAllBookmarkedParkingsQuery(parkingId);
  useEffect(() => {
    <LoadingOverlay />;
    refetch();
  });

  return (
    <>
      {parkings && (
        <>
          <Heading size={'lg'} m={5}>
            Bookmarks
          </Heading>

          {parkings && parkings?.length === 0 && (
            <Box display='flex' justifyContent='center' mt={150}>
              <Heading size={'md'}>No Bookmarks</Heading>
            </Box>
          )}

          {parkings?.map((parking) => (
            <MiniProduct key={parking._id} parking={parking} />
          ))}
        </>
      )}
    </>
  );
}

export default BookingsByParking;
