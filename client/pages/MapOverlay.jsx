/* eslint-disable multiline-ternary */
import { FirestoreMutation } from '@react-firebase/firestore';
import firebase from 'firebase/app';
import { geohashForLocation } from 'geofire-common';
import React from 'react';

import InfoWithFirestoreMutation from './info.jsx';

export default function MapOverlay({
  auth,
  profile,
  activePet,
  targetLocation
}) {
  const [showProfile, setShowProfile] = React.useState(false);

  return (
    <>
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
        <>
          <img className="fas fa-paw" src="./Icons/paw-icon.svg" />
          <FirestoreMutation
            key={JSON.stringify(profile.value)}
            type="set"
            path={`/active_pets/${auth.user.uid}`}
          >
            {({ runMutation }) => {
              return (
                <button
                  onClick={() => {
                    runMutation({
                      geohash: geohashForLocation(targetLocation.current),
                      position: targetLocation.current,
                      profile: profile.value,
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
        </>
      )}
      <button
        onClick={() => setShowProfile(true)}
        id="profile"
        style={{
          backgroundImage: `url(
              ./Icons/${(profile.value && profile.value.icon) || '001.png'})`
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
}
