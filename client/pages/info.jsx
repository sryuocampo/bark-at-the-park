/* eslint-disable multiline-ternary */
import { FirestoreMutation } from '@react-firebase/firestore';
import React from 'react';
import Select from 'react-select';

import './info.css';

const options = [
  {
    value: '001.png',
    label: <img className="dog-image-profile-selected" src="./Icons/001.png" />,
  },
  {
    value: '002.png',
    label: <img className="dog-image-profile-selected" src="./Icons/002.png" />,
  },
  {
    value: '003.png',
    label: <img className="dog-image-profile-selected" src="./Icons/003.png" />,
  },
  {
    value: '004.png',
    label: <img className="dog-image-profile-selected" src="./Icons/004.png" />,
  },
  {
    value: '005.png',
    label: <img className="dog-image-profile-selected" src="./Icons/005.png" />,
  },
  {
    value: '006.png',
    label: <img className="dog-image-profile-selected" src="./Icons/006.png" />,
  },
  {
    value: '007.png',
    label: <img className="dog-image-profile-selected" src="./Icons/007.png" />,
  },
  {
    value: '008.png',
    label: <img className="dog-image-profile-selected" src="./Icons/008.png" />,
  },
  {
    value: '009.png',
    label: <img className="dog-image-profile-selected" src="./Icons/009.png" />,
  },
  {
    value: '010.png',
    label: <img className="dog-image-profile-selected" src="./Icons/010.png" />,
  },
  {
    value: '011.png',
    label: <img className="dog-image-profile-selected" src="./Icons/011.png" />,
  },
  {
    value: '012.png',
    label: <img className="dog-image-profile-selected" src="./Icons/012.png" />,
  },
  {
    value: '013.png',
    label: <img className="dog-image-profile-selected" src="./Icons/013.png" />,
  },
  {
    value: '014.png',
    label: <img className="dog-image-profile-selected" src="./Icons/014.png" />,
  },
  {
    value: '015.png',
    label: <img className="dog-image-profile-selected" src="./Icons/015.png" />,
  },
  {
    value: '016.png',
    label: <img className="dog-image-profile-selected" src="./Icons/016.png" />,
  },
  {
    value: '017.png',
    label: <img className="dog-image-profile-selected" src="./Icons/017.png" />,
  },
  {
    value: '018.png',
    label: <img className="dog-image-profile-selected" src="./Icons/018.png" />,
  },
  {
    value: '019.png',
    label: <img className="dog-image-profile-selected" src="./Icons/019.png" />,
  },
  {
    value: '020.png',
    label: <img className="dog-image-profile-selected" src="./Icons/020.png" />,
  },
  {
    value: '021.png',
    label: <img className="dog-image-profile-selected" src="./Icons/021.png" />,
  },
  {
    value: '022.png',
    label: <img className="dog-image-profile-selected" src="./Icons/022.png" />,
  },
  {
    value: '023.png',
    label: <img className="dog-image-profile-selected" src="./Icons/023.png" />,
  },
];

const DogIconPicker = ({ open, onChange }) =>
  open ? (
    <div className="dog-icon-picker-select-button">
      <Select onChange={onChange} menuIsOpen options={options} />
    </div>
  ) : null;

function Info({ initProfile, onSave, onClose }) {
  const [profile, setProfile] = React.useState(
    initProfile || {
      icon: '001.png',
      names: '',
      sizes: '',
    }
  );

  const [showDogPicker, setShowDogPicker] = React.useState(false);

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
          <img onClick={() => setShowDogPicker(true)} src="./Icons/add.svg" />
        </div>
        <div className="form">
          <h4>Names (of one or more dogs)</h4>
          <input
            type="text"
            className="text"
            value={profile.names}
            onChange={(event) =>
              setProfile((state) => ({ ...state, names: event.target.value }))
            }
          />
          <h4>Size (of largest dog)</h4>

          <select
            name="size"
            id="pet-size"
            value={profile.sizes}
            onChange={(event) =>
              setProfile((state) => ({ ...state, sizes: event.target.value }))
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
        <DogIconPicker
          open={showDogPicker}
          onChange={(event) => {
            setProfile((state) => ({ ...state, icon: event.value }));
            setShowDogPicker(false);
          }}
        />
      </div>
    </div>
  );
}

export default function InfoWithFirestoreMutation({
  auth,
  initProfile,
  onClose,
}) {
  return (
    <FirestoreMutation type="set" path={`/user_pets/${auth.user.uid}`}>
      {({ runMutation }) => (
        <Info
          initProfile={initProfile}
          onSave={async (profile) => {
            await runMutation(profile);
            onClose();
          }}
          onClose={onClose}
        />
      )}
    </FirestoreMutation>
  );
}
