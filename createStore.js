import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';

//redux persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default createStore = () => {

    //reducerまとめ
    const rootReducer = combineReducers({
        userData: userReducer,
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