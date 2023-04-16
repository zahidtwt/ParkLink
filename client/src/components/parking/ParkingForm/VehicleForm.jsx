import { useState } from 'react';

const VehicleForm = () => {
  const [carSlots, setCarSlots] = useState('');
  const [bikeSlots, setBikeSlots] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedRate, setSelectedRate] = useState('');

  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
  };

  const handleRateChange = (e) => {
    setSelectedRate(e.target.value);
  };

  const handleCarSlotChange = (e) => {
    setCarSlots(e.target.value);
  };

  const handleBikeSlotChange = (e) => {
    setBikeSlots(e.target.value);
  };

  return (
    <div>
      <div>
        <h3>Select Vehicle Type:</h3>
        <div>
          <input
            type='radio'
            value='car'
            checked={selectedVehicle === 'car'}
            onChange={handleVehicleChange}
          />
          <label>Car</label>
        </div>
        <div>
          <input
            type='radio'
            value='bike'
            checked={selectedVehicle === 'bike'}
            onChange={handleVehicleChange}
          />
          <label>Bike</label>
        </div>
      </div>

      <div>
        <h3>Select Rate:</h3>
        <div>
          <input
            type='radio'
            value='hourly'
            checked={selectedRate === 'hourly'}
            onChange={handleRateChange}
          />
          <label>Hourly ({selectedRate === 'hourly' ? '20tk/hour' : ''})</label>
        </div>
        <div>
          <input
            type='radio'
            value='monthly'
            checked={selectedRate === 'monthly'}
            onChange={handleRateChange}
          />
          <label>
            Monthly ({selectedRate === 'monthly' ? '2000tk/month' : ''})
          </label>
        </div>
      </div>

      {selectedVehicle === 'car' && (
        <div>
          <h3>Number of Car Slots:</h3>
          <input type='text' value={carSlots} onChange={handleCarSlotChange} />
        </div>
      )}

      {selectedVehicle === 'bike' && (
        <div>
          <h3>Number of Bike Slots:</h3>
          <input
            type='text'
            value={bikeSlots}
            onChange={handleBikeSlotChange}
          />
        </div>
      )}
    </div>
  );
};

export default VehicleForm;
