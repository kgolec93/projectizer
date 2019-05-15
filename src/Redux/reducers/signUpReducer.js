import  firebase from 'firebase';



const signUpState = {
    signupUsername: '',
    signupEmail: '',
    signupPassword1: '',
    signupPassword2: '',
    firebaseUserData: null,
    errorMessage: null
}


export const signUpReducer = (state=signUpState, action) => {
    switch (action.type) {
        case 'SIGNUP_USERNAME':
            return (
                {...state, signupUsername: action.payload}
            )
        case 'SIGNUP_EMAIL':
            return (
                {...state, signupEmail: action.payload}
            )
        case 'SIGNUP_PASSWORD':
            return (
                {...state, signupPassword1: action.payload}
            )      
        case 'SIGNUP_PASSWORD_CONFIRM':
            return (
                {...state, signupPassword2: action.payload}
            )     
        case 'SIGNUP_REGISTER_USER':

            // Firebase Auth Create User //
            // firebase.auth().createUserWithEmailAndPassword(state.signupEmail, state.signupPassword1);

            // Adding user to the database //
            // firebase.database().ref('users/' + state.signupUsername).set({
            //     username: state.signupUsername,
            //     email: state.signupEmail
            // });
            action.payload.preventDefault();
            
        case 'SIGNUP_ERROR':
            return (
                {...state, errorMessage: action.payload}
            )
        case 'CREATE_USER':
            return {...state, userData: firebase.auth().currentUser}
        default:
            return state;             
    }
}

export default signUpReducer