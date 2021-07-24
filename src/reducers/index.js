import { combineReducers } from "redux";

import applicationReducer from "./applicationReducer";
import characterReducer from "./characterReducer";

export default combineReducers({
  applicationReducer,
  characterReducer,
});
