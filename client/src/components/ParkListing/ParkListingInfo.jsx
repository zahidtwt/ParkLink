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
import {
  FaMapMarkedAlt,
  FaClock,
  FaParking,
  FaRegEdit,
  FaEye,
  FaRegTrashAlt,
} from 'react-icons/fa';
import {
  useRemoveOnHoldMutation,
  useSetOnHoldMutation,
  useDeleteParkingByIdMutation,
} from '../../features/parking/parkingApi';
import ParkingInfo from '../parking/ParkingInfoDisplay';

function ParkListingInfo({ parking, triggerUpdate, refetch }) {
  const [deletePark, { data, isLoading, error, isSuccess, isError }] =
    useDeleteParkingByIdMutation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleClick() {
    onOpen();
  }
  const [setOnHold] = useSetOnHoldMutation({
    onSuccess: () => {
      refetch();
    },
  });
  const [removeOnHold] = useRemoveOnHoldMutation({
    onSuccess: () => {
      refetch();
    },
  });
  const setHold = () => {
    setOnHold({ parkingId: parking._id });
    setTimeout(() => {
      refetch();
    }, 150);
  };
  const removeHold = () => {
    removeOnHold({ parkingId: parking._id });
    setTimeout(() => {
      refetch();
    }, 150);
  };
  const convertTo12Hour = (time) => {
    let hour = parseInt(time.split(':')[0]);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:00 ${suffix}`;
  };
  const handleDelete = () => {
    // alert('delete successfully');
    deletePark(parking._id);
    refetch();
  };

  return (
    <>
      <ParkingInfo msg={parking} isOpen={isOpen} onClose={onClose} />
      <Container maxW={'container.xl'} mt={5}>
        <VStack
          position="relative"
          boxShadow="0px 11px 23px -3px rgba(0,0,0,0.2)"
          borderRadius={'xl'}
          spacing={4}
          p={3}
        >
          {parking.onHold && (
            <Flex
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundColor="rgba(128,128,128,0.4)"
              borderRadius={'xl'}
              zIndex={1}
            >
              <Center width="100%" height="100%">
                {/* <Text fontSize='2xl' fontWeight='bold' color='white'>
                  Expired
                </Text> */}
                <Button
                  onClick={removeHold}
                  colorScheme="green"
                  variant={'outline'}
                  border={'2px solid '}
                  bg={'#f0f0f0d2'}
                >
                  <Text>Activate</Text>
                </Button>
              </Center>
            </Flex>
          )}
          <HStack justifyItems={'end'} zIndex={0}>
            <Box>
              <Image
                borderRadius={'xl'}
                shadow={'lg'}
                src={parking.images[parking.images.length - 1]}
                alt={parking.address}
                maxW={'120px'}
                mr={1}
                // maxH={'80px'}
              />
            </Box>
            <Box ml={1}>
              <HStack>
                <Text>Parking ID:</Text>
                <Heading size={'sm'}>{parking.parkingId}</Heading>
              </HStack>
              <div>
                <HStack>
                  <FaMapMarkedAlt color="var(--chakra-colors-purple-400)" />{' '}
                  <p>
                    {parking.location.address.length > 20
                      ? parking.location.address.slice(0, 20) + '...'
                      : parking.location.address}
                  </p>
                </HStack>

                <HStack>
                  <FaClock color="var(--chakra-colors-purple-400)" />{' '}
                  <p>
                    {convertTo12Hour(parking?.fromTime)} to{' '}
                    {convertTo12Hour(parking?.toTime)}
                  </p>
                </HStack>

                <HStack>
                  <FaParking color="var(--chakra-colors-purple-400)" />{' '}
                  <p>
                    <b>Slots </b>
                    {parking.bikeSlot ? `Bike: ${parking.bikeSlot}` : ''}
                    {parking.carSlot ? ` Car: ${parking.carSlot}` : ''}
                  </p>
                </HStack>
              </div>
            </Box>
          </HStack>

          <HStack mt={2}>
            {parking.onHold && (
              <Button size={'sm'} colorScheme="red">
                Hold
              </Button>
            )}
            {!parking.onHold && (
              <Button
                size={'sm'}
                colorScheme="red"
                variant={'outline'}
                onClick={setHold}
              >
                Hold
              </Button>
            )}
            <Button
              size={'sm'}
              colorScheme="green"
              variant={'outline'}
              onClick={handleClick}
            >
              <FaEye />
            </Button>
            <Button size={'sm'} colorScheme="blue" variant={'outline'}>
              <FaRegEdit />
            </Button>
            <Button
              size={'sm'}
              colorScheme="red"
              variant={'outline'}
              onClick={handleDelete}
            >
              <FaRegTrashAlt />
            </Button>
            <Button size={'sm'} colorScheme="purple" variant={'outline'}>
              Bookings
            </Button>
          </HStack>
        </VStack>
      </Container>
    </>
  );
}

export default ParkListingInfo;