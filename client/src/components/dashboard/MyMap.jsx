import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import mapboxgl from 'mapbox-gl';
import parking from './parking.svg';
import ParkingInfo from '../parking/ParkingInfo';
import { useDisclosure } from '@chakra-ui/react';

mapboxgl.accessToken =
  'pk.eyJ1IjoiemFoaWR0d3QiLCJhIjoiY2xnaWV0YXB1MHVzNDNwbXk4NmdjZDBzZiJ9.7yB9lTwtcki0wvg2BQHNaw';

const GeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Parking List',
      properties: {
        Address: 'Zahid er Basa',
        type: 'Hourly',
        time: '8am to 8pm',
        rate: '20tk/hour',
        vehicle: 'Bike/Car',
        slot: '10',
        service: 'CCTV, Security',
      },
      geometry: {
        type: 'Parking Point',
        coordinates: [90.317335, 24.004603],
      },
    },
    {
      type: 'Feature',
      properties: {
        message: 'Bar',
        iconSize: [40, 40],
      },
      geometry: {
        type: 'Point',
        coordinates: [90.3167652, 24.0066416],
      },
    },
    {
      type: 'Feature',
      properties: {
        message: 'Baz',
        iconSize: [40, 40],
      },
      geometry: {
        type: 'Point',
        coordinates: [80.3111078, 24.0165401],
      },
    },
  ],
};
function MyMap() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  // const colorMode = localStorage.getItem('chakra-ui-color-mode');
  // const darkMap = 'mapbox://styles/zahidtwt/clgik0tz3006101qyeidl72vg';
  const lightMap = 'mapbox://styles/zahidtwt/clgienaqi005u01o1d5rzcmgi';
  const mapStyle = lightMap;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [msg, setMsg] = useState(''); // <- add this line to store the message
  // const [currentLocation, setCurrentLocation] = useState(null);
  // const [error, setError] = useState(null);
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
  const { latitude, longitude } = JSON.parse(cookieLocation).location;
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [longitude, latitude],
      zoom: 14,
    });
    const width = 40;
    const height = 40;

    // Add markers to the map.
    GeoJSON.features.forEach((marker) => {
      // Create a DOM element for each marker.
      const el = document.createElement('div');
      // const width = marker.properties.iconSize[0];
      // const height = marker.properties.iconSize[1];
      el.className = 'marker';
      el.style.backgroundImage = `url(${parking})`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100%';

      el.addEventListener('click', () => {
        onOpen(); // <- add this line to open the drawer
        setMsg(marker); // <- add this line to store the message
      });

      // Add markers to the map.
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current);
    });
  });

  return (
    <>
      <div ref={mapContainer} style={{ height: '100vh' }} />;
      <ParkingInfo msg={msg} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default MyMap;
