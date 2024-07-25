"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.refresh(); // Refresh the current route
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 ">
        <label htmlFor="username" className="block mb-2 text-white">
          Korisničko ime
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded text-black "
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">
          Lozinka
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded text-black"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Prijava
      </button>
      <div className="pt-5">
        Nemate račun?{" "}
        <Link href="/register" className="text-blue-200 ">
          Registrirajte se
        </Link>
      </div>
    </form>
  );
}
