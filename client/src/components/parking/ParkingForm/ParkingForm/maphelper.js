const longitude = 90.331753;
const latitude = 24.004864;
const yourAsyncFunction = async () => {
  // do something asynchronously and return a promise
  const imageUrl = await uploadMapboxImageToCloudinary(longitude, latitude);
  console.log(imageUrl);
};
