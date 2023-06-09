import React from 'react';
import { useGetNearbyParkingsQuery } from '../../features/parking/parkingApi';
import Cookies from 'js-cookie';
import ParkingCart from './ParkingCart';
import Slider from 'react-slick';
import { HStack, Heading, Skeleton } from '@chakra-ui/react';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1.4,
  slidesToScroll: 1.4,
};
function NearbyParking() {
  const cookieLocation = Cookies.get('location');
  if (!cookieLocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        Cookies.set(
          'location',
          JSON.stringify({
            location: { latitude, longitude },
          }),
          { expires: 1 } // 1 day
        );
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  const coordinates = JSON.parse(cookieLocation).location;

  const { latitude, longitude } = coordinates;
  const {
    data: parkings,

    isLoading,
  } = useGetNearbyParkingsQuery(latitude, longitude);
  return (
    <>
      <Heading size={'lg'} m={5}>
        Nearby Parkings
      </Heading>
      {isLoading && (
        <HStack align={'center'} justifyContent={'center'}>
          <Skeleton height={'200px'} width={'230px'} borderRadius={'xl'} />
          <Skeleton height={'200px'} width={'100px'} borderRadius={'xl'} />
        </HStack>
      )}
      <Slider {...settings}>
        {parkings?.map((parking) => (
          <ParkingCart
            key={parking._id}
            parking={parking}
            isExpired={parking.onHold}
          />
        ))}
      </Slider>
    </>
  );
}

export default NearbyParking;
