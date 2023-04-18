import uploadMapboxImageToCloudinary from './uploadMapboxImageToCloudinary';

const longitude = 74.006;
const latitude = 40.7128;

const imageUrl = await uploadMapboxImageToCloudinary(longitude, latitude);
console.log(imageUrl);
