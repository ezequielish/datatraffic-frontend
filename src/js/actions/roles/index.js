import { 
  TRAER_ROLES, 
  ERROR, 
  CARGANDO,
  VALUE_ROL_NAME,
  VALUE_ROL_LEVEL, 
  CARGANDO_GUARDAR,
  ERROR_GUARDAR,
  RESET_ROLES
} from "./types";
import { ISLOGGUED, TOGGLE_MODAL } from "../app/types";
import { navigate } from "@reach/router";

export const handleValueRol = value => dispatch => {
  dispatch({
    type: VALUE_ROL_NAME,
    payload: value
  });
};
export const handleValueLevel = value => dispatch => {
  dispatch({
    type: VALUE_ROL_LEVEL,
    payload: value
  });
};
export const traerRoles = () => async dispatch => {
  dispatch({
    type: CARGANDO
  });
  try {
    let headers = new Headers();

    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    // fetch("https://host.com", { headers: headers });
    let request = await fetch(`${process.env.HOST}/api/roles`, {
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

    // console.log(result);

    if (request.status == 500) {
      dispatch({
        type: ERROR,
        payload: "Algo ha salido mal"
      });
      return;
    }

    dispatch({
      type: TRAER_ROLES,
      payload: result.body
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
      payload: "Algo ha salido mal"
    });
  }
};


export const limpiar = () => dispatch =>{
  dispatch({
    type: RESET_ROLES
  }) 
}


export const guardarRol = (rol, edit) => async (dispatch, getState) => {
  const { modal } = getState().appReducer;

  dispatch({
    type: CARGANDO_GUARDAR
  });
  try {
    let headers = new Headers();

    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    headers.append("Content-Type", "application/json");
    // fetch("https://host.com", { headers: headers });
    let request = await fetch(`${process.env.HOST}/api/roles`, {
      headers,
      method: edit ? "PUT" : "POST",
      body: JSON.stringify(rol)
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
      type: TRAER_ROLES,
      payload: []
    });
    dispatch({
      type: TOGGLE_MODAL,
      payload: !modal
    });
    dispatch({
      type: RESET_ROLES
    });
    const action = {
      action: edit ? "editar rol" : "crear rol"
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

export const borrarRol = rol => async dispatch => {
  
  dispatch({
    type: CARGANDO_GUARDAR
  });
  try {
    let headers = new Headers();

    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    headers.append("Content-Type", "application/json");
    // fetch("https://host.com", { headers: headers });
    let request = await fetch(`${process.env.HOST}/api/roles`, {
      headers,
      method: "DELETE",
      body: JSON.stringify(rol)
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
      action: "eliminar rol"
    }

    // fetch("https://host.com", { headers: headers });
    let r = await fetch(`${process.env.HOST}/api/logs`, {
      headers,
      method: "POST",
      body: JSON.stringify(action)
    });
    

    dispatch({
      type: TRAER_ROLES,
      payload: []
    });
    dispatch({
      type: TOGGLE_MODAL,
      payload: !modal
    });
    dispatch({
      type: RESET_ROLES
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: ERROR_GUARDAR,
      payload: "Algo ha salido mal"
    });
  }
};