/* eslint-disable multiline-ternary */
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React from 'react';
import InfoWithFirestoreMutation from './info.jsx';
import './map.css';
import {
  FirestoreDocument,
  FirestoreMutation,
} from '@react-firebase/firestore';
import firebase from 'firebase/app';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 33.813622,
  lng: -118.096187,
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
  const [map, setMap] = React.useState(null);
  const [mapCenter, setMapCenter] = React.useState(center);

  React.useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
  }, []);

  const handleBoundsChange = () =>
    console.log(
      map?.getBounds(),
      map?.getCenter().lng(),
      map?.getCenter().lat()
    );

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
                <Marker
                  title="This is title"
                  position={{ lat: 33.74, lng: -117.86 }}
                />
              </GoogleMap>
            </LoadScript>
            <img className="fas fa-paw" src="./Icons/paw-icon.svg" />

            {goingToPark ? (
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
                        setGoingToPark(false);
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
                          geohash: 'dskjfhsjkh',
                          position: [39.343434, 120.23232],
                          profile: firebase
                            .firestore()
                            .doc(`/user_pets/${auth.user.uid}`),
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                        });
                        setGoingToPark(true);
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
                    ./Icons/${(value && value.icon) || '001.png'})`,
              }}
            ></button>
            {showProfile || value === null ? (
              <InfoWithFirestoreMutation
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
