import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';

export default createStore = () => {

    //reducerまとめ
    const rootReducer = combineReducers({
        userData: userReducer,
    });

    //create store
    const store = reduxCreateStore(
        rootReducer,
        applyMiddleware(

        )
    );

    //次のステップに備えこのように返す
    return { store };

}