"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, User, Shield } from "lucide-react";

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
const [mobileNo, setMobileNo] = useState("");
const [enrollment, setEnrollment] = useState("");
  const adminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      alert("Admin login successful!");
      sessionStorage.setItem("isAdmin", "true");
      window.location.href = "/admin";
    } else {
      alert("Invalid passkey. Please try again.");
    }
  };

const userLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/loginUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, mobileNo, enrollment }),
    });

    const data = await res.json();


    if (res.ok) {
      const { name, email, mobileNo, enrollment, userId } = data.user;
      localStorage.setItem("user", JSON.stringify({ name, email, mobileNo, enrollment, userId }));
      alert("User login successful!");
      window.location.href = "/dashboard";
    } else {
      alert(data.message || "Login failed. Please try again.");
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again later.");
  }
};


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
          onSubmit={isAdmin ? adminLogin : userLogin}
          className="space-y-4"
        >
        

          {!isAdmin && (
            <>
              <div>
                  <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 block w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  MobileNo
                </label>
                <input
                  type="number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  placeholder="Enter your mobileNo"
                  className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
                <label className="block text-sm font-medium text-gray-700">
              Enrollment no
            </label>
            <input
              type="text"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              placeholder="Enter your enrollment no"
              className="mt-1 block w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            </>
          )}

          {isAdmin && (
            <div>
                <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 block w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
              <label className="block text-sm font-medium text-gray-700">
                Passkey
              </label>
              <input
                type="password"
                onChange={(e) => setPasskey(e.target.value)}
                value={passkey}
                placeholder="Enter admin passkey"
                className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          )}

          <button onClick={() => {
            if (isAdmin) {
              adminLogin;
            } else {
              userLogin;
            }
          }}
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
