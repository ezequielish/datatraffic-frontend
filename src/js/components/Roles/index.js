import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as rolesActions from "../../actions/roles";
import * as appActions from "../../actions/app";
import { Link } from "@reach/router";
import swal from "sweetalert";
import { Modal } from "../Modal";
import FormRolesAdd from "../Forms/FormRoles";

const { toggleModal } = appActions;
const { traerRoles } = rolesActions;

import {
  ManagementContainer,
  Li,
  Header,
  ButtonAdd,
  TableContent,
  Pag,
  TableHead,
  Content
} from "../Management/style";

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
const Roles = props => {
  const [rolesCount, setRolesCount] = useState(0);
  const [rolSelected, setrolSelected] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!props.rolesReducer.roles.length) {
        await props.traerRoles();
      }
      if (props.rolesReducer.roles.length) {
        setRolesCount(props.rolesReducer.roles.length);
      }
    }
    fetchData();
  }, [props.rolesReducer.roles]);

  const handleModalRol = key => {
    setrolSelected(key + 1);
    props.toggleModal();
  };
  const listar = roles => {
   
    return roles.map((r, key) => (
      <Content
        onClick={() => handleModalRol(key)}
        key={key}
        style={{ cursor: "pointer" }}
      >
        <div style={{ padding: "8px" }}>{r.id}</div>
        <div style={{ padding: "8px" }}>{r.name}</div>
        <div style={{ padding: "8px" }}>{r.level}</div>
        <div style={{ padding: "8px" }}>{r.id}</div>
      </Content>
    ));
  };
  const mostrarInfo = () => {
    const {
      rolesReducer: { roles, cargando, error }
    } = props;

    if (cargando) {
      return "Cargando...";
    }

    if (error) {
      swal("Error", `${error}`, "error");
    }
    if (roles.length) {
      return listar(roles);
    } else {
      return "Sin resultados";
    }
  };
  const NuevoRolModal = () => {
    setrolSelected(false);
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
          <h3>Roles ({rolesCount})</h3>

          {parseInt(props.appReducer.userLevel) == 99 && (
            <ButtonAdd onClick={() => NuevoRolModal()}>Nuevo</ButtonAdd>
          )}
        </Header>
        <TableContent>
          <TableHead>
            <div>ID</div>
            <div>Rol</div>
            <div>Nivel</div>
            <div>Total</div>
          </TableHead>
          {mostrarInfo()}
        </TableContent>
      </div>

      <Pag>{"<< 1 de 1 >>"}</Pag>
      {props.appReducer.modal && (
        <Modal titleHeader={"Roles"} close={props.toggleModal}>
          {rolSelected ? (
            <FormRolesAdd rolSelectedKey={rolSelected} />
          ) : (
            <FormRolesAdd />
          )}
        </Modal>
      )}
    </ManagementContainer>
  );
};

const mapStateToProps = ({ rolesReducer, appReducer }) => {
  return {
    rolesReducer,
    appReducer
  };
};

const mapDispatchToProps = {
  toggleModal,
  traerRoles
};
export default connect(mapStateToProps, mapDispatchToProps)(Roles);
