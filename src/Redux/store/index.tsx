import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '../reducers/index';
import rootSaga from '../sagas/index';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import thunk,{ThunkMiddleware} from 'redux-thunk';

// const sagaMiddleware = createSagaMiddleware();
const customMiddleware = storeAPI => next => action => {
    console.log('Dispatching action:', action);
    const result = next(action);
    console.log('Next state:', storeAPI.getState());
    return result;
  };

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(thunk,customMiddleware),

});


export default store;
export type RootState = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


