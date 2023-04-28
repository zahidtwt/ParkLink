import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import Greeting from './Greeting';
import { IoLocationSharp } from 'react-icons/io5';
import { useGetUserQuery } from '../../features/auth/authApi';
import PhotoWithOverlay from './PhotoWithOverlay';
import BoxWithImage from './BoxWithImage';
import NearbyParking from './NearbyParking';
import CurrentBooking from './CurrentBooking';

function MainPage() {
  const { data: user } = useGetUserQuery();
  // console.log(user);
  return (
    <VStack mt={3} spacing={4} mb={'50px!important'} h={'80vh!important'}>
      <Container>
        <Text
          mb={2}
          bgGradient='linear-gradient(to left, #b928cacf, #553c9a)'
          bgClip='text'
          fontSize='5xl'
          fontWeight='extrabold'>
          ParkLink
        </Text>
        <Flex justifyContent={'space-between'} m={2} mb={5}>
          <HStack>
            <Text fontSize={'30px'}>
              <IoLocationSharp />
            </Text>
            <VStack align={'left'}>
              <Text fontSize={'sm'} mb={'0!important'}>
                Location
              </Text>
              <Text fontWeight={500} fontSize={'md'} mt={'0!important'}>
                Gazipur, Bangladesh
              </Text>
            </VStack>
          </HStack>

          <Box>
            <Avatar src={user?.profileImage} />
          </Box>
        </Flex>
        <PhotoWithOverlay />
        <BoxWithImage />
        <NearbyParking />
        {/* <CurrentBooking /> */}
      </Container>
    </VStack>
  );
}

export default MainPage;