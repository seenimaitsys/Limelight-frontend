import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // Use session storage for persistence
import rootReducer from "../reducers"; // Adjust path as necessary
import rootSaga from "../../sagas"; // Adjust path as necessary

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "loginReducer",
    "getVideoReducer",
    "getVideoListReducer",
    "getReviewersStatusReducer",
    "forgetPasswordReducer",
    "validJWTReducer",
  ],
  // whitelist: ["loginReducer", "getVideoReducer"],
};

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Redux DevTools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with middleware and Redux DevTools support
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Persist store
const persistor = persistStore(store);

// Run saga middleware
sagaMiddleware.run(rootSaga);

export { store, persistor };
