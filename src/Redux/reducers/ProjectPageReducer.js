const projectPageState = {
    taskInput: '',
    commentInput: '',
    statusInput: '',
    isCommentInputVisible: false,
    isTaskInputVisible: false,
    currentProjectData: null,
    comments: null,
    tasks: null,
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
            return {...state, taskInput: ''}
        case "ADD_COMMENT":
            return {...state, commentInput: ''}
        case "ENTER_STATUS":

        case "TOGGLE_NEW_COMMENT":
            return {...state, isCommentInputVisible: !state.isCommentInputVisible}
        case "TOGGLE_NEW_TASK":
            return {...state, isTaskInputVisible: !state.isTaskInputVisible}
        case "CREATE_PROJECT_LISTS":
            if (action.payload !== null) {
                return {...state, comments: action.payload.comments, tasks: action.payload.tasks}
            }
        case "CLOSE_PROJECTPAGE":
            return {...state,
                currentProjectData: null,
                comments: null,
                tasks: null,
            }
        case 'CHANGE_STATUS':
            return {...state, status: action.payload}
        
        default:
            return state;
    }
}

export default projectPageReducer