
import React from "react";
import "./Modal.scss";
import { RiCloseLine } from "react-icons/ri";

export type ModalPropsType = {
  handleClose:()=>void,
  header:string,
  body:string
}

const Modal = (props:ModalPropsType) => {
  const { handleClose,header,body } = props;

  return (
    <>
      <div className={'darkBG'} />
      <div className={'centered'}>
        <div className={'modal'}>
          <div className={'modalHeader'}>
            <h5 className={'heading'}>{header}</h5>
          </div>
          <button className={'closeBtn'} onPointerDown={handleClose}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={'modalContent'}>
            {body}
          </div>
          <div className={'modalActions'}>
            <div className={'actionsContainer'}>
              <button className={'deleteBtn'} onPointerDown={handleClose}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;