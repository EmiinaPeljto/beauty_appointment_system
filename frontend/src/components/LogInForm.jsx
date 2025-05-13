import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../assets/images/logo.png";

const LogInForm = () => {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    
    try {
      await login(email, password);
      console.log("User logged in successfully");
      // Redirect to profile page after successful login
      navigate('/profile');
    } catch (err) {
      console.error("Login failed:", err.message);
      setFormError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
        <img
          alt="Your Company"
          src={Logo}
          className="mx-auto h-20 mt-6 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
          LogIn to your account
        </h2>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#FF66B2] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#FF66B2] sm:text-sm"
                />
              </div>
            </div>
            <div className="text-right">
              <a
                href="/profile"
                className="font-semibold  hover:text-[#FF66B2] block text-sm font-medium text-gray-900"
              >
                Forgot password?
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#F178B6] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FF66B2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF66B2]"
              >
                {loading ? "Loading..." : "LogIn"}
              </button>
            </div>
          </form>

          <p className="text-center font-medium text-red-700 p-4">{formError || error}</p>

          <p className=" text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-[#F178B6] hover:text-[#FF66B2]"
            >
              SignUp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
