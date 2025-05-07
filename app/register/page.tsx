"use client";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="max-w-lg mx-auto rounded shadow-md border border-gray-200 px-7 py-5">
      <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="block mb-1 text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="enter your password"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="enter your confirm password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-600 cursor-pointer transition"
        >
          Register
        </button>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-700 hover:text-blue-900">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
