/* eslint-disable multiline-ternary */
import { FirestoreDocument } from '@react-firebase/firestore';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';

import './map.css';
import MapMarkers from './MapMarkers';
import MapOverlay from './MapOverlay';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 33.813622,
  lng: -118.096187,
};

export default function Map({ auth }) {
  const [map, setMap] = React.useState(null);
  const [mapCenter, setMapCenter] = React.useState(center);
  const targetLocation = React.useRef(center);

  React.useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        targetLocation.current = [
          position.coords.latitude,
          position.coords.longitude,
        ];
      });
  }, []);

  const handleBoundsChange = () => {
    if (map) {
      targetLocation.current = [map.getCenter().lat(), map.getCenter().lng()];
    }
  };

  // const dateAgo = new Date(Date.now() - 90 * 60 * 1000);

  return (
    <FirestoreDocument path={`/user_pets/${auth.user.uid}`}>
      {(profile) => (
        <FirestoreDocument path={`/active_pets/${auth.user.uid}`}>
          {(activePet) => {
            return profile.isLoading !== false &&
              activePet.isLoading !== false ? (
              <div />
            ) : (
              <>
                <LoadScript googleMapsApiKey="AIzaSyDqufKhAaZoJGVZ2qcoQbSV7LnfKyLBfIY">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={13}
                    options={{
                      fullscreenControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                      zoomControl: false,
                    }}
                    onLoad={setMap}
                    onBoundsChanged={handleBoundsChange}
                  >
                    <MapMarkers mapCenter={mapCenter} activePet={activePet} />
                  </GoogleMap>
                </LoadScript>
                <MapOverlay
                  auth={auth}
                  profile={profile}
                  activePet={activePet}
                  targetLocation={targetLocation}
                />
              </>
            );
          }}
        </FirestoreDocument>
      )}
    </FirestoreDocument>
  );
}
