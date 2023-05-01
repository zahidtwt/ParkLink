import { Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import claculateDistance from '../../utils/calculateDistance/calculateDistance';

function DistanceCalculator({ selectedLat, selectedLon }) {
  const [isGeolocationRetrieved, setIsGeolocationRetrieved] = useState(false);
  const cookieLocation = Cookies.get('location');

  useEffect(() => {
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
          setIsGeolocationRetrieved(true);
        },
        (error) => {
          console.error(error);
          setIsGeolocationRetrieved(true);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      setIsGeolocationRetrieved(true);
    }
  }, [cookieLocation]);

  if (!isGeolocationRetrieved) {
    return <Text>Retrieving geolocation...</Text>;
  }
  const { latitude, longitude } = cookieLocation
    ? JSON.parse(cookieLocation).location
    : { userLat: null, userLon: null };

  const distance = claculateDistance(
    latitude,
    longitude,
    selectedLat,
    selectedLon
  );

  return (
    <Text>
      {distance ? <>{distance.toFixed(2)} km</> : <>Calculating...</>}
    </Text>
  );
}

export default DistanceCalculator;
