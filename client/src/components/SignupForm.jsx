import userService from "../services/userService";
import { useState } from "react";
import { auth } from "../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import logo from "../assets/karatelogo.jpg";

const SignUpForm = ({ switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("member");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = { username, password, email, userRole };
      await userService.create(body);
      await signInWithEmailAndPassword(auth, email, password);

      setUsername("");
      setPassword("");
      setEmail("");
    } catch (err) {
      console.error(err.message);
      alert(err.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <form
        className="bg-white p-6 rounded shadow-md max-w-md"
        onSubmit={handleSubmit}
      >
        <img
          src={logo}
          alt="Website Logo"
          className="h-20 w-auto mb-5 mx-auto"
        />
        <h2 className="mb-4 text-xl font-bold text-gray-500 text-center">
          Create Account
        </h2>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Email"
        />
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Username"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Password"
          minLength="6"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="isCoach"
            checked={userRole === "coach"}
            onChange={(e) => setUserRole(e.target.checked ? "coach" : "member")}
            className="mr-2"
          />
          <label htmlFor="isCoach" className="text-gray-700">
            Sign up as a coach
          </label>
        </div>
        <button
          type="submit"
          className="w-full p-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Sign Up
        </button>
      </form>
      <div className="flex justify-between mt-4 gap-9">
        <button
          onClick={switchToLogin}
          className="text-gray-500 hover:underline"
        >
          Already have an account? Log In
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
