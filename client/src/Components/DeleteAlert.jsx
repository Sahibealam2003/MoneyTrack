import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-auto">
      <p className="text-sm text-gray-700">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
