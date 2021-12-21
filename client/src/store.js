import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import reduxLogger from "./middleware/reduxLogger";

const initialState = {};
const middleware = [thunk, reduxLogger];

let store;
try {
  store = createStore(
    rootReducer,
    // initialState,
    compose(applyMiddleware(...middleware))
  );
} catch (error) {
  store = createStore(
    rootReducer,
    // initialState,
    compose(applyMiddleware(...middleware))
  );
}
export default store;
