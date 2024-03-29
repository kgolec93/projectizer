const newProjectState = {
    projectName: '',
    projectLeader: '',
    deadline: '',
    isNewProjectShown: false,
    inputForm: false
}

export const newProjectReducer = (state=newProjectState, action) => {
    switch (action.type) {
        case 'ENTER_PROJECTNAME':
            return {...state, projectName: action.payload}
        case 'ENTER_PROJECTLEADER':
            return {...state, projectLeader: action.payload}
        case 'ENTER_DATE':
            return {...state, deadline: action.payload}
        case 'ADD_PROJECT':
            return {...state, projectName: '', projectLeader: '', deadline: ''}
        case 'SELECT_DEADLINE':
            return {...state, deadline: action.payload}
        case 'TOGGLE_NEWPROJECT':
            return {...state, inputForm: !state.inputForm}
        default:
            return state;
    }
}