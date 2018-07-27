import { all, fork } from "redux-saga/effects";

import loginRootSaga from "./AuthSaga";
import PlayersRootSaga from "./PlayersSaga";

export default function* rootSaga() {
  yield all([fork(loginRootSaga), fork(PlayersRootSaga)]);
}
