import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationPin from './LocationPin'

const Map = ({ location }) => {
  const displayLocation = location !== undefined ? [location] : [{lat: -33.41620285698516, lng: -70.57874991978342}];
  return (
    <div className="map">
    <h2 className="map-h2">Desafio!</h2>
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={{lat: -33.41620285698516, lng: -70.57874991978342}}
        defaultZoom={17}
        center={displayLocation[0]}
      >
        {displayLocation.map( pinLocation =>(
          <LocationPin
            lat={pinLocation.lat}
            lng={pinLocation.lng}
            text={location?.address}
          />
        ))}
      </GoogleMapReact>
    </div>
  </div>
  )
}

export default Map
