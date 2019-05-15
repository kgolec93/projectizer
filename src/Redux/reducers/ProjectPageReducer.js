import  firebase from 'firebase';
import { projectData as data } from '../../testData/DevDatabase' 


const projectPageState = {
    taskInput: '',
    commentInput: '',
    statusInput: '',
    isCommentInputVisible: false,
    isTaskInputVisible: false,
    currentProjectData: data
}

export const projectPageReducer = (state=projectPageState, action) => {
    switch (action.type) {
        case "LOAD_DATA":
            return {...state, currentProjectData: action.payload}
        case "ENTER_COMMENT":
            return {...state, commentInput: action.payload}
        case "ENTER_TASK":
            return {...state, taskInput: action.payload}
        case "ADD_TASK":
            return {...state, currentProjectData: data, taskInput: ''}
        case "ADD_COMMENT":
            return {...state, currentProjectData: data, commentInput: ''}
        case "ENTER_STATUS":

        case "TOGGLE_NEW_COMMENT":
            return {...state, isCommentInputVisible: !state.isCommentInputVisible}
        case "TOGGLE_NEW_TASK":
            return {...state, isTaskInputVisible: !state.isTaskInputVisible}
        default:
            return state;
    }
}

export default projectPageReducer