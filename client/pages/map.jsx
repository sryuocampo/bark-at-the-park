import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';
import Info from './info.jsx';
import './map.css';
const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 33.813622,
  lng: -118.096187
};
export default function Map(props) {
  const [showProfile, setShowProfile] = React.useState(false);
  const [leavingPark, goingToPark] = React.useState(false);
  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyDqufKhAaZoJGVZ2qcoQbSV7LnfKyLBfIY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: false
          }}
        >
        </GoogleMap>
      </LoadScript>

      <button onClick={() => goingToPark(true)} id="park">Go to the Park!</button>
      <button
        onClick={() => setShowProfile(true)}
        id="profile"
        style={{ backgroundImage: 'url(./icons/osobesitos.jpg)' }}
      ></button>
      {showProfile ? <Info onClose={() => setShowProfile(false)} /> : null}
      {leavingPark ? <button onClick={() => goingToPark(false)} id="leavePark">Leave the Park!</button> : null}
    </>
  );
}
