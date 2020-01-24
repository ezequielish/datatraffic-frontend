import React, { useEffect, useState } from "react";
import {
  AddEditForm,
  InputContainer,
  ButtonAdd,
  SelectContainer,
  ButtonDelete
} from "./style";
import { connect } from "react-redux";
import swal from "sweetalert";

import * as usersActions from "../../actions/users";
import * as rolesActions from "../../actions/roles";
const { traerRoles } = rolesActions;
const {
  handleValueUser,
  handleValueRol,
  handleValueStatus,
  handleValuePassword,
  guardarUsuario,
  limpiar,
  borrarUsuario
} = usersActions;

const FormUserAdd = props => {
  const [idSelected, setIdSelected] = useState(false);
  const { userLevel } = props.appReducer;
  useEffect(() => {
    
    if (props.userSelectedKey) {
      const { usuarios } = props.usersReducer;
      //le resto el valor que le agregue antes de enviarlo como props
      const user = usuarios[props.userSelectedKey - 1];
      setIdSelected(user.id);//selecciomos el id en caso que se edite
      setTimeout(() => {
        props.handleValueUser(user.username);
        props.handleValuePassword(user.username);
        props.handleValueRol(user.RoleId);
        props.handleValueStatus(user.status);
      }, 200);
    }
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (!props.rolesReducer.roles.length) {
        await props.traerRoles();
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    return props.limpiar();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const {
      valueUser,
      valueRol,
      valueStatus,
      valuePassword
    } = props.usersReducer;

    if (!valueRol) {
      swal("Error", "Debe selecciona un Rol", "error");
      return
    }
    if (!valuePassword) {
      swal("Error", "Debe colocar un password", "error");
      return
    }
    if (!valueUser) {
      swal("Error", "Debe colocar un username", "error");
      return
    }

    let user = {
      username: valueUser,
      password: valuePassword,
      rol_id: parseInt(valueRol),
      status: valueStatus
    };
    let edit = false;
    if (idSelected) {
      edit = true;
      user = {
        ...user,
        id: idSelected
      };
    }

    props.guardarUsuario(user, edit);
  };

  const mostrarRoles = () => {
    const {
      rolesReducer: { roles }
    } = props;
    if (roles.length) {
      return roles.map((r, key) => (
        <option value={r.id} key={key}>
          {r.name}
        </option>
      ));
    }
  };

  const handleDelete = event => {
    event.preventDefault();

    const id = {
      id: idSelected
    };
    props.borrarUsuario(id);
  };

  const handleValueChange = event => {
    const target = event.target;
    const id = target.id;
    const value = target.value;

    if (id == "username") {
      props.handleValueUser(value);
    }
    if (id == "password") {
      props.handleValuePassword(value);
    }
    if (id == "rol") {
      props.handleValueRol(value);
    }
    if (id == "status") {
      props.handleValueStatus(target.checked);
    }
  };
  const handleError = () => {
    swal("Error", `${props.usersReducer.error_guardar}`, "error");
  };
  return (
    <AddEditForm>
      <div>
        <InputContainer>
          <label style={{ padding: "5px" }}>Correo / usuario</label>
          <input
            type="text"
            style={{ fontSize: "1.3em" }}
            id="username"
            onChange={handleValueChange}
            value={props.usersReducer.valueUser}
            disabled={parseInt(userLevel) != 99 && true}
          />
        </InputContainer>
        <InputContainer>
          <label style={{ padding: "5px" }}>Contraseña</label>
          <input
            type="password"
            style={{ fontSize: "1.3em" }}
            id="password"
            onChange={handleValueChange}
            value={props.usersReducer.valuePassword}
            disabled={parseInt(userLevel) != 99 && true}
          />
        </InputContainer>
        <SelectContainer>
          <label style={{ padding: "5px" }}>Rol</label>
          <select
            style={{ fontSize: "1.3em" }}
            id="rol"
            onChange={handleValueChange}
            value={props.usersReducer.valueRol}
            disabled={parseInt(userLevel) != 99 && true}
          >
            <option>Seleccionar</option>
            {mostrarRoles()}
          </select>
        </SelectContainer>
        <div style={{ marginTop: "25px" }}>
          <input
            id="status"
            type="checkbox"
            onChange={handleValueChange}
            value={props.usersReducer.valueStatus}
            disabled={parseInt(userLevel) != 99 && true}
            checked={props.usersReducer.valueStatus}
          />
          <label htmlFor="status">Activo</label>
        </div>
      </div>
      {parseInt(userLevel) == 99 && (
        <ButtonAdd
          disabled={props.usersReducer.cargando_guardar ? true : false}
          onClick={handleSubmit}
        >
          {props.usersReducer.cargando_guardar ? "cargando" : "Guardar"}
        </ButtonAdd>
      )}

      {props.userSelectedKey && parseInt(userLevel) == 99 && (
        <ButtonDelete
          disabled={props.usersReducer.cargando_guardar ? true : false}
          onClick={handleDelete}
        >
          {props.usersReducer.cargando_guardar ? "cargando" : "Eliminar"}
        </ButtonDelete>
      )}
      {props.usersReducer.error_guardar && handleError()}
    </AddEditForm>
  );
};
const mapStateToProps = ({ appReducer, usersReducer, rolesReducer }) => {
  return {
    appReducer,
    rolesReducer,
    usersReducer
  };
};

const mapDispatchToProps = {
  traerRoles,
  handleValueUser,
  handleValueRol,
  handleValueStatus,
  handleValuePassword,
  guardarUsuario,
  limpiar,
  borrarUsuario
};
export default connect(mapStateToProps, mapDispatchToProps)(FormUserAdd);
