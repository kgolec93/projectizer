import firebase from 'firebase'

const globalState = {
    firebaseUserData: null,
    isLogged: false,
    loggedUser: null,
    userData: null
}


export const globalReducer = (state=globalState, action) => {
    switch (action.type) {
        case 'TEST_USER_DATA':
            console.log("OBSERVER WORKS")
        case 'FIREBASE_USER_DATA':
            return (
                {...state, firebaseUserData: action.payload}
            )
        case 'LOG_OUT':
            firebase.auth().signOut();
            return (
                {...state,
                    firebaseUserData: null,
                    loggedUser: null, 
                    isLogged: false,
                    userData: null
                }
            )
        case "LOG_USER":
            return (
              {...state, 
                    firebaseUserData: action.payload,
                    loggedUser: action.payload.email, 
                    isLogged: true,
              }
            ) 
        case "FETCH_DATA":            
            return (
                {...state, userData: action.payload}
            )
        case "UPDATE_DATA":            
            return (
                {...state, userData: action.payload}
            )
        case 'PROJECT_LIST':
            return (
                {...state, projectList: action.payload}
            )
        default:
            return state;             
    }
}

export default globalReducer