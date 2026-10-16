import React from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="text-6xl mb-4">🍕</div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome to PizzaHub</h1>
        <p className="text-sm text-gray-500 mb-8">
          Sign in with your Google account to start ordering piping hot wood-fired pizzas.
        </p>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
