import { BiCurrentLocation } from 'react-icons/bi';

export default function CenterButton({ map, latitude, longitude }) {
  const handleClick = () => {
    map.current.flyTo({ center: [longitude, latitude], zoom: 14 });
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: '700px',
        right: '10px',
        zIndex: 1,
        background: 'purple',
        padding: '10px',
        borderRadius: '50%',
      }}>
      <BiCurrentLocation color='white' size={'30px'} />
    </button>
  );
}
