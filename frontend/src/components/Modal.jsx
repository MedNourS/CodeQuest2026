import { useState, useEffect } from "react";
import "./Modal.css"
import RecipeSection from "./RecipeSection";

function Modal({ isOpen, onClose, selectedIngredients }) {
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
        <RecipeSection selectedIngredients={selectedIngredients}/>
      </div>
    </div>
  );
}

export default Modal;