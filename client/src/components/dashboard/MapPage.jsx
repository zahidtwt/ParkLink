import Cookies from 'js-cookie';
import { useGetAllParkingQuery } from '../../features/parking/parkingApi';
import MyMap from './MyMap';
import { useSelector } from 'react-redux';

function MapPage() {
  const {
    data: parkings,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllParkingQuery();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

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
  return (
    <MyMap
      parkings={parkings}
      coordinates={coordinates}
      refetch={refetch}
      profileImage={user.profileImage}
    />
  );
}

export default MapPage;
