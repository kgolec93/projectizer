import { createStore, combineReducers } from 'redux'
import { signInReducer } from './reducers/signInReducer'
import { signUpReducer } from './reducers/signUpReducer'

const rootReducer = combineReducers({
    signIn: signInReducer, 
    signUp: signUpReducer
})
  
export const store = createStore(
    rootReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default { store }