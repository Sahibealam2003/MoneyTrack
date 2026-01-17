//Edit Profile Image and name
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/userContext";
import { updateProfile } from "../Utils/profileAPI";
import ProfileIcon from "./ProfileIcon";

const ProfileEditModal = ({ closeModal }) => {
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || "");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = await updateProfile({ name, imageFile });
      updateUser(updatedUser.user);
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleRemoveImage = async () => {
    setImageFile(null);
    updateUser({ ...user, profileImageUrl: null });

    try {
      await updateProfile({ name, imageFile: null });
    } catch (error) {
      console.error("Failed to remove profile image", error);
    }
  };

  return (
   
    <div
      className="absolute top-0 left-10 mt-2 z-50 w-60 bg-white rounded-xl shadow-2xl p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
      >
        &times;
      </button>

      <h3 className="text-lg font-semibold mb-4 text-center">Edit Profile</h3>

      
      <ProfileIcon image={imageFile} setImage={setImageFile} />

    
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEditModal;
