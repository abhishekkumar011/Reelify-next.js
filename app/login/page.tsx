"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "../components/Notification";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      showNotification(response.error, "error");
    } else {
      showNotification("Login Successful", "success");
      router.push("/");
    }
  };

  return (
    <div className="max-w-lg mx-auto rounded shadow-md border border-gray-200 px-7 py-5">
      <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-600 cursor-pointer transition"
        >
          Login
        </button>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/register" className="text-blue-700 hover:text-blue-900">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
