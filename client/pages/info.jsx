import React from 'react';
import './info.css';
export default function Info(props) {
  return (
    <div className="bark-popup">
      <div className="header">
        <h1>Bark Profile</h1>
      </div>
      <div
        className="image"
        style={{ backgroundImage: 'url(./icons/osobesitos.jpg)' }}
      >
        <img src="./icons/add.svg" />
      </div>

      <div className="form">
        <h4>Name</h4>
        <input type="text" className="text"></input>
        <h4>Size</h4>
        <select name="size" id="pet-size">
          <option value="">Choose an Option</option>
          <option value="toy">Toy</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <div className="buttons">
          <button onClick={props.onClose} className="submit">Submit</button>
          <button onClick={props.onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}
