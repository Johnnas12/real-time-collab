"use client";
import { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";  // Icon for the Google button

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage(null);
    const res = await createUserWithEmailAndPassword(email, password);
    if (res) {
      setMessage("User successfully registered!");
      setMessageType("success");
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
    } else if (error) {
      handleFirebaseErrors(error);
    }
  };

  const handleFirebaseErrors = (error) => {
    if (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setMessage("This email is already registered.");
          setMessageType("error");
          break;
        case "auth/invalid-email":
          setMessage("The email address is invalid.");
          setMessageType("error");
          break;
        case "auth/weak-password":
          setMessage("Password should be at least 6 characters.");
          setMessageType("error");
          break;
        default:
          setMessage("Something went wrong. Please try again.");
          setMessageType("error");
      }
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
              <form onSubmit={handleSignUp} className="bg-white p-8 rounded-md shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                {message && (
                  <p className={`${messageType === "error" ? "text-red-500" : "text-green-500"} mb-4`}>
                    {message}
                  </p>
                )}
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
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
            </div>
          </div>

  );
}
