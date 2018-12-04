const initialState = {
    qr: {
        data: '',
    },
}

export default qrReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_QR_DATA':
            return Object.assign({}, state, {
                qr: {
                    data: action.data,
                }
            });
        default:
            return state;
    }
}
