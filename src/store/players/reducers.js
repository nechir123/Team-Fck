import { types } from "../players/actions";

const initialState = {
  players: {}
};

export default function playersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.PLAYERS.REQUEST:
      return {
        ...state
      };
    case types.PLAYERS.SUCCESS:
      return {
        ...state,
        players: action.players
      };
    case types.PLAYERS.FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}
