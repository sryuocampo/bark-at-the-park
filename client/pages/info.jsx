import { FirestoreMutation } from '@react-firebase/firestore';
import React from 'react';

import './info.css';

function Info({ initProfile, onSave, onClose }) {
  const [profile, setProfile] = React.useState(
    initProfile || {
      icon: '001.png',
      names: '',
      sizes: ''
    }
  );

  const isInvalid = !profile.names || !profile.sizes;

  return (
    <div className="backdrop">
      <div className="bark-popup">
        <div className="header">
          <h1>Bark Profile</h1>
        </div>
        <div
          className="image"
          style={{ backgroundImage: `url(./Icons/${profile.icon})` }}
        >
          <img src="./Icons/add.svg" />
        </div>
        <div className="form">
          <h4>Names (of one or more dogs)</h4>
          <input
            type="text"
            className="text"
            value={profile.names}
            onChange={event =>
              setProfile(state => ({ ...state, names: event.target.value }))
            }
          />
          <h4>Size (of largest dog)</h4>
          <select
            name="size"
            id="pet-size"
            value={profile.sizes}
            onChange={event =>
              setProfile(state => ({ ...state, sizes: event.target.value }))
            }
          >
            <option value="">Choose an Option</option>
            <option value="toy">Toy</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <div className="buttons">
            <button
              className="submit"
              disabled={isInvalid}
              onClick={() => onSave(profile)}
            >
              Submit
            </button>
            <button onClick={onClose} className="cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InfoWithFirestoreMutation({
  auth,
  initProfile,
  onClose
}) {
  return (
    <FirestoreMutation type="set" path={`/user_pets/${auth.user.uid}`}>
      {({ runMutation }) => (
        <Info
          initProfile={initProfile}
          onSave={async profile => {
            await runMutation(profile);
            onClose();
          }}
          onClose={onClose}
        />
      )}
    </FirestoreMutation>
  );
}
