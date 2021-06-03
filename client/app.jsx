import React from 'react';
import { FirebaseAuthConsumer } from '@react-firebase/auth';

import Home from './pages/home';
import Map from './pages/map';

export default class App extends React.Component {
  render() {
    return (
      <FirebaseAuthConsumer>
        {authResponse => {
          if (authResponse.isSignedIn === true) {
            return <Map auth={authResponse} />;
          } else {
            return <Home />;
          }
        }}
      </FirebaseAuthConsumer>
    );
  }
}
