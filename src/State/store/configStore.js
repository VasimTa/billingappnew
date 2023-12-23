import { createStore, combineReducers } from "redux";
import { BillDataReducer } from "../reducer/BillDataReducer";

export const configStore = () => {
  const store = createStore(
    combineReducers({ BillDataReducer }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};