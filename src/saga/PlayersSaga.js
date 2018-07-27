import firebase from "firebase";
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";

import {
  types,
  playersSuccess,
  playersFailure
} from "../store/players/actions";

import rsf from "../rsf";

export default function* PlayersRootSaga() {
  yield all([
    fork(syncTodosSaga),
    takeEvery(types.PLAYERS.REQUEST, getCollectionOfPlayers)
  ]);
}

function* getCollectionOfPlayers() {
  const snapshot = yield call(rsf.firestore.getCollection, "players");
  let players;
  snapshot.forEach(player => {
    players = {
      ...players,
      [player.id]: player.data()
    };
  });
  yield put(playersSuccess(players));
}

const playersTransformer = players => {
  const res = [];
  players.forEach(doc =>
    res.push({
      id: doc.id,
      ...doc.data()
    })
  );
  return res;
};
function* syncTodosSaga() {
  yield fork(rsf.firestore.syncCollection, "players", {
    successActionCreator: playersSuccess,
    transform: playersTransformer
  });
}
