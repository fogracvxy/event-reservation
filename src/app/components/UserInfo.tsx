"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function UserInfo({ session }: { session: any }) {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">User Information</h2>
      <p>
        <strong>User ID:</strong> {session?.user?.id}
      </p>
      <p>
        <strong>Name:</strong> {session?.user?.username}
      </p>
      <p>
        <strong>Ime:</strong>{" "}
        {session?.user?.first_name + " " + session?.user?.last_name}
      </p>
      <p>
        <strong>Email:</strong> {session?.user?.email}
      </p>
      <button
        onClick={handleSignOut}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
      <button
        onClick={() => router.push("/admin")}
        className="ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Admin
      </button>
      <pre className="mt-4 bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
