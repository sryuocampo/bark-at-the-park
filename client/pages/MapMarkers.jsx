import { FirestoreCollection } from '@react-firebase/firestore';
import { Marker } from '@react-google-maps/api';
import React from 'react';

export default function MapMarkers({ activePet, mapCenter }) {
  return (
    <FirestoreCollection path={'/active_pets/'}>
      {({ value }) =>
        value?.map((pet) => (
          <Marker
            key={pet.profile.__id}
            icon={{
              url: `./Icons/marker_${pet.profile.icon}`,
              scaledSize:
                activePet.value?.__id === pet.profile.__id
                  ? { width: 80, height: 80 }
                  : { width: 70, height: 70 },
            }}
            position={{
              lat: pet.position[0],
              lng: pet.position[1],
            }}
          />
        ))
      }
    </FirestoreCollection>
  );
}
