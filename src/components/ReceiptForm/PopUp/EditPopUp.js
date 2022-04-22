import React from "react";
import EditForm from "./EditForm";
import "./EditPopUp.css"

const Popup = ({ handleClose, contentHandler, editProductHandler }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        <EditForm editProduct={editProductHandler} content={contentHandler} />
      </div>
    </div>
  );
};

export default Popup;