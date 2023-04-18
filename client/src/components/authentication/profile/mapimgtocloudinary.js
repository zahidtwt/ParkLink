import axios from 'axios';
const mapbox_token =
  'pk.eyJ1IjoiemFoaWR0d3QiLCJhIjoiY2xnaWV0YXB1MHVzNDNwbXk4NmdjZDBzZiJ9.7yB9lTwtcki0wvg2BQHNaw';
const customMarkerUrl =
  'https://res.cloudinary.com/di31yslny/image/upload/c_scale,e_shadow:40,w_60/v1681763371/svg/parking.503e01bdd23dc405fcfaad11db13ca7b_bplgaq.svg';

const uploadMapboxImageToCloudinary = async (longitude, latitude) => {
  const mapboxImageUrl = `https://api.mapbox.com/styles/v1/zahidtwt/clgienaqi005u01o1d5rzcmgi/static/pin-s+A020F0(${longitude},${latitude})/${longitude},${latitude},13,0/660x440?access_token=${mapbox_token}&icon-size=2`;

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
