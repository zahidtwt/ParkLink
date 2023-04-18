import { useGetAllParkingQuery } from '../../features/parking/parkingApi';
import MyMap from './MyMap';

function MapPage() {
  const { data: parkings, isLoading, isError, error } = useGetAllParkingQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return <MyMap parkings={parkings} />;
}

export default MapPage;
