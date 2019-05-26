import firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    //PROTECTED DATA
  };
  // Initialize Firebase
  export class Firebase {
      constructor() {
        firebase.initializeApp(firebaseConfig);

        this.auth = app.auth();
        
      }
  }

  export default Firebase;
