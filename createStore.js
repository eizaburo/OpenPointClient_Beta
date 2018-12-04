import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import qrReducer from './reducers/qrReducer';
import valueReducer from './reducers/valueReducer';

//redux persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default createStore = () => {

    //reducerまとめ
    const rootReducer = combineReducers({
        userData: userReducer,
        qrData: qrReducer,
        valueData: valueReducer,
    });

    //persist confit
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['userData'],
    }

    //persisted reducer
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    //create store
    const store = reduxCreateStore(
        persistedReducer,
        applyMiddleware(

        )
    );

    //storeとpersistorを返す
    let persistor = persistStore(store);
    return { store, persistor };

}