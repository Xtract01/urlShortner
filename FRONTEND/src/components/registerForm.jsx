import React, { useState } from "react";
import axios from "axios";
const RegisterForm = ({ state }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      alert(response.data.message);
      state(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-sm w-full p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
        <h2 className="text-center font-bold text-2xl mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-2 text-base rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <div className="text-red-600 mt-3 text-center">{error}</div>}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => state(true)}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
