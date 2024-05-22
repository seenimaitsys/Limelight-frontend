import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import rootReducer from "../reducers";
import rootSaga from "../../sagas";

const persistConfig = {
  key: "root",
  storage,
  // version: 1,
  whitelist: ["loginReducer", "getVideoReducer"],
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Apply Redux DevTools Extension and middleware to the store
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Run the root saga
sagaMiddleware.run(rootSaga);

// Create a persistor for persisting Redux store
export const persistor = persistStore(store);
