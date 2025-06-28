import React from "react";

const ModalButton = ({ onClick, primary, children }) => (
  <button
    style={{
      backgroundColor: primary ? "blue" : "gray",
      color: "white",
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    {children}
  </button>
);

const Modal = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>
        <div>
          <ModalButton onClick={onCancel}>Cancel</ModalButton>
          <ModalButton primary onClick={onConfirm}>
            Logout
          </ModalButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
