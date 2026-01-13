import React, { use, useContext, useState } from "react";
import AuthLayout from "../../Components/AuthLayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/Input.jsx";
import { validateEmail } from "../../Utils/helper.js";
import ProfileIcon from "../../Components/ProfileIcon.jsx";
import axiosInstance from "../../Utils/axiosInstance.js";
import { API_PATHS } from "../../Utils/apiPath.js";
import { UserContext } from "../../Context/userContext.jsx";
import uploadImage from "../../Utils/uploadImage.js";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOnSignUp = async (e) => {
  e.preventDefault();

  if (!name) {
    setError("Please enter your name");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email");
    return;
  }

  if (!password) {
    setError("Please enter password");
    return;
  }

  setError("");

  let profileImageUrl = "";

  try {
    if (profilePic) {
      const imgUploadRes = await uploadImage(profilePic);
      profileImageUrl = imgUploadRes.imageUrl || "";
    }

    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      name,
      email,
      password,
      profileImageUrl,
    });

    const { token, user } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/dashboard");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }
};


  return (
    <AuthLayout>
      <div className="max-w-md mx-auto w-full px-6 flex flex-col">
        {/* Header */}
        <div className="mb-4 text-center">
          <h3 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Create an Account
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Sign up to start tracking your income and expenses.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSignUp} className="space-y-1 flex flex-col">
          {/* Profile Image */}
          <div className="flex justify-center -mb-5">
            <ProfileIcon image={profilePic} setImage={setProfilePic} />
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="md:col-span-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Full Name"
                placeholder="Aman Gupta"
                type="text"
              />
            </div>

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-md text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-violet-600 text-white text-sm font-medium tracking-wide 
                       hover:bg-violet-700 transition-colors duration-200 shadow-md"
          >
            SIGN UP
          </button>

          {/* Footer */}
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 font-medium text-violet-600 hover:text-violet-700 hover:underline transition"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
