import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import * as logsActions from "../../actions/logs";
import {
  SummaryContainer,
  SummaryActions,
  HeadActions,
  LiSummary
} from "./style";
const Summary = props => {
  useEffect(() => {
    async function fetchData() {
      if (!props.logsReducer.logs.length) {
        await props.traerLogs();
      }
    }
    fetchData();
  }, []);

  const listLogsAcceso = logs => {
  

    return logs.map((a, key) => (
      <LiSummary key={key}>
        <span>{a["User.username"]}</span> <span>{a.datetime}</span>
      </LiSummary>
    ));
  };
  const listLogs = logs => {
 
    return logs.map((a, key) => (
      <LiSummary key={key}>
        <span>{a["User.username"]}</span> <span>{a.action}</span>
      </LiSummary>
    ));
  };

  const mostrarInfo = type => {
    const {
      logsReducer: { logs }
    } = props;
    if (props.logsReducer.cargando) {
      return "cargando";
    }
    if (props.logsReducer.error) {
      return props.logsReducer.error;
    }
    const accesos = logs.filter(l => l.action == "inicio sesion");
    const todos = logs.filter(l => l.action != "inicio sesion");
    const accesoList = accesos.slice(0, 9);
    const logsList = todos.slice(0, 9);
    if (props.logsReducer.logs.length) {
      if (type == "acceso") {
        return listLogsAcceso(accesoList);
      } else {
        return listLogs(logsList);
      }
    }else{
      return <p>Sin datos</p>
    }
  };

  return (
    <SummaryContainer>
      <SummaryActions>
        <p style={{ marginLeft: "8px" }}>Últimos accesos</p>
        <div>
          <HeadActions>
            <span>Usuario</span> <span>Fecha/Hora</span>
          </HeadActions>
          <ul style={{ padding: 0 }}>{mostrarInfo("acceso")}</ul>
        </div>
      </SummaryActions>
      <SummaryActions>
        <p style={{ marginLeft: "8px" }}>Últimos acciones</p>
        <div>
          <HeadActions>
            <span>Usuario</span> <span>Fecha/Hora</span>
          </HeadActions>
          <ul style={{ padding: 0 }}>{mostrarInfo("todos")}</ul>
        </div>
      </SummaryActions>
    </SummaryContainer>
  );
};

const mapStateToProps = ({ logsReducer }) => {
  return {
    logsReducer
  };
};
export default connect(mapStateToProps, logsActions)(Summary);
