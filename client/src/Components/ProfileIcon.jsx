import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfileIcon = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleProfileRemove = () => {
    setImage(null);
    setPreviewURL(null);
  };

  const handleProfileChoose = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleProfileChange}
        className="hidden"
      />

      {previewURL ? (
        <div className="relative w-32 h-32">
          <img
            src={previewURL}
            alt="Profile Icon"
            className="w-full h-full rounded-full object-cover border-2 border-gray-200 shadow-sm"
          />
          <button
            type="button"
            onClick={handleProfileRemove}
            className="absolute -bottom-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 transition"
            title="Remove"
          >
            <LuTrash size={18} />
          </button>
        </div>
      ) : (
        <div
          className="relative w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 border-2 border-gray-200 shadow-sm cursor-pointer hover:bg-gray-200 transition"
          onClick={handleProfileChoose}
        >
          <LuUser size={40} className="text-gray-400" />
          <button
            type="button"
            className="absolute -bottom-2 -right-2 bg-violet-600 text-white p-2 rounded-full shadow hover:bg-violet-700 transition"
            onClick={(e) => {
              e.stopPropagation(); // Prevent outer div click
              handleProfileChoose();
            }}
            title="Upload"
          >
            <LuUpload size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
