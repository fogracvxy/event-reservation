"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UserInfo from "./UserInfo";

export default function AuthComponent({
  initialSession,
}: {
  initialSession: any;
}) {
  const { data: session, status } = useSession();
  const [showLogin, setShowLogin] = useState(true);

  // Use client-side session if available, otherwise use server-side session
  const currentSession = session || initialSession;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {currentSession ? "Welcome" : "Login or Register"}
      </h1>

      {currentSession ? (
        <UserInfo session={currentSession} />
      ) : (
        <div>
          <div className="mb-4">
            <button
              onClick={() => setShowLogin(true)}
              className={`mr-2 ${showLogin ? "font-bold" : ""}`}
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`ml-2 ${!showLogin ? "font-bold" : ""}`}
            >
              Register
            </button>
          </div>
          {showLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      )}
    </div>
  );
}
