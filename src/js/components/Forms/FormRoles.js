import React, { useState, useEffect, Fragment } from "react";
import { AddEditForm, InputContainer, ButtonAdd, ButtonDelete } from "./style";
import { connect } from "react-redux";
import * as rolesActions from "../../actions/roles";
import swal from "sweetalert";
const FormRoles = props => {
  const [idSelected, setIdSelected] = useState(false);
  const { userLevel } = props.appReducer;
  useEffect(() => {
    return props.limpiar();
  }, []);

  useEffect(() => {
    if (props.rolSelectedKey) {
      const { roles } = props.rolesReducer;
      //le resto el valor que le agregue antes de enviarlo como props
      const rol = roles[props.rolSelectedKey - 1];
      setIdSelected(rol.id); //selecciomos el id en caso que se edite
      setTimeout(() => {
        props.handleValueLevel(rol.level);
        props.handleValueRol(rol.name);
      }, 200);
    }
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    const { valueRolName, valueRolLevel } = props.rolesReducer;

    if (!valueRolName) {
      swal("Error", "Debe colocar un Rol", "error");
      return;
    }
    if (!valueRolLevel) {
      swal("Error", "Debe colocar un level", "error");
      return;
    }

    let rol = {
      name: valueRolName,
      level: parseInt(valueRolLevel)
    };
    let edit = false;
    if (idSelected) {
      edit = true;
      rol = {
        ...rol,
        id: idSelected
      };
    }

    props.guardarRol(rol, edit);
  };

  const handleError = () => {
    swal("Error", `${props.rolesReducer.error_guardar}`, "error");
  };
  const handleValueChange = event => {
    const target = event.target;
    const id = target.id;
    const value = target.value;

    if (id == "level") {
      props.handleValueLevel(value);
    }
    if (id == "rol") {
      props.handleValueRol(value);
    }
  };

  const handleDelete = event => {
    event.preventDefault();

    const id = {
      id: idSelected
    };
    props.borrarRol(id);
  };

  return (
    <AddEditForm>
      <div>
        <InputContainer>
          <label style={{ padding: "5px" }}>Rol</label>
          <input
            type="text"
            value={props.rolesReducer.valueRolName}
            onChange={handleValueChange}
            style={{ fontSize: "1.3em" }}
            id="rol"
            disabled={parseInt(userLevel) != 99 && true}
          />
        </InputContainer>
        <InputContainer>
          <label style={{ padding: "5px" }}>Nivel</label>
          <input
            type="number"
            id="level"
            value={props.rolesReducer.valueRolLevel}
            onChange={handleValueChange}
            style={{ fontSize: "1.3em" }}
            disabled={parseInt(userLevel) != 99 && true}
          />
        </InputContainer>
      </div>
      {parseInt(userLevel) == 99 && (
        <ButtonAdd
          disabled={props.rolesReducer.cargando_guardar ? true : false}
          onClick={handleSubmit}
        >
          {props.rolesReducer.cargando_guardar ? "cargando" : "Guardar"}
        </ButtonAdd>
      )}
      {props.rolSelectedKey && parseInt(userLevel) == 99 && (
        <ButtonDelete
          disabled={props.rolesReducer.cargando_guardar ? true : false}
            onClick={handleDelete}
        >
          {props.rolesReducer.cargando_guardar ? "cargando" : "Eliminar"}
        </ButtonDelete>
      )}
      {props.rolesReducer.error_guardar && handleError()}
    </AddEditForm>
  );
};

const mapStateToProps = ({ rolesReducer, appReducer }) => {
  return {
    rolesReducer,
    appReducer
  };
};
export default connect(mapStateToProps, rolesActions)(FormRoles);
