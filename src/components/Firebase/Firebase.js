import firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD9jmC0h-c7ESwyg5EdGsWntPLM97-jU94",
    authDomain: "wsb-final.firebaseapp.com",
    databaseURL: "https://wsb-final.firebaseio.com",
    projectId: "wsb-final",
    storageBucket: "wsb-final.appspot.com",
    messagingSenderId: "137384177153",
    appId: "1:137384177153:web:3cecd29c2c905581"
  };
  // Initialize Firebase
  export class Firebase {
      constructor() {
        firebase.initializeApp(firebaseConfig);

        this.auth = app.auth();
        
      }
  }

  export default Firebase;
