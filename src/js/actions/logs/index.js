import { TRAER_LOGS, ERROR, CARGANDO } from "./types";
export const traerLogs = () => async (dispatch, getState) => {
  const { logs } = getState().logsReducer;
  dispatch({
    type: CARGANDO
  });
  try {
   
    let request = await fetch(`${process.env.HOST}/api/logs`);

    if (request.status == 404) {
      dispatch({
        type: ERROR,
        payload: "Algo ha salido mal"
      });
      return;
    }
    if (request.status == 500) {
      dispatch({
        type: ERROR,
        payload: "Algo ha salido mal al traer los Logs"
      });
      return;
    }
    const result = await request.json();
   

    dispatch({
      type: TRAER_LOGS,
      payload: result.body
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
      payload: error
    })
  }
};
