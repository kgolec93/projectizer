import  firebase from 'firebase';


const signInState = {
    // isLogged: false,
    emailInput: '',
    passwordInput: '',
    // loggedUser: 'kamil.golec@gmail.com',

}

export const signInReducer = (state=signInState, action) => {
    switch (action.type) {
        case "ENTER_EMAIL":
          return (
            {...state, emailInput: action.payload}
          )
        case "ENTER_PASSWORD":
          return (
            {...state, passwordInput: action.payload}
          )          
        // case "LOG_USER":
        //   const user = firebase.auth().currentUser;
        //   console.log(user)
        //   // action.payload.preventDefault();
        //   return (
        //     {...state, 
        //       emailInput: '', 
        //       passwordInput: ''
        //     }
        //   )
        case 'SIGNIN_ERROR':
          return (
              {...state, errorMessage: action.payload}
          )       
        default:
            return state;
    }
  }

export default signInReducer