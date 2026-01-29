// function to use profile update
import axiosInstance from "./axiosInstance";

export const updateProfile = async ({ name, imageFile, removeImage }) => {
  const formData = new FormData();

  if (name) formData.append("name", name);

  if (imageFile) {
    formData.append("profileImage", imageFile);
  }

  // ✅ image remove support
  if (removeImage) {
    formData.append("removeImage", "true"); // string important
  }

  try {
    const response = await axiosInstance.put(
      "/api/v1/auth/update-profile",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
