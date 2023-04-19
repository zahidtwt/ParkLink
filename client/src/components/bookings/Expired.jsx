import React from 'react';
import { BsSignNoParking } from 'react-icons/bs';
const Expired = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        padding: '6px 6px',
        fontSize: '40px',
        textTransform: 'uppercase',
      }}>
      <BsSignNoParking style={{ marginRight: '5px' }} color='#fa5151' />
    </div>
  );
};

export default Expired;
