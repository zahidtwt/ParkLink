import axios from 'axios';
import { MAP_BOX_TOKEN } from '../../../../config';

const mapbox_token = MAP_BOX_TOKEN;

const uploadMapboxImageToCloudinary = async (longitude, latitude) => {
  const mapboxImageUrl = `https://api.mapbox.com/styles/v1/zahidtwt/clgnzmmmt00f301qm5m4m1hl4/static/pin-s+A020F0(${longitude},${latitude})/${longitude},${latitude},13,0/390x215?access_token=${mapbox_token}&icon-size=2`;
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/di31yslny/image/upload`;
  const formData = new FormData();
  formData.append(
    'file',
    await fetch(mapboxImageUrl).then((res) => res.blob()),
    'my_image.png'
  );
  formData.append('upload_preset', 'gsmrcgns');
  formData.append('folder', 'mapbox-images');

  const response = await axios.post(cloudinaryUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  return response.data.secure_url;
};

export default uploadMapboxImageToCloudinary;
