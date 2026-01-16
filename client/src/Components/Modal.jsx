import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null; // hide modal when not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal container */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        {/* Modal header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-xl"
          >
            &times;
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4 text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
