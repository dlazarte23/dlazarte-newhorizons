import { createStore } from "redux";
import reducer from "../reducers/index";
import initialState from "../state/initialState";

const applicationStore = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default applicationStore;
