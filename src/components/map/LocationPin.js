// import React from 'react'
// import { Icon } from '@iconify/react'
// import pinFill from '@iconify-icons/eva/pin-fill';
import React from 'react';
import PropTypes from 'prop-types';

const LocationPin = ({ text, onClick }) => (
  // <div className="pin">
  //   <Icon icon={pinFill} className="pin-icon" />
  //   <p className="pin-text">{text}</p>
  // </div>

  <div className="marker" 
  alt={text}
  onClick={onClick} />
);

LocationPin.defaultProps = {
  onClick: null,
};

LocationPin.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default LocationPin