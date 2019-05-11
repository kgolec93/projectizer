import  firebase from 'firebase';


const signInState = {
    isLogged: false,
    emailInput: '',
    passwordInput: '',
    loggedUser: '',

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
        case "LOG_USER":
            const user = firebase.auth().currentUser;
            console.log(user)
            // action.payload.preventDefault();
            return (
              {...state, 
                loggedUser: user.email, 
                emailInput: '', 
                passwordInput: '', 
                isLogged: true, 
                userData: user
              }
            )     
        default:
            return state;
    }
  }

export default signInReducer