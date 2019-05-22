const taskListState = {
    taskInput: '',
    tasks: null
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
        default:
            return state;
    }

}

export default taskReducer