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
  LIMPIAR
} from "./types";

import { ISLOGGUED, TOGGLE_MODAL } from "../app/types";
import { navigate } from "@reach/router";

export const handleValueUser = value => dispatch => {
  dispatch({
    type: VALUE_USER,
    payload: value
  });
};
export const handleValueRol = value => dispatch => {
  dispatch({
    type: VALUE_ROL,
    payload: value
  });
};
export const handleValueStatus = value => dispatch => {
  dispatch({
    type: VALUE_STATUS,
    payload: value
  });
};
export const handleValuePassword = value => dispatch => {
  dispatch({
    type: VALUE_PASSWORD,
    payload: value
  });
};
export const traerUsuarios = () => async dispatch => {
  dispatch({
    type: CARGANDO
  });
  try {
    let headers = new Headers();

    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    // fetch("https://host.com", { headers: headers });
    let request = await fetch(`${process.env.HOST}/api/users`, {
      headers
    });

    if (request.status == 401) {
      localStorage.clear();
      dispatch({
        type: ISLOGGUED,
        payload: false
      });
      navigate("/");
      return;
    }

    const result = await request.json();

    if (result.error) {
      dispatch({
        type: ERROR,
        payload: result.error
      });
      return;
    }

    dispatch({
      type: TRAER_USUARIOS,
      payload: result.body
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Algo ha salido mal"
    });
  }
};

export const guardarUsuario = (user, edit) => async (dispatch, getState) => {
  const { modal } = getState().appReducer;

  dispatch({
    type: CARGANDO_GUARDAR
  });
  try {
    let headers = new Headers();

    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    headers.append("Content-Type", "application/json");
    // fetch("https://host.com", { headers: headers });
    let request = await fetch(`${process.env.HOST}/api/users`, {
      headers,
      method: edit ? "PUT" : "POST",
      body: JSON.stringify(user)
    });

    if (request.status == 401) {
      localStorage.clear();
      dispatch({
        type: ISLOGGUED,
        payload: false
      });
      navigate("/");
      return;
    }

    const result = await request.json();

    if (result.error) {
      dispatch({
        type: ERROR_GUARDAR,
        payload: result.error
      });
      return;
    }

    dispatch({
      type: TRAER_USUARIOS,
      payload: []
    });
    dispatch({
      type: TOGGLE_MODAL,
      payload: !modal
    });
    dispatch({
      type: LIMPIAR
    });
    const action = {
      action: edit ? "editar usuario" : "crear usuario"
    }

    // fetch("https://host.com", { headers: headers });
    let r = await fetch(`${process.env.HOST}/api/logs`, {
      headers,
      method: "POST",
      body: JSON.stringify(action)
    });
    
  } catch (error) {
    // console.log(error);
    dispatch({
      type: ERROR_GUARDAR,
      payload: "Algo ha salido mal"
    });
  }
};

export const limpiar = () => dispatch => {
  dispatch({
    type: LIMPIAR
  });
};

export const borrarUsuario = user => async dispatch => {
  dispatch({
    type: CARGANDO_GUARDAR
  });
  try {
    let headers = new Headers();

    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    headers.append("Content-Type", "application/json");
    // fetch("https://host.com", { headers: headers });
    let request = await fetch(`${process.env.HOST}/api/users`, {
      headers,
      method: "DELETE",
      body: JSON.stringify(user)
    });

    if (request.status == 401) {
      localStorage.clear();
      dispatch({
        type: ISLOGGUED,
        payload: false
      });
      navigate("/");
      return;
    }

    const result = await request.json();

    // console.log(result);

    if (result.error) {
      dispatch({
        type: ERROR_GUARDAR,
        payload: result.error
      });
      return;
    }

    const action = {
      action: "eliminar usuario"
    }

    // fetch("https://host.com", { headers: headers });
    let r = await fetch(`${process.env.HOST}/api/logs`, {
      headers,
      method: "POST",
      body: JSON.stringify(action)
    });
    

    dispatch({
      type: TRAER_USUARIOS,
      payload: []
    });
    dispatch({
      type: TOGGLE_MODAL,
      payload: !modal
    });
    dispatch({
      type: LIMPIAR
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: ERROR_GUARDAR,
      payload: "Algo ha salido mal"
    });
  }
};
