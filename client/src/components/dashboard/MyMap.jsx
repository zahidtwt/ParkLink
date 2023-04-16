import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import mapboxgl from 'mapbox-gl';
import parking from './parking.svg';
import ParkingInfo from '../parking/ParkingInfo';
import { useDisclosure } from '@chakra-ui/react';
import CenterButton from './CenterButton';

mapboxgl.accessToken =
  'pk.eyJ1IjoiemFoaWR0d3QiLCJhIjoiY2xnaWV0YXB1MHVzNDNwbXk4NmdjZDBzZiJ9.7yB9lTwtcki0wvg2BQHNaw';

const GeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Parking List',
      properties: {
        address: 'Zahid er Basa, Gazipur, Dhaka',
        hourly: true,
        monthly: true,
        time: '8am - 8pm',
        rate: '20tk/hour',
        vehicle: 'Bike/Car',
        slot: '10',
        cctv: true,
        guard: true,
        rules: [
          'No Overnight Parking Allowed',
          'Standard-Sized Vehicles Only',
          'No Smoking or Littering Permitted',
        ],
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

  /// user location

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

    const userLocationEl = document.createElement('div');
    userLocationEl.className = 'user-location-marker';
    userLocationEl.style.backgroundImage = `url('https://raw.githubusercontent.com/zahidtwt/zahidlive/main/277801721_1146010236235641_4251157026316733609_n.jpg')`;
    userLocationEl.style.width = '30px';
    userLocationEl.style.height = '30px';
    userLocationEl.style.backgroundSize = '100%';
    userLocationEl.style.borderRadius = '50%';

    new mapboxgl.Marker(userLocationEl)
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    // Add user location circle
    map.current.on('load', () => {
      map.current.addSource('user-location-circle', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
            },
          ],
        },
      });
      map.current.addLayer({
        id: 'user-location-circle',
        type: 'circle',
        source: 'user-location-circle',
        paint: {
          'circle-radius': {
            stops: [
              [0, 50],
              [20, 100],
            ],
            base: 2,
          },
          'circle-color': '#007cbf',
          'circle-opacity': 0.2,
        },
      });
    });
  });

  return (
    <>
      <div ref={mapContainer} style={{ height: '100vh' }} />;
      <CenterButton map={map} latitude={latitude} longitude={longitude} />
      <ParkingInfo msg={msg} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default MyMap;
