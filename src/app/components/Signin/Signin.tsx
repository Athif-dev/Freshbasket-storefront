import { login, SignUp } from "@/app/lib/action";
import React, { useState } from "react";
import Loading from "@/app/components/Loading";

function Signin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [signUp, setSignUp] = useState(true);
  const [loading, setLoading] = useState(false);

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
      console.log(response);
    } catch (error) {
      console.error("Error during sign-up");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    setLoading(true);
    try {
      const response = await login(loginData);
      console.log(response);
    } catch (error) {
      console.error("Error during sign-up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-[3.6rem] sm:mt-[8.8rem] container lg:flex justify-center h-[70vh] lg:h-[50vh] xl:h-[80vh] font-poppins">
        <div className="flex items-center justify-center">
          {loading && <Loading />}
          {signUp ? (
            <form
              onSubmit={handleLogin}
              className={`${
                loading ? `hidden` : `block`
              } bg-custom-black p-8 rounded shadow-md w-[400px] h-[380px] font-poppins`}
            >
              <h1 className="text-2xl mb-6 text-white">Login</h1>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
                Login
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
            </form>
          ) : (
            <form
              onSubmit={handleSignUp}
              className="bg-custom-black p-8 rounded shadow-md w-[400px] h-[450px] font-poppins "
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
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signin;
