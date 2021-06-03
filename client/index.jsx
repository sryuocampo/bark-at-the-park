import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { FirestoreProvider } from '@react-firebase/firestore';

const config = {
  apiKey: 'AIzaSyDiOp1vvIVa2__UnLnl93ihIpVdkh0SCI8',
  authDomain: 'dog-park-4761a.firebaseapp.com',
  projectId: 'dog-park-4761a',
  storageBucket: 'dog-park-4761a.appspot.com',
  messagingSenderId: '233545676303',
  appId: '1:233545676303:web:08bb71158c116ece48d57a',
  measurementId: 'G-CTCPG21T3D'
};

ReactDOM.render(
  <FirestoreProvider {...config} firebase={firebase}>
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <App />
    </FirebaseAuthProvider>
  </FirestoreProvider>,
  document.querySelector('#root')
);
