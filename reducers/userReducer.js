const initialState = {
    user: {
        id: 0,
        name: 'initial',
        email: 'initial@test.com'
    }
}

export default userReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'UPDATE_USER_DATA':
            return Object.assign({}, state, {
                user:{
                    id: action.id.toString(),
                    name: action.name,
                    email: action.email
                }
            })
        default:
            return state;
    }

}