"use client";
import React, { useState, MouseEvent } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";
interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Odjava</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <p className="mb-6 text-black">
          Jeste li sigurni da se želite odjaviti?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Odustani
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Odjavi se
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  function handleMenuClick(event: MouseEvent<HTMLElement>) {
    let element = event.target as HTMLElement;

    while (element) {
      if (element.tagName === "A") {
        setIsOpen(false);
        break;
      }
      element = element.parentElement as HTMLElement;
    }
  }

  const handleSignOut = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmSignOut = () => {
    signOut();
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <nav onClick={handleMenuClick} className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">SUMMERKICK</div>

          {/* Hamburger menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/"
              className={`text-white hover:text-gray-300 ${
                pathname === "/" ? "border-b-2" : ""
              }`}
            >
              Home
            </Link>

            {session ? (
              <>
                <Link
                  href="/reservation"
                  className={`text-white hover:text-gray-300 ${
                    pathname === "/reservation" ? "border-b-2" : ""
                  }`}
                >
                  Reservation
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-red-600 hover:text-gray-300"
                >
                  <LogOut />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`text-white hover:text-gray-300 ${
                    pathname === "/login" ? "border-b-2" : ""
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`text-white hover:text-gray-300 ${
                    pathname === "/register" ? "border-b-2" : ""
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className={`block text-white hover:bg-gray-700 px-3 py-2 rounded-md ${
                  pathname === "/" ? "border-b-2" : ""
                }`}
              >
                Home
              </Link>

              {session ? (
                <>
                  <Link
                    href="/reservation"
                    className={`block text-white hover:bg-gray-700 px-3 py-2 rounded-md ${
                      pathname === "/reservation" ? "border-b-2" : ""
                    }`}
                  >
                    Reservation
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left text-red-600 hover:bg-gray-700 px-3 py-2 rounded-md flex items-center"
                  >
                    <LogOut className="mr-2" /> Odjava
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`block text-white hover:bg-gray-700 px-3 py-2 rounded-md ${
                      pathname === "/login" ? "border-b-2" : ""
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`block text-white hover:bg-gray-700 px-3 py-2 rounded-md ${
                      pathname === "/register" ? "border-b-2" : ""
                    }`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmSignOut}
      />
    </>
  );
};

export default Navbar;
