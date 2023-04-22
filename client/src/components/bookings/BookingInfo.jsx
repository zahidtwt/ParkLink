import {
  Heading,
  HStack,
  Box,
  Image,
  Container,
  Text,
  Button,
  VStack,
  Flex,
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCalendar, FaClock, FaMoneyBillAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Expired from './Expired';
import ParkingInfo from '../parking/ParkingInfoDisplay';
function MiniParkingInfo({ booking, isExpired }) {
  const startDate = new Date(booking.selectedDate);
  const endDate = booking.endDate ? new Date(booking.endDate) : null;

  const convertTo12Hour = (time) => {
    let hour = parseInt(time.split(':')[0]);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:00 ${suffix}`;
  };
  const mapImage =
    booking?.parking?.images[booking?.parking?.images?.length - 1];
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleClick() {
    onOpen();
  }
  return (
    <>
      <ParkingInfo msg={booking?.parking} isOpen={isOpen} onClose={onClose} />
      <Container maxW={'container.xl'} mt={'5!important'}>
        <VStack
          onClick={handleClick}
          position='relative'
          boxShadow='0px 11px 23px -3px rgba(0,0,0,0.2)'
          borderRadius={'xl'}
          spacing={2}
          p={3}>
          {isExpired && (
            <Flex
              position='absolute'
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundColor='rgba(128,128,128,0.4)'
              borderRadius={'xl'}
              zIndex={1}>
              <Expired />
              <Center width='100%' height='100%'>
                <Link to={`/book-parking/?parkingId=${booking?.parking?._id}`}>
                  <Button color={'purple.500'} shadow={'lg'}>
                    <Text>Book Again</Text>
                  </Button>
                </Link>
              </Center>
            </Flex>
          )}
          <HStack justifyItems={'end'} zIndex={0}>
            <Box>
              <Image
                borderRadius={'xl'}
                shadow={'lg'}
                src={mapImage}
                alt={booking.address}
                maxW={'120px'}
                mr={1}
                // maxH={'80px'}
              />
            </Box>
            <Box ml={1}>
              <HStack>
                <Text>Booking ID:</Text>
                <Heading size={'sm'}>{booking.bookingId}</Heading>
              </HStack>
              <div>
                <HStack>
                  <FaCalendar color='var(--chakra-colors-purple-400)' />{' '}
                  <p>
                    {startDate.toLocaleDateString()}{' '}
                    {endDate && `to ${endDate.toLocaleDateString()}`}
                  </p>
                </HStack>

                <HStack>
                  <FaClock color='var(--chakra-colors-purple-400)' />{' '}
                  <p>
                    {convertTo12Hour(booking?.fromTime)} to{' '}
                    {convertTo12Hour(booking?.toTime)}
                  </p>
                </HStack>

                <HStack>
                  <FaMoneyBillAlt color='var(--chakra-colors-purple-400)' />{' '}
                  <p>{booking.cost} BDT</p>
                </HStack>
                {/* Add more fields or elements as needed */}
              </div>
            </Box>
          </HStack>

          <HStack mt={2}>
            <Button size={'sm'} colorScheme='red' variant={'outline'}>
              Cancel
            </Button>
            <Button size={'sm'} colorScheme='blue' variant={'outline'}>
              Change Date/Time
            </Button>
            <Button size={'sm'} colorScheme='green'>
              Navigate
            </Button>
          </HStack>
        </VStack>
      </Container>
    </>
  );
}

export default MiniParkingInfo;
