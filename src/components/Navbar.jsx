import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center h-16 p-8  bg-navbar-color/30 shadow-lg">
      <motion.div
        className="logo font-sacramento text-3xl pt-3"
        whileHover={{ scale: 1.05 }}
      >
        <Link to="/">shhroom</Link>
      </motion.div>
      <motion.div className="sign-in" whileHover={{ scale: 1.2 }}>
        <Link to="/signin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}
