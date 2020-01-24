import React from "react";
import { Nav, Logo, Ul, Li, Login } from "./style";
import { Link } from "@reach/router";
import { Modal } from "../Modal";
import FormLogin from "../Forms/FormsLogin";
import { connect } from "react-redux";
import * as appActions from "../../actions/app";
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
const Header = props => {
  const stylelink = {
    textDecoration: "none",
    color: "black"
  }
  return (
    <Nav>
      <Logo>LOGO</Logo>
      <Ul>
        <Li>
          <NavLink to="/">Resumen</NavLink>
        </Li>
        {props.isLoggued && (
          <Li>
            <NavLink to="/gestion">Gestión</NavLink>
          </Li>
        )}
      </Ul>

      <Login>
        {
          !props.isLoggued ? <a onClick={props.toggleModal}>Login</a> : <Link style={stylelink} onClick={props.salir} to="/" >Salir</Link>
        }
      </Login>

      {props.modal && (
        <Modal titleHeader={"Login"} close={props.toggleModal}>
          <FormLogin />
        </Modal>
      )}
    </Nav>
  );
};
const mapStateToProps = ({ appReducer }) => appReducer;
export default connect(mapStateToProps, appActions)(Header);
