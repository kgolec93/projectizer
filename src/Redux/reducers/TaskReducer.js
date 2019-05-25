const taskListState = {
    taskInput: '',
    tasks: null,
    deadline: ''
}

export const taskReducer = (state=taskListState, action) => 
{
    switch(action.type) {
        case 'TASK_INPUT':
            return {...state, taskInput: action.value}
        case 'CREATE_TASK_LIST':
            return {
                ...state,
                tasks: action.payload.tasks
            }
        case 'SELECT_TASK_DEADLINE':
                return {...state, deadline: action.payload}
        default:
            return state;
    }

}

export default taskReducer