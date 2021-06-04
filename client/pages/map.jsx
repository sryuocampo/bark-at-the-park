/* eslint-disable multiline-ternary */
import {
  FirestoreDocument,
  FirestoreMutation
} from '@react-firebase/firestore';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import firebase from 'firebase/app';
import { geohashForLocation } from 'geofire-common';
import React from 'react';

import InfoWithFirestoreMutation from './info.jsx';
import './map.css';
import MapMarkers from './MapMarkers';

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
  const [map, setMap] = React.useState(null);
  const [mapCenter, setMapCenter] = React.useState(center);
  const targetLocation = React.useRef(center);

  React.useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        targetLocation.current = [
          position.coords.latitude,
          position.coords.longitude
        ];
      });
  }, []);

  const handleBoundsChange = () => {
    if (map) {
      targetLocation.current = [map.getCenter().lat(), map.getCenter().lng()];
    }
  };

  return (
    <FirestoreDocument path={`/user_pets/${auth.user.uid}`}>
      {profile => (
        <FirestoreDocument path={`/active_pets/${auth.user.uid}`}>
          {activePet => {
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
                      zoomControl: false
                    }}
                    onLoad={setMap}
                    onBoundsChanged={handleBoundsChange}
                  >
                    <MapMarkers activePet={activePet} />
                  </GoogleMap>
                </LoadScript>
                {activePet.value ? null : (
                  <img className="fas fa-paw" src="./Icons/paw-icon.svg" />
                )}
                {activePet.value ? (
                  <FirestoreMutation
                    key="leave-park"
                    type="delete"
                    path={`/active_pets/${auth.user.uid}`}
                  >
                    {({ runMutation }) => {
                      return (
                        <button
                          onClick={() => {
                            runMutation();
                          }}
                          id="leavePark"
                        >
                          Leave the Park!
                        </button>
                      );
                    }}
                  </FirestoreMutation>
                ) : (
                  <FirestoreMutation
                    key="going-to-park"
                    type="set"
                    path={`/active_pets/${auth.user.uid}`}
                  >
                    {({ runMutation }) => {
                      return (
                        <button
                          onClick={() => {
                            runMutation({
                              geohash: geohashForLocation(
                                targetLocation.current
                              ),
                              position: targetLocation.current,
                              profile: firebase
                                .firestore()
                                .doc(`/user_pets/${auth.user.uid}`),
                              timestamp:
                                firebase.firestore.FieldValue.serverTimestamp()
                            });
                          }}
                          id="park"
                        >
                          Go to the Park!
                        </button>
                      );
                    }}
                  </FirestoreMutation>
                )}
                <button
                  onClick={() => setShowProfile(true)}
                  id="profile"
                  style={{
                    backgroundImage: `url(
                        ./Icons/${
                          (profile.value && profile.value.icon) || '001.png'
                        })`
                  }}
                ></button>
                {showProfile || profile.value === null ? (
                  <InfoWithFirestoreMutation
                    auth={auth}
                    initProfile={profile.value}
                    onClose={() => setShowProfile(false)}
                  />
                ) : null}
              </>
                );
          }}
        </FirestoreDocument>
      )}
    </FirestoreDocument>
  );
}
