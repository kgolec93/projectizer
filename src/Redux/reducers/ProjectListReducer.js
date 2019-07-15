const projectListState = {
    filterItem: ''
}


export const projectListReducer = (state=projectListState, action) => {
    switch (action.type) {
        case 'ENTER_SEARCH_INPUT':
            return (
                {...state,
                    filterItem: action.payload
                }
            )
        default:
            return state;             
    }
}

export default projectListReducer