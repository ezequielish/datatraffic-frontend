import React from "react";
import ReactDOM from "react-dom";
import { Overlay, ModalS, HeaderModal, ContentModal } from "./style";
import IconClose from "../../../assets/close-24px.svg";
export const Modal = ({ children, titleHeader, close, modalSize }) =>
  ReactDOM.createPortal(
    <Overlay>
      <ModalS>
        <HeaderModal>
          {titleHeader}
          <img src={IconClose} onClick={close} style={{ cursor: "pointer" }} />
        </HeaderModal>
        <div>{children}</div>
      </ModalS>
    </Overlay>,
    document.getElementById("modal")
  );
