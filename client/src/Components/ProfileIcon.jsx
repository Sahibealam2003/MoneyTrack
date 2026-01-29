//Select Profile Image
import React, { useRef, useState, useEffect, useContext } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import { UserContext } from "../Context/userContext";

const ProfileIcon = ({ image, setImage }) => {
  const { user } = useContext(UserContext);
  const inputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(user?.profileImageUrl || null);

  useEffect(() => {
    if (image) {
      setPreviewURL(URL.createObjectURL(image));
    }
  }, [image]);

  const handleChoose = () => inputRef.current.click();

  const handleRemove = () => {
    setImage(null);
    setPreviewURL(null);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />

      {previewURL ? (
        <div className="relative w-32 h-32">
          <img
            src={previewURL}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-gray-200 shadow-sm"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            className="absolute -bottom-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 transition"
            title="Remove"
          >
            <LuTrash size={18} />
          </button>
        </div>
      ) : (
        <div
          className="relative w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 border-2 border-gray-200 shadow-sm cursor-pointer hover:bg-gray-200 transition"
          onClick={handleChoose}
        >
          <LuUser size={40} className="text-gray-400" />
          <button
            type="button"
            className="absolute -bottom-2 -right-2 bg-violet-600 text-white p-2 rounded-full shadow hover:bg-violet-700 transition"
            onClick={(e) => {
              e.stopPropagation();
              handleChoose();
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
