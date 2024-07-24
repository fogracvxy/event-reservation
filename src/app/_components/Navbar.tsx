"use client";
import React, { useState, MouseEvent } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  return (
    <nav onClick={handleMenuClick} className="bg-gray-800  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Reservation</div>

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
              <Link
                href="/profile"
                className={`text-white hover:text-gray-300 ${
                  pathname === "/profile" ? "border-b-2" : ""
                }`}
              >
                Profile
              </Link>
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
              className={` block text-white hover:bg-gray-700 px-3 py-2 rounded-md ${
                pathname === "/" ? "border-b-2" : ""
              }`}
            >
              Home
            </Link>

            {session ? (
              <>
                {" "}
                <Link
                  href="/reservation"
                  className={` block text-white hover:bg-gray-700 px-3 py-2 rounded-md ${
                    pathname === "/reservation" ? "border-b-2" : ""
                  }`}
                >
                  Reservation
                </Link>
                <Link
                  href="/profile"
                  className={` block text-white hover:bg-gray-700 px-3 py-2 rounded-md ${
                    pathname === "/profile" ? "border-b-2" : ""
                  }`}
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={` block text-white hover:bg-gray-700 px-3 py-2 rounded-md ${
                    pathname === "/login" ? "border-b-2" : ""
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={` block text-white hover:bg-gray-700 px-3 py-2 rounded-md ${
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
  );
};

export default Navbar;
