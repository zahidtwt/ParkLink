import { Box, Button, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';
import React from 'react';

function BookParkingSkeletor() {
  return (
    <Box padding='6' boxShadow='lg' bg='white'>
      <Skeleton w='350px' h='200px' />
      <VStack mt='4' spacing={5}>
        <SkeletonText noOfLines={3} skeletonHeight='20px' w='100%' />
        <SkeletonText noOfLines={3} skeletonHeight='20px' w='100%' />
        <SkeletonText noOfLines={3} skeletonHeight='20px' w='100%' />
        <SkeletonText noOfLines={3} skeletonHeight='20px' w='100%' />
        <SkeletonText noOfLines={3} skeletonHeight='20px' w='100%' />
      </VStack>
      <Button mt='4' w='100%' isLoading={true} isDisabled={true}>
        Submit
      </Button>
    </Box>
  );
}

export default BookParkingSkeletor;
