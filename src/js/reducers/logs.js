/* eslint-disable complexity */
import { TRAER_LOGS, ERROR, CARGANDO } from "../actions/logs/types"

const INITIAL_STATE = {
  logs: [],
  cargando: false,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_LOGS:
      return { ...state, logs: action.payload, cargando: false, error: "" };

    case CARGANDO:
      return { ...state, cargando: true };

    case ERROR:
      return { ...state, error: action.payload, cargando: false };

    default:
      return state;
  }
};
