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
        top: '670px',
        right: '30px',
        zIndex: 1,
        background: 'purple',
        padding: '9px',
        borderRadius: '50%',
      }}>
      <BiCurrentLocation color='white' size={'28px'} />
    </button>
  );
}
