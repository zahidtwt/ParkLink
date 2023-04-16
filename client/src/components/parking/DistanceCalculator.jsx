import React, { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';

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

  const userLatRad = degToRad(latitude);
  const userLonRad = degToRad(longitude);
  const selectedLatRad = degToRad(selectedLat);
  const selectedLonRad = degToRad(selectedLon);

  const deltaLat = selectedLatRad - userLatRad;
  const deltaLon = selectedLonRad - userLonRad;
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(userLatRad) *
      Math.cos(selectedLatRad) *
      Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = 6371 * c;

  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  return (
    <Text>
      {distance ? <>{distance.toFixed(2)} km</> : <>Calculating...</>}
    </Text>
  );
}

export default DistanceCalculator;
