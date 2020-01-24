import React, { useRef, useEffect } from "react";
import { LoginForm, InputContainer, ButtonLogin } from "./style";
import { connect } from "react-redux";
import * as appActions from "../../actions/app";
import swal from "sweetalert";
const FormLogin = props => {
  const userRef = useRef(false);
  const passRef = useRef(false);
  useEffect(() => {
    return props.limpiar();
  }, []);

  const handleSubmit = () => {
    event.preventDefault();
    const username = userRef.current.value;
    const password = passRef.current.value;

    props.login(username, password);
  };

  const handleError = () => {
    swal("Error", `${props.error}`, "error");
  };
  return (
    <LoginForm>
      <InputContainer>
        <label style={{ padding: "5px" }}>Correo / usuario</label>
        <input ref={userRef} type="text" style={{ fontSize: "1.3em" }} />
      </InputContainer>
      <InputContainer>
        <label style={{ padding: "5px" }}>Contraseña</label>
        <input ref={passRef} type="password" style={{ fontSize: "1.3em" }} />
      </InputContainer>

      <ButtonLogin onClick={handleSubmit}>
        {props.cargando ? "cargando" : "Acceder"}
      </ButtonLogin>
      {props.error && handleError()}
    </LoginForm>
  );
};

const mapStateToProps = ({ appReducer }) => appReducer;
export default connect(mapStateToProps, appActions)(FormLogin);
