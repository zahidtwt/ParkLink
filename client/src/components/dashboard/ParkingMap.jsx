import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiemFoaWR0d3QiLCJhIjoiY2xnaWV0YXB1MHVzNDNwbXk4NmdjZDBzZiJ9.7yB9lTwtcki0wvg2BQHNaw';

const GeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        message: 'Foo',
        iconSize: [60, 60],
      },
      geometry: {
        type: 'Point',
        coordinates: [-66.324462, -16.024695],
      },
    },
    {
      type: 'Feature',
      properties: {
        message: 'Bar',
        iconSize: [50, 50],
      },
      geometry: {
        type: 'Point',
        coordinates: [-61.21582, -15.971891],
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
        coordinates: [-63.292236, -18.281518],
      },
    },
  ],
};

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  /*****
   * my Code
   */

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-65.017, -16.457],
      zoom: 5,
    });

    // Add markers to the map.
    GeoJSON.features.forEach((marker) => {
      // Create a DOM element for each marker.
      const el = document.createElement('div');
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = 'marker';
      el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100%';

      el.addEventListener('click', () => {
        window.alert(marker.properties.message);
      });

      // Add markers to the map.
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current);
    });
  }, []);

  return <div ref={mapContainer} style={{ height: '100vh' }} />;
};

export default Map;
