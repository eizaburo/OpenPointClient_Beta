const initialState = {
    value: {
        send_value: 0
    },
}

export default valueReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_VALUE':
            return Object.assign({}, state, {
                value: {
                    send_value: action.value.toString()
                }
            });
        default:
            return state;
    }
}