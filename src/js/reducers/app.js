/* eslint-disable complexity */
import {
  TOGGLE_MODAL,
  ISLOGGUED,
  CARGANDO,
  ERROR,
  USER_LEVEL,
  LIMPIAR
} from "../actions/app/types";

const INITIAL_STATE = {
  isLoggued: localStorage.getItem("token"),
  userLevel: localStorage.getItem("level"),
  modal: false,
  cargando: false,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ISLOGGUED:
      return { ...state, isLoggued: action.payload, modal: false };

    case USER_LEVEL:
      return { ...state, userLevel: action.payload };
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: action.payload
      };

    case CARGANDO:
      return {
        ...state,
        cargando: true,
        error: false
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        cargando: false
      };
    case LIMPIAR:
      return {
        ...state,
        error: "",
        cargando: false
      };

    default:
      return state;
  }
};
