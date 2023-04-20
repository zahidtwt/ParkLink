import React, { useEffect } from 'react';
import MiniProduct from './MiniProduct';
import { Box, Heading } from '@chakra-ui/react';
import { useGetAllBookmarkedParkingsQuery } from '../../features/booking/bookingApi';
import PullToRefresh from 'react-simple-pull-to-refresh';

function Bookmarks() {
  const {
    data: parkings,
    isLoading,
    refetch,
  } = useGetAllBookmarkedParkingsQuery();

  const refresh = () => {
    return new Promise((resolve, reject) => {
      refetch();
      console.log('Refresh completed successfully!');
      resolve();
    });
  };
  return (
    <>
      {' '}
      <PullToRefresh onRefresh={refresh}>
        {parkings && (
          <>
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
              Your Bookmarks
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
      </PullToRefresh>
    </>
  );
}

export default Bookmarks;
