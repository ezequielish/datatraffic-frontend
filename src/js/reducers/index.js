import { combineReducers } from "redux";
import logsReducer from "./logs";
import appReducer from "./app";
import usersReducer from "./users";
import rolesReducer from "./roles";

export default combineReducers({
  logsReducer,
  appReducer,
  usersReducer,
  rolesReducer
});
