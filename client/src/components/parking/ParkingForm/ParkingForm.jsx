import { useState } from 'react';
import AddressForm from './AddressForm';
import HourlyMonthlyForm from './HourlyMonthlyForm';
import BikeCarForm from './BikeCarForm';
import ExtraServicesForm from './ExtraServicesForm';
import RulesForm from './RulesForm';
import SubmitButton from './SubmitButton';
function ParkingForm() {
  const [address, setAddress] = useState({ area: '', city: '', postcode: '' });
  const [hourly, setHourly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [hour, setHour] = useState('9am - 5pm');
  const [bike, setBike] = useState(false);
  const [car, setCar] = useState(false);
  const [carSlot, setCarSlot] = useState(0);
  const [bikeSlot, setBikeSlot] = useState(0);
  const [cctv, setCctv] = useState(false);
  const [guard, setGuard] = useState(false);
  const [rules, setRules] = useState([]);

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleHourlyChange = () => {
    setHourly(true);
    setMonthly(false);
  };

  const handleMonthlyChange = () => {
    setMonthly(true);
    setHourly(false);
  };

  const handleHourChange = (newHour) => {
    setHour(newHour);
  };

  const handleBikeChange = () => {
    setBike(true);
    setCar(false);
  };

  const handleCarChange = () => {
    setCar(true);
    setBike(false);
  };

  const handleCarSlotChange = (newSlot) => {
    setCarSlot(newSlot);
  };

  const handleBikeSlotChange = (newSlot) => {
    setBikeSlot(newSlot);
  };

  const handleCctvChange = () => {
    setCctv(!cctv);
  };

  const handleGuardChange = () => {
    setGuard(!guard);
  };

  const handleRulesChange = (newRules) => {
    setRules(newRules);
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <AddressForm address={address} onAddressChange={handleAddressChange} />
      <HourlyMonthlyForm
        hourly={hourly}
        monthly={monthly}
        onHourlyChange={handleHourlyChange}
        onMonthlyChange={handleMonthlyChange}
        hour={hour}
        onHourChange={handleHourChange}
        rate={hourly ? '20tk/hour' : '1000tk/month'}
      />
      {/* <BikeCarForm
        bike={bike}
        car={car}
        onBikeChange={handleBikeChange}
        onCarChange={handleCarChange}
      /> */}
      {bike && (
        <div>
          <label htmlFor='bike-slot'>Available bike slots:</label>
          <input
            id='bike-slot'
            type='number'
            value={bikeSlot}
            onChange={(e) => handleBikeSlotChange(e.target.value)}
          />
        </div>
      )}
      {car && (
        <div>
          <label htmlFor='car-slot'>Available car slots:</label>
          <input
            id='car-slot'
            type='number'
            value={carSlot}
            onChange={(e) => handleCarSlotChange(e.target.value)}
          />
        </div>
      )}
      <ExtraServicesForm setCctv={setCctv} setGuard={setGuard} />
      <RulesForm setRules={setRules} />
      <SubmitButton />
    </form>
  );
}

export default ParkingForm;
