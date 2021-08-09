import firebase  from "firebase";

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const firebaseConfig = {
  apiKey: 'AIzaSyBiET3LdbfK5obcgcwXjCJYA0sNO7mF0dw',
  authDomain: 'everylibrary-7583a.firebaseapp.com',
  projectId: 'everylibrary-7583a',
  storageBucket: 'everylibrary-7583a.appspot.com',
  messagingSenderId: '198725644811',
  appId: '1:198725644811:web:b33d85c118bcdb30774d0e',
  measurementId: 'G-WG5LSRGM6Y',
  databaseURL: 'https://everylibrary-7583a.firebaseio.com'
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
