/* eslint-disable complexity */
import {
  TRAER_ROLES,
  ERROR,
  CARGANDO,
  VALUE_ROL_NAME,
  VALUE_ROL_LEVEL,
  CARGANDO_GUARDAR,
  ERROR_GUARDAR,
  RESET_ROLES
} from "../actions/roles/types";

const INITIAL_STATE = {
  roles: [],
  cargando: false,
  cargando_guardar: false,
  error_guardar: "",
  error: "",
  valueRolName: "",
  valueRolLevel: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_ROLES:
      return { ...state, roles: action.payload, cargando: false, error: "" };

    case CARGANDO:
      return { ...state, cargando: true };

    case ERROR:
      return { ...state, error: action.payload, cargando: false };

    case CARGANDO_GUARDAR:
      return { ...state, cargando_guardar: true };

    case ERROR_GUARDAR:
      return { ...state, error_guardar: action.payload, cargando: false };

    case VALUE_ROL_NAME:
      return {
        ...state,
        valueRolName: action.payload,
        cargando_guardar: false,
        error_guardar: ""
      };

    case VALUE_ROL_LEVEL:
      return {
        ...state,
        valueRolLevel: action.payload,
        cargando_guardar: false,
        error_guardar: ""
      };
    case RESET_ROLES:
      return INITIAL_STATE; //Always return the initial state
    default:
      return state;
  }
};
