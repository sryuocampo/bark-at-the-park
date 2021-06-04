import { FirebaseAuthProvider } from '@react-firebase/auth';
import { FirestoreProvider } from '@react-firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import { firebaseConfig } from './firebaseConfig';

ReactDOM.render(
  <FirestoreProvider {...firebaseConfig} firebase={firebase}>
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <App />
    </FirebaseAuthProvider>
  </FirestoreProvider>,
  document.querySelector('#root')
);
