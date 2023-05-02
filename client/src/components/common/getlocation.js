import axios from 'axios';
import Cookies from 'js-cookie';
import { BARI_KOI_API_KEY } from '../../config';

const fetchLocations = async (latitude, longitude) => {
  const response = await axios.get(
    `https://barikoi.xyz/v2/api/search/nearby/${BARI_KOI_API_KEY}/0.5/1?longitude=${longitude}&latitude=${latitude}`
  );

  return response.data;
};
const getLocation = async () => {
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
  const data = await fetchLocations(latitude, longitude);
  const { area, city, postCode } = data?.places[0];
  localStorage.setItem(
    'location',
    JSON.stringify({
      location: { area, city, postCode, latitude, longitude },
    })
  );
};

export default getLocation;
