import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as usersActions from "../../actions/users";
import * as appActions from "../../actions/app";
import { Link } from "@reach/router";
import swal from "sweetalert";
import { Modal } from "../Modal";
import FormUserAdd from "../Forms/FormUserAdd";

const { toggleModal } = appActions;
const { traerUsuarios } = usersActions;

import {
  ManagementContainer,
  Li,
  Header,
  ButtonAdd,
  TableContent,
  Pag,
  TableHead,
  Content
} from "./style";

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          color: "black",
          textDecoration: "none",
          borderBottom: isCurrent ? "solid 1px black" : ""
        }
      };
    }}
  />
);
const Management = props => {
  const [userCount, setUserCount] = useState(0);
  const [userSelected, setUserSelected] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!props.usersReducer.usuarios.length) {
        await props.traerUsuarios();
      }
      if (props.usersReducer.usuarios.length) {
        setUserCount(props.usersReducer.usuarios.length);
      }
    }
    fetchData();
  }, [props.usersReducer.usuarios]);

  const handleModalUser = key => {
    setUserSelected(key + 1);
    props.toggleModal();
  };
  const listar = usuarios => {
    return usuarios.map((u, key) => (
      <Content
        onClick={() => handleModalUser(key)}
        key={key}
        style={{ cursor: "pointer" }}
      >
        <div style={{ padding: "8px" }}>{u.id}</div>
        <div style={{ padding: "8px" }}>{u.username}</div>
        <div style={{ padding: "8px" }}>{u["Role.name"]}</div>
        <div style={{ padding: "8px" }}>{u.status ? "activo" : "inactivo"}</div>
      </Content>
    ));
  };
  const mostrarInfo = () => {
    const {
      usersReducer: { usuarios, cargando, error }
    } = props;

    if (cargando) {
      return "Cargando...";
    }

    if (error) {
      swal("Error", `${error}`, "error");
    }
    if (usuarios.length) {
      return listar(usuarios);
    } else {
      return "Sin resultados";
    }
  };
  const NuevoUserModal = () => {
    setUserSelected(false);
    props.toggleModal();
  };

  return (
    <ManagementContainer>
      <ul>
        <Li>
          <NavLink to="/gestion">Usuarios</NavLink>
        </Li>

        <Li>
          <NavLink to="/roles">Roles</NavLink>
        </Li>
      </ul>

      <div>
        <Header>
          <h3>Usuarios ({userCount})</h3>

          {parseInt(props.appReducer.userLevel) == 99 && (
            <ButtonAdd onClick={() => NuevoUserModal()}>Nuevo</ButtonAdd>
          )}
        </Header>
        <TableContent>
          <TableHead>
            <div>ID</div>
            <div>Correo/Usuario</div>
            <div>Rol</div>
            <div>Estado</div>
          </TableHead>
          {mostrarInfo()}
        </TableContent>
      </div>

      <Pag>{"<< 1 de 1 >>"}</Pag>
      {props.appReducer.modal && (
        <Modal titleHeader={"Usuarios"} close={props.toggleModal}>
          {userSelected ? (
            <FormUserAdd userSelectedKey={userSelected} />
          ) : (
            <FormUserAdd />
          )}
        </Modal>
      )}
    </ManagementContainer>
  );
};

const mapStateToProps = ({ usersReducer, appReducer }) => {
  return {
    usersReducer,
    appReducer
  };
};

const mapDispatchToProps = {
  toggleModal,
  traerUsuarios
};
export default connect(mapStateToProps, mapDispatchToProps)(Management);
