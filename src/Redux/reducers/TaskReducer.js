const taskListState = {
    taskInput: ''
}

export const taskReducer = (state=taskListState, action) => 
{
    switch(action.type) {
        case 'TASK_INPUT':
            return {...state, taskInput: action.value}
        default:
            return state;
    }

}

export default taskReducer