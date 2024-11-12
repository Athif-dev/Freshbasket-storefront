"use client";
import { login, SignUp } from "@/app/lib/action";
import React, { useState } from "react";
import { setUser } from "@/app/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

function Signin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [signUp, setSignUp] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.user.isAuthenticated);

  const router = useRouter();

  const toggleClick = () => {
    if (signUp === false) {
      setSignUp(true);
    } else if (signUp === true) {
      setSignUp(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const signUpData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await SignUp(signUpData);
      dispatch(
        setUser({
          id: response.user.id,
          firstName: response.user.first_name,
          lastName: response.user.last_name,
          email: response.user.email,
        })
      );
      router.push("/profile");
    } catch (error) {
      console.error("Error during sign-up");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await login(loginData);

      // Dispatch user data to Redux store
      dispatch(
        setUser({
          id: response.user.id,
          firstName: response.user.first_name,
          lastName: response.user.last_name,
          email: response.user.email,
        })
      );
    } catch (error) {
      console.error(error);
      setError("Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="font-poppins shadow-lg">
        <div className="flex items-center justify-center">
          {signUp ? (
            <form
              onSubmit={handleLogin}
              className={
                "bg-custom-black p-8 rounded shadow-md w-[400px] h-max font-poppins"
              }
            >
              <h1 className="text-2xl mb-6 text-white">Login</h1>
              {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
              <div className="mb-4">
                <label htmlFor="email" className="block text-white">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-white">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-main-green text-white py-2 rounded"
              >
                {loading ? (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-center font-poppins mt-3 text-sm text-white">
                Dont have an account?{" "}
                <span
                  className="text-main-green underline cursor-pointer "
                  onClick={toggleClick}
                >
                  Signup
                </span>
              </p>

              <p className="text-center font-poppins mt-3 text-xs font-light text-gray-400">
                By continuing, I accept TCP -{" "}
                <span className="underline underline-offset-2 cursor-pointer">
                  Freshbasket’s Terms and Conditions{" "}
                </span>
                {"   "}&{"   "}
                <span className="underline underline-offset-2 cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </form>
          ) : (
            <form
              onSubmit={handleSignUp}
              className="bg-custom-black p-8 rounded shadow-md w-[400px] h-max font-poppins "
            >
              <h1 className="text-2xl mb-6 text-white">Signup</h1>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex gap-3">
                <div className="mb-4">
                  <label htmlFor="first name" className="block text-white">
                    First Name
                  </label>
                  <input
                    id="fname"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="last name" className="block text-white">
                    Last Name
                  </label>
                  <input
                    id="lname"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-white">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-main-green text-white py-2 rounded"
                onClick={handleSignUp}
              >
                Signup
              </button>
              <p className="text-center font-poppins mt-3 text-sm text-white">
                Already have an account? {""}
                <span
                  className="text-main-green underline cursor-pointer"
                  onClick={toggleClick}
                >
                  Login
                </span>
              </p>
              <p className="text-center font-poppins mt-3 text-xs font-light text-gray-400">
                By continuing, I accept TCP -{" "}
                <span className="underline underline-offset-2 cursor-pointer">
                  Freshbasket’s Terms and Conditions{" "}
                </span>
                {"   "}&{"   "}
                <span className="underline underline-offset-2 cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signin;
