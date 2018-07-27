export const types = {
  PLAYERS: {
    REQUEST: "PLAYERS.REQUEST",
    SUCCESS: "PLAYERS.SUCCESS",
    FAILURE: "PLAYERS.FAILURE"
  }
};

export const getPlayers = () => ({
  type: types.PLAYERS.REQUEST
});

export const playersSuccess = players => ({
  type: types.PLAYERS.SUCCESS,
  players
});

export const playersFailure = error => ({
  type: types.PLAYERS.FAILURE,
  error
});
