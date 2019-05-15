import firebase from 'firebase'

const globalState = {
    firebaseUserData: null,
    isLogged: false,
    loggedUser: null,
}


export const globalReducer = (state=globalState, action) => {
    switch (action.type) {
        case 'FIREBASE_USER_DATA':
            return (
                {...state, firebaseUserData: action.payload}
            )
        case "LOG_USER":
            const user = firebase.auth().currentUser
            return (
              {...state, 
                firebaseUserData: user,
                loggedUser: user.email, 
                isLogged: true
              }
            ) 
        default:
            return state;             
    }
}

export default globalReducer