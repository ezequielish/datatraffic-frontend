import styled, { css } from "styled-components";

export const ModalS = styled.div`
  width: 400px;
  height: 400px;
  background: white;
  border: solid 1px black;
  width: 400px;
  height: 400px;
  background: white;
  border: solid 1px black;
  display: grid;
  grid-template-rows: 20% 80%;
`;

export const ContentModal = styled.div`
  display: grid;
  grid-template-rows: 10% 90%;
  box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.4);
  background-color: white;
  ${props =>
    props.size &&
    css`
      ${`height: ${props.size.height}`}
      ${`width: ${props.size.width}`}
    `}
`;

export const HeaderModal = styled.div`
  padding: 15px;
  display: flex;
  font-size: 1.5em;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  padding: 0 25px;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  bottom: 0;
  background-color: #ffffff85;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
