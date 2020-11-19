import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { signUpReducer } from "./signUp/reducer";
import { signUpMiddleware } from "./signUp/middlewares";

const PRYM_STORAGE_KEY = "prym_signup_form_state";
const middlewares = [signUpMiddleware];

export const rootReducer = combineReducers({
  signUp: signUpReducer,
});

const preloadedState = localStorage.getItem(PRYM_STORAGE_KEY);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const composedEnhancers = composeEnhancers(
  applyMiddleware(...middlewares)
);

export let store;

if (preloadedState) {
  store = createStore(
    rootReducer,
    JSON.parse(preloadedState),
    composedEnhancers
  );
} else {
  store = createStore(rootReducer, composedEnhancers);
}

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(PRYM_STORAGE_KEY, JSON.stringify(state));
});
