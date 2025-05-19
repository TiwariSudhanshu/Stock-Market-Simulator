"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, User, Shield } from "lucide-react";

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsAdmin(false)}
            className={`flex-1 py-2 rounded-l-xl font-semibold transition-colors ${
              !isAdmin
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-800 hover:bg-green-200"
            }`}
          >
            <User className="inline mr-1" size={18} /> User
          </button>
          <button
            onClick={() => setIsAdmin(true)}
            className={`flex-1 py-2 rounded-r-xl font-semibold transition-colors ${
              isAdmin
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-800 hover:bg-green-200"
            }`}
          >
            <Shield className="inline mr-1" size={18} /> Admin
          </button>
        </div>

        <motion.form
          key={isAdmin ? "admin" : "user"}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 block w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {!isAdmin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </>
          )}

          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Passkey
              </label>
              <input
                type="password"
                placeholder="Enter admin passkey"
                className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center transition duration-200"
          >
            <LogIn className="mr-2" size={20} /> Login as {isAdmin ? "Admin" : "User"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
