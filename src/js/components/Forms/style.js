import styled from "styled-components";

export const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 25px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

export const ButtonLogin = styled.button`
  margin-top: 25px;
  align-self: flex-end;
  border-radius: 8px;
  border: none;
  font-size: 1em;
  padding: 5px;
  border: grey 1px solid;
  width: 100px;
  cursor: pointer;
`;
export const AddEditForm = styled.form`
  display: grid;
  grid-template-columns: 70% 30%;
`;
export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;
export const ButtonAdd = styled.button`
  height: 30px;
  margin: 35px 8px;
  border-radius: 8px;
  border: grey 1px solid;
  grid-column: 2 / 2;
  grid-row: 1 / 1;
`;
export const ButtonDelete = styled.button`
  grid-column: 2 / 2;
  grid-row: 1 / 1;
  margin-top: 85px;
  height: 30px;
  margin: 80px 8px;
  border-radius: 8px;
  border: grey 1px solid;
`;
