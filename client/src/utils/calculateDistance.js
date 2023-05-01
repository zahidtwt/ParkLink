function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function claculateDistance(
  latitude,
  longitude,
  selectedLatitude,
  selectedLongitute
) {
  const userLatRad = degToRad(latitude);
  const userLonRad = degToRad(longitude);
  const selectedLatRad = degToRad(selectedLatitude);
  const selectedLonRad = degToRad(selectedLongitute);

  const deltaLat = selectedLatRad - userLatRad;
  const deltaLon = selectedLonRad - userLonRad;
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(userLatRad) *
      Math.cos(selectedLatRad) *
      Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = 6371 * c;

  return distance;
}

export default claculateDistance;
