import { useState, useEffect } from 'react';

function GeoLocation({ onSuccess, onError }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(new Error('Geolocation is not supported.'));
      return;
    }

    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      onSuccess({ latitude, longitude });
    };

    const errorHandler = (error) => {
      setError(error);
      onError && onError(error);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, [onSuccess, onError]);

  return error;
}

export default GeoLocation;
