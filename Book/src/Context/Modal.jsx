import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children,message }) => {
  if (!isOpen) return null;

  return (
    <>
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <button className="close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
    
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Hata</h2>
        <p>{message}</p>
        <button onClick={onClose}>Kapat</button>
      </div>
    </div>
    </>
  );
};

export default Modal;

