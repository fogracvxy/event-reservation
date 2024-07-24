"use client";

import React from "react";
import { useRouter } from "next/navigation";

const UnauthorizedClient: React.FC = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <div>You need to be logged in to see this page!</div>
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

export default UnauthorizedClient;
