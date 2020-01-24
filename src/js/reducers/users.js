/* eslint-disable complexity */
import {
  TRAER_USUARIOS,
  ERROR,
  CARGANDO,
  VALUE_USER,
  VALUE_ROL,
  VALUE_STATUS,
  VALUE_PASSWORD,
  CARGANDO_GUARDAR,
  ERROR_GUARDAR,
  RESET_USERS,
  LIMPIAR
} from "../actions/users/types";

const INITIAL_STATE = {
  usuarios: [],
  cargando: false,
  error: "",
  cargando_guardar: false,
  error_guardar: "",
  valueUser: "",
  valueRol: "",
  valueStatus: false,
  valuePassword: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_USUARIOS:
      return { ...state, usuarios: action.payload, cargando: false, error: "" };

    case CARGANDO:
      return { ...state, cargando: true, error: "" };

    case ERROR:
      return { ...state, error: action.payload, cargando: false };

    case VALUE_USER:
      return {
        ...state,
        valueUser: action.payload,
        cargando: false,
        error: ""
      };

    case VALUE_ROL:
      return { ...state, valueRol: action.payload, cargando: false, error: "" };

    case VALUE_STATUS:
      return {
        ...state,
        valueStatus: action.payload,
        cargando: false,
        error: ""
      };

    case VALUE_PASSWORD:
      return {
        ...state,
        valuePassword: action.payload,
        cargando: false,
        error: ""
      };

    case CARGANDO_GUARDAR:
      return { ...state, cargando_guardar: true, error_guardar: "" };

    case ERROR_GUARDAR:
      return {
        ...state,
        error_guardar: action.payload,
        cargando_guardar: false
      };

    case RESET_USERS:
      return INITIAL_STATE; //Always return the initial state

    case LIMPIAR:
      return {
        ...state,
        valueUser: "",
        valueRol: "",
        valueStatus: false,
        valuePassword: "",
        cargando_guardar: false,
        error_guardar: ""
      };
    default:
      return state;
  }
};
