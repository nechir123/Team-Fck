import { combineReducers } from "redux";
import loginReducer from "../store/auth/reducers";
import playersReducer from "../store/players/reducers";

export default combineReducers({
  login: loginReducer,
  players: playersReducer
});
