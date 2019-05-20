import firebase from'firebase'

const newProjectState = {
    projectName: '',
    projectLeader: '',
    deadline: ''
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
        default:
            return state;
    }
}