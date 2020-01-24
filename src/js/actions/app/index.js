import {
  TOGGLE_MODAL,
  ISLOGGUED,
  CARGANDO,
  ERROR,
  USER_LEVEL,
  LIMPIAR
} from "./types";
import { RESET_ROLES } from "../roles/types";
import { RESET_USERS } from "../users/types";
export const toggleModal = () => (dispatch, getState) => {
  const { modal } = getState().appReducer;
  dispatch({
    type: TOGGLE_MODAL,
    payload: !modal
  });
};

export const login = (user, pass) => async dispatch => {
  dispatch({
    type: CARGANDO
  });
  try {
    let headers = new Headers();

    headers.append("Authorization", "Basic " + btoa(user + ":" + pass));
    let request = await fetch(`${process.env.HOST}/api/login`, {
      headers,
      method: "POST"
    });

    const result = await request.json();

    if (request.status == 500) {
      dispatch({
        type: ERROR,
        payload: result.error
      });
      return;
    }

    // console.log(result);

    localStorage.setItem("token", result.body.jwtoken);
    localStorage.setItem("level", result.body.rol);
    dispatch({
      type: ISLOGGUED,
      payload: localStorage.getItem("token")
    });
    dispatch({
      type: USER_LEVEL,
      payload: localStorage.getItem("level")
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: ERROR,
      payload: "Algo ha salido mal"
    });
  }
};

export const salir = () => async dispatch => {
  try {
    let headers = new Headers();

    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    headers.append("Content-Type", "application/json");
    // fetch("https://host.com", { headers: headers });
    let request = await fetch(`${process.env.HOST}/api/login`, {
      headers,
      method: "DELETE"
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
        type: ERROR,
        payload: result.error
      });
      return;
    }

    localStorage.clear();
    dispatch({
      type: ISLOGGUED,
      payload: false
    });

    dispatch({
      type: RESET_USERS
    });

    dispatch({
      type: RESET_ROLES,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: ERROR,
      payload: "Algo ha salido mal"
    });
  }
};

export const limpiar = () => dispatch => {
  dispatch({
    type: LIMPIAR
  });
};
