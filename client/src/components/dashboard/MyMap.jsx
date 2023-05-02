import { useDisclosure } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { MAP_BOX_TOKEN } from '../../config';
import ParkingInfo from '../parking/ParkingInfoDisplay';
import CenterButton from './CenterButton';
import parking from './parking.svg';
import SearchLocation from './searchLocation';

mapboxgl.accessToken = MAP_BOX_TOKEN;
// coordinates: { latitude, longitude } }
function MyMap({
  refetch,
  parkings,
  coordinates: { latitude, longitude },
  profileImage,
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const lightMap = 'mapbox://styles/zahidtwt/clgienaqi005u01o1d5rzcmgi';
  const mapStyle = lightMap;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [msg, setMsg] = useState(''); // <- add this line to store the message

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
    // if (!isLoading && !isError && parkings) {
    parkings.forEach((marker) => {
      if ((marker?.bikeSlot === 0 && marker?.carSlot === 0) || marker?.onHold)
        return;
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
        onOpen();
        setMsg(marker);
      });

      // Add markers to the map.

      new mapboxgl.Marker(el)
        .setLngLat([marker?.location?.longitude, marker?.location?.latitude])
        .addTo(map.current);
    });

    const userLocationEl = document.createElement('div');
    userLocationEl.className = 'user-location-marker';
    userLocationEl.style.backgroundImage = `url(${profileImage})`;
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
      <div ref={mapContainer} style={{ height: '100vh' }} />
      <SearchLocation map={map} />
      <CenterButton
        map={map}
        latitude={latitude}
        longitude={longitude}
        refetch={refetch}
      />
      <ParkingInfo msg={msg} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default MyMap;
