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
} from '@chakra-ui/react';
import { FaCalendar, FaClock, FaMoneyBillAlt } from 'react-icons/fa';
import map from '../../assets/map.png';
import { Link } from 'react-router-dom';

function ParkListingInfo({ parking, onHold }) {
  const startDate = new Date(parking.selectedDate);
  const endDate = parking.endDate ? new Date(parking.endDate) : null;

  const convertTo12Hour = (time) => {
    let hour = parseInt(time.split(':')[0]);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:00 ${suffix}`;
  };
  return (
    <>
      <Container maxW={'container.xl'} mt={5}>
        <VStack
          position='relative'
          boxShadow='0px 11px 23px -3px rgba(0,0,0,0.2)'
          borderRadius={'xl'}
          spacing={2}
          p={3}>
          {onHold && (
            <Flex
              position='absolute'
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundColor='rgba(128,128,128,0.4)'
              borderRadius={'xl'}
              zIndex={1}>
              <Center width='100%' height='100%'>
                {/* <Text fontSize='2xl' fontWeight='bold' color='white'>
                  Expired
                </Text> */}
                <Button
                  colorScheme='purple'
                  variant={'outline'}
                  border={'2px solid '}
                  bg={'#f0f0f0d2'}>
                  <Text>Active It</Text>
                </Button>
              </Center>
            </Flex>
          )}
          <HStack justifyItems={'end'} zIndex={0}>
            <Box>
              <Image
                borderRadius={'xl'}
                shadow={'lg'}
                src={map}
                alt={parking.address}
                maxW={'120px'}
                mr={1}
                // maxH={'80px'}
              />
            </Box>
            <Box ml={1}>
              <HStack>
                <Text>parking ID:</Text>
                <Heading size={'sm'}>{parking.parkingId}</Heading>
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
                    {convertTo12Hour(parking?.fromTime)} to{' '}
                    {convertTo12Hour(parking?.toTime)}
                  </p>
                </HStack>

                <HStack>
                  <FaMoneyBillAlt color='var(--chakra-colors-purple-400)' />{' '}
                  <p>{parking.cost} BDT</p>
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

export default ParkListingInfo;
