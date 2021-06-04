import { Marker } from '@react-google-maps/api';
import React from 'react';

export default function MapMarkers({ activePet }) {
  return activePet.value
    ? (
    <Marker
      title="This is title"
      position={{
        lat: activePet.value.position[0],
        lng: activePet.value.position[1]
      }}
    />
      )
    : null;
}
