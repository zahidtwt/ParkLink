import React from 'react';
import { FcExpired } from 'react-icons/fc';
const Expired = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        padding: '6px 12px',
        fontSize: '30px',
        textTransform: 'uppercase',
      }}>
      <FcExpired style={{ marginRight: '5px' }} />
    </div>
  );
};

export default Expired;
