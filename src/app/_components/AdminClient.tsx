"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Session } from "next-auth";
interface AdminClientProps {
  session: Session | null;
}
const AdminClient: React.FC<AdminClientProps> = ({ session }) => {
  const router = useRouter();

  const handleHomeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <div>You don't have admin permissions to view this page</div>
        <button
          className="bg-green-600 w-20 rounded-lg h-10 mt-10 hover:bg-green-700"
          onClick={handleHomeClick}
        >
          Home
        </button>
      </div>
    </div>
  );
};
export default AdminClient;
