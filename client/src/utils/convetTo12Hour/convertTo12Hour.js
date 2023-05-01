const convertTo12Hour = (time) => {
  let hour = parseInt(time.split(':')[0]);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:00 ${suffix}`;
};

export default convertTo12Hour;
