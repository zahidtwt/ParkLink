import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BiCctv } from 'react-icons/bi';
import { CiWarning } from 'react-icons/ci';
import { FaCar, FaCity, FaMotorcycle } from 'react-icons/fa';
import { GiPoliceOfficerHead } from 'react-icons/gi';
import { GrAlarm, GrMapLocation } from 'react-icons/gr';
import { ImClock } from 'react-icons/im';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import DistanceCalculator from './DistanceCalculator';
import InfoCheap from './InfoCheap';

import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../features/auth/authApi';
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '../../features/booking/bookingApi';
import { useGetParkingByIdQuery } from '../../features/parking/parkingApi';
import PriceBox from './PricerBox';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function ParkingInfo({ msg, onClose, isOpen }) {
  const { data: parkingInfo } = useGetParkingByIdQuery(msg._id);
  const [addBookmark] = useAddBookmarkMutation();
  const { data: user } = useGetUserQuery();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState(
    user?.bookmarkedParkings?.some((p) => p === parkingInfo?._id) || false
  );

  useEffect(() => {
    setIsBookmarked(
      user?.bookmarkedParkings?.some((p) => p === parkingInfo?._id) || false
    );
  }, [user, parkingInfo]);
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
    navigate(`/book-parking?parkingId=${parkingInfo._id}`);
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(msg._id)
        .then(() => setIsBookmarked(false))
        .catch((err) => console.error(err));
    } else {
      addBookmark(parkingInfo._id)
        .then(() => setIsBookmarked(true))
        .catch((err) => console.error(err));
    }
  };

  if (!parkingInfo) return;
  return (
    <>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopLeftRadius={20} borderTopRightRadius={20}>
          <DrawerCloseButton
            borderRadius={50}
            bg={selectedBgColor}
            size={'lg'}
          />

          <DrawerHeader borderBottomWidth="1px">Parking Details</DrawerHeader>
          <DrawerBody>
            {/* SLIDER */}

            <Box maxW="500px" mx="1" mt={8}>
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
                <Heading size={'md'}>
                  Parking Space at {parkingInfo?.location?.area}
                </Heading>
                <Text>{parkingInfo?.location?.address}</Text>
                <HStack mt={'0!important'}>
                  <FaCity /> <Text>{parkingInfo?.location?.ptype} Area</Text>
                </HStack>
              </VStack>

              <Text pr={2} pb={5}>
                {isBookmarked ? (
                  <MdBookmark
                    size={30}
                    color="#6B46C1"
                    onClick={handleBookmark}
                  />
                ) : (
                  <MdBookmarkBorder
                    size={30}
                    color="#6B46C1"
                    onClick={handleBookmark}
                  />
                )}
              </Text>
            </HStack>
            {/* DISTANCE */}
            <HStack flexWrap="wrap" mb={2}>
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
                  text="CCTV"
                  color={'blue'}
                  icon={BiCctv}
                  size={'md'}
                />
              ) : null}
              {parkingInfo?.guard ? (
                <InfoCheap
                  text="Guard"
                  color={'blue'}
                  icon={GiPoliceOfficerHead}
                  size={'md'}
                />
              ) : null}
            </HStack>

            <VStack align={'left'} mb={3} mt={5}>
              {parkingInfo?.rules && (
                <Heading size={'md'}>Parking Rules</Heading>
              )}
              <UnorderedList listStyleType="none">
                {parkingInfo?.rules
                  ? parkingInfo.rules.map((rule) => (
                      <HStack key={rule}>
                        <Text display={'inline'}>
                          {<CiWarning color="red" />}
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
              colorScheme="purple"
              w={'100%'}
              borderRadius={20}
              mb={5}
              mt={2}
            >
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
