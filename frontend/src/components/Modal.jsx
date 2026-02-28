import { useState, useEffect } from "react";
import "./Modal.css"

function Modal({ isOpen, onClose }) {
  const [closing, setClosing] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose(); }, 200);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen && !closing) return null;

  return (
    <div
      className={`modal-overlay${closing ? " closing" : ""}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">Title</h2>
          <button className="modal-close" onClick={handleClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-divider" />

        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;