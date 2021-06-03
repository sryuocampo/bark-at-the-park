/* eslint-disable multiline-ternary */
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';
import Info from './info.jsx';
import './map.css';
import { FirestoreDocument } from '@react-firebase/firestore';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 33.813622,
  lng: -118.096187
};
/**
 {
   "active_pets" : {
     "3GjcZ4r41kYpf88ZDkCyvlmnURI2" : {
       "geohash" : "hkjdshfkjsh",
       "latLng" : [34.343434, 123.232323],
       "timestamp" : 123131231231
      }
    },
    "user_pets" : {
      "3GjcZ4r41kYpf88ZDkCyvlmnURI2" : {
        "icon" : "icon.png",
        "names" : “Besitos and Oso,
        "sizes" : “Small”
      }
    }
  }
  */

export default function Map({ auth }) {
  // Load user's activePets entry to see if at park.
  // Load pets at parks from activePets and add markers to map.

  const [showProfile, setShowProfile] = React.useState(false);
  const [goingToPark, setGoingToPark] = React.useState(false);

  return (
    <FirestoreDocument path={`/user_pets/${auth.user.uid}`}>
      {({ isLoading, value }) => {
        return isLoading !== false ? (
          <div />
        ) : (
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
              ></GoogleMap>
            </LoadScript>
            <i className="fas fa-paw"></i>
            {goingToPark ? (
              <button onClick={() => setGoingToPark(false)} id="leavePark">
                Leave the Park!
              </button>
            ) : (
              <button onClick={() => setGoingToPark(true)} id="park">
                Go to the Park!
              </button>
            )}
            <button
              onClick={() => setShowProfile(true)}
              id="profile"
              style={{
                backgroundImage: `url(
                    ./Icons/${(value && value.icon) || '001.png'})`
              }}
            ></button>
            {showProfile || value === null ? (
              <Info
                auth={auth}
                initProfile={value}
                onClose={() => setShowProfile(false)}
              />
            ) : null}
          </>
        );
      }}
    </FirestoreDocument>
  );
}
