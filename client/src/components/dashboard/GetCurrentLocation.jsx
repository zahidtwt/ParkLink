import { useState } from 'react';
import GeoLocation from './GeoLocation';

function GetCurentLocation() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleSuccess = (position) => {
    setCurrentLocation(position);
  };

  const handleError = (error) => {
    setError(error.message);
  };

  return (
    <div>
      <GeoLocation onSuccess={handleSuccess} onError={handleError} />
      {currentLocation && (
        <div>
          Latitude: {currentLocation.latitude}
          <br />
          Longitude: {currentLocation.longitude}
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
export default GetCurentLocation;
