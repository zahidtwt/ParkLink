import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Box,
  Image,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DistanceCalculator from './DistanceCalculator';
import InfoCheap from './InfoCheap';
import { GrMapLocation, GrAlarm } from 'react-icons/gr';
import { FaMotorcycle, FaCar } from 'react-icons/fa';
import { ImClock } from 'react-icons/im';
import { BiCctv } from 'react-icons/bi';
import { CiWarning } from 'react-icons/ci';
import { MdBookmarkAdd } from 'react-icons/md';
import { GiPoliceOfficerHead } from 'react-icons/gi';

import PriceBox from './PricerBox';
import { useGetParkingByIdQuery } from '../../features/parking/parkingApi';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function ParkingInfo({ msg, onClose, isOpen }) {
  const { data: parkingInfo } = useGetParkingByIdQuery(msg._id);
  const navigate = useNavigate();

  const selectedLon = parkingInfo?.location?.longitude;
  const selectedLat = parkingInfo?.location?.latitude;
  const time =
    parkingInfo?.fromTime && parkingInfo.toTime
      ? `${formatTime(parkingInfo?.fromTime)} - ${formatTime(
          parkingInfo.toTime
        )}`
      : '24H';
  const selectedBgColor = useColorModeValue('purple.100', 'gray.700');
  // const selectedColor = useColorModeValue('purple.600', 'purple.200');
  const handleBooking = () => {
    navigate('/booking', { state: { parkingInfo } });
  };
  return (
    <>
      <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopLeftRadius={20} borderTopRightRadius={20}>
          <DrawerCloseButton
            borderRadius={50}
            bg={selectedBgColor}
            size={'lg'}
          />

          <DrawerHeader borderBottomWidth='1px'>Parking Details</DrawerHeader>
          <DrawerBody>
            {/* SLIDER */}

            <Box maxW='500px' mx='1' mt={8}>
              <Slider {...settings}>
                {parkingInfo?.images?.map((image, index) => (
                  <Box key={index} mb={4}>
                    <Image src={image} borderRadius={10} />
                  </Box>
                ))}
              </Slider>
            </Box>
            <HStack justifyContent={'space-between'}>
              <VStack align={'left'} mb={3}>
                <Heading size={'md'}>Parking Space at Konabari</Heading>
                <Text>{parkingInfo?.location?.address}</Text>
              </VStack>

              <Text pr={2} pb={5}>
                <MdBookmarkAdd size={30} color='#6B46C1' />
              </Text>
            </HStack>
            {/* DISTANCE */}
            <HStack flexWrap='wrap' mb={2}>
              <InfoCheap
                text={
                  <DistanceCalculator
                    selectedLat={selectedLat}
                    selectedLon={selectedLon}
                  />
                }
                color={'purple'}
                icon={GrMapLocation}
                size={'md'}
              />
              <InfoCheap
                text={time}
                color={'purple'}
                icon={GrAlarm}
                size={'md'}
              />
              {parkingInfo?.hourly ? (
                <InfoCheap
                  text={'Hourly'}
                  color={'purple'}
                  icon={ImClock}
                  size={'md'}
                />
              ) : null}
            </HStack>
            <HStack>
              <InfoCheap
                text={'Bike'}
                color={'green'}
                icon={FaMotorcycle}
                size={'md'}
              />
              <InfoCheap
                text={'Car'}
                color={'green'}
                icon={FaCar}
                size={'md'}
              />
              {parkingInfo?.cctv ? (
                <InfoCheap
                  text='CCTV'
                  color={'blue'}
                  icon={BiCctv}
                  size={'md'}
                />
              ) : null}
              {parkingInfo?.guard ? (
                <InfoCheap
                  text='Guard'
                  color={'blue'}
                  icon={GiPoliceOfficerHead}
                  size={'md'}
                />
              ) : null}
            </HStack>

            <VStack align={'left'} mb={3} mt={5}>
              <Heading size={'md'}>Parking Rules</Heading>
              <UnorderedList listStyleType='none'>
                {parkingInfo?.rules
                  ? parkingInfo.rules.map((rule) => (
                      <HStack key={rule}>
                        <Text display={'inline'}>
                          {<CiWarning color='red' />}
                        </Text>
                        <ListItem mb={1}>{rule}</ListItem>
                      </HStack>
                    ))
                  : null}
              </UnorderedList>
            </VStack>
            <PriceBox parkingInfo={parkingInfo} />

            <Button
              onClick={handleBooking}
              colorScheme='purple'
              w={'100%'}
              borderRadius={20}
              mb={5}
              mt={2}>
              Book Parking
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function formatTime(time) {
  const [hour, minute] = time.split(':');
  const date = new Date(0, 0, 0, hour, minute);
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleTimeString([], options);
}
export default ParkingInfo;
