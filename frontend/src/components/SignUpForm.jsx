import React, { useState } from "react";
import useRegisterUser from "../hooks/useRegisterUser";
import Logo from "../assets/images/logo.png"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const { registerUser, error, loading } = useRegisterUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Call the registerUser function from the hook
    const response = await registerUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    );

    if (response && response.email) {
      console.log("Registration initiated successfully. Verification required.");
      // Redirect to email verification page with email as state
      navigate("/email-verification", { state: { email: response.email } });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
        <img alt="Your Company" src={Logo} className="mx-auto h-20 w-auto" />
        <h2 className="mt-6 mb-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
          {/* First Name and Last Name */}
          <div className="flex gap-6 mt-6">
            <div className="w-1/2">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#FF66B2] sm:text-sm"
                />
                {error?.first_name && (
                  <p className="text-red-500 text-sm">{error.first_name}</p>
                )}
              </div>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  autoComplete="family-name"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#FF66B2] sm:text-sm"
                />
                {error?.last_name && (
                  <p className="text-red-500 text-sm">{error.last_name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Email and Phone Number */}
          <div className="flex gap-6">
            <div className="w-1/2">
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
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#FF66B2] sm:text-sm"
                />
                {error?.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  required
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#FF66B2] sm:text-sm"
                />
                {error?.phone_number && (
                  <p className="text-red-500 text-sm">{error.phone_number}</p>
                )}
              </div>
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="flex gap-6">
            <div className="w-1/2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#FF66B2] sm:text-sm"
                />
                {error?.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}
              </div>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#FF66B2] sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#FF66B2] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FF66B2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF66B2]"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-[#FF66B2] hover:text-[#FF66B2]"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
