import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import {createLogger} from 'redux-logger'
import rootReducer from '../reducers/';

import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export default function configureStore(initialState: {}) {
 const logger = createLogger(
   {
    // level: 'warn'
     level: {
       nextState: false,
       action: false
     },
   //   color: {
   //     nextState: false,
   //     action: false
   //   }
   // }
  }
 )
  const enhancer = compose(
    applyMiddleware(thunk, promise, logger)
  )
  // return createStore(rootReducer, initialState, enhancer)

  const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);

var obj={
   store:store,
   persistor:persistor
}

return obj;
  //const store = createStore(rootReducer, applyMiddleware(thunk, logger))
  //return store
}


// import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// const store = createStore({
//   rootReducer,
//   {},
//   compose(
//     applyMiddleware(thunk)
//         )
//   });

// export default store;