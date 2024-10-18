// src/app/signup/page.js
"use client";
import { useState } from "react";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase/config"

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e) => {
      e.preventDefault();
      try {
        const res = await createUserWithEmailAndPassword(email, password);
        console.log(res);
        setEmail("");
        setPassword("");
      } catch (error) {
        console.error(error)
       // setError(error.message)
    };
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSignUp} className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Sign Up
        </button>
      </form>
    </div>
  );
}
