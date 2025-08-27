import React, { useState } from "react";

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-sm w-full p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
        <h2 className="text-center font-bold text-2xl mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <div className="text-red-600 mt-3 text-center">{error}</div>}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => state(false)}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
