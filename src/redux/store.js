import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

//middleware: redux persist config
const persistConfig = {
    key: 'root',

    //storage method
    storage: AsyncStorage,

    //save specific reducers
    whitelist: [
        'authReducer', 
        'cartReducer',
        'loggedInUserReducer',
    ],

    //ignore specific reducers
    blacklist: [
        

    ],
};

//redux persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

//Redux Store
const store = createStore(persistedReducer, applyMiddleware(thunk));

//redux persist persistor
let persistor = persistStore(store);


export { 
    store,
    persistor
};