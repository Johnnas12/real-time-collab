"use client";
import { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config';
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; // Icon for the Google button

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [signInWithEmailAndPassword, loading] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        console.log(res);
        sessionStorage.setItem('user', true);
        setError(null);
        setEmail("");
        setPassword("");
        router.push("/dashboard");
      } else {
        throw new Error("Failed to sign in");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An unexpected error occurred");
    }
  };

  // Redirect after signing in with Google
  useEffect(() => {
    if (googleUser) {
      sessionStorage.setItem('user', true);
      router.push("/dashboard");
    }
  }, [googleUser, router]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div>
        {/* Sign in with Google button */}
        <div className="bg-white p-8 rounded-md shadow-md w-96 mb-6">
          <button
            onClick={() => signInWithGoogle()}
            className="flex justify-center items-center bg-white text-gray-700 border border-gray-300 p-3 w-full rounded-md shadow hover:bg-gray-50"
          >
            <FcGoogle className="mr-2 text-2xl" /> {/* Google icon */}
            {googleLoading ? "Signing in with Google..." : "Sign in with Google"}
          </button>
          {googleError && (
            <p className="text-red-500 mt-4">Error signing in with Google: {googleError.message}</p>
          )}
        </div>

        {/* Sign-up form */}
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-md shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Log In</h1>
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
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
