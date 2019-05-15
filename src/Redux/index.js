import { createStore, combineReducers } from 'redux'
import { signInReducer } from './reducers/signInReducer'
import { signUpReducer } from './reducers/signUpReducer'
import { newProjectReducer } from './reducers/newProjectReducer';
import { projectPageReducer } from './reducers/ProjectPageReducer'
import globalReducer from './reducers/GlobalReducer';

const rootReducer = combineReducers({
    signIn: signInReducer, 
    signUp: signUpReducer,
    newProject: newProjectReducer,
    projectPage: projectPageReducer,
    global: globalReducer
})
  
export const store = createStore(
    rootReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default { store }