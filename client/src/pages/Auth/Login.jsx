//Login Page
import React, { useContext, useState } from "react";
import AuthLayout from "../../Components/AuthLayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/Input.jsx";
import { validateEmail } from "../../Utils/helper.js";
import axiosInstance from "../../Utils/axiosInstance.js";
import { API_PATHS } from "../../Utils/apiPath.js";
import { UserContext } from "../../Context/userContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("All fields are required");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    async function loginUser() {
     
      try {
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
          email,
          password,
        });

        const { token, user } = response.data;

        if (token) {
          localStorage.setItem("token", token);
          updateUser(user)
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    }

    loginUser();
  };

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto w-full px-6 py-2 flex flex-col justify-center">
      
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Welcome Back
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your details to continue
          </p>
        </div>

       
        <form onSubmit={handleSubmit} className="space-y-6">
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

         
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-md text-center">
              {error}
            </p>
          )}

     
          <button
            type="submit"
            className="w-full cursor-pointer py-3 rounded-lg bg-violet-600 text-white text-sm font-medium tracking-wide
                       hover:bg-violet-700 transition-colors duration-200 shadow-md"
          >
            LOGIN
          </button>

          
          <p className="text-sm text-gray-600 text-center">
            Don&apos;t have an account?
            <Link
              to="/signUp"
              className="ml-1 font-medium text-violet-600 hover:text-violet-700 hover:underline transition"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
