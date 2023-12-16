import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import { reducer as orderReducer } from "./orderReducer/reducer";

const rootReducer = combineReducers({
  orderReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
