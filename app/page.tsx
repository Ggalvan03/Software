"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./ui/LoginForm";
import SignUp from "./ui/SignupForm";
import ForgotPasswordForm from "./ui/ForgotPass";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setShowForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword((prev) => !prev);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            {isLogin && !showForgotPassword ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <LoginForm />
              </motion.div>
            ) : isLogin && showForgotPassword ? (
              <motion.div
                key="forgot-password"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ForgotPasswordForm />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SignUp />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex  gap-2">
            <button
              onClick={toggleForm}
              className="mt-2 text-blue-500 underline"
            >
              {isLogin ? "Switch to Sign Up" : "Switch to Login"}
            </button>
            {isLogin && (
              <button
                onClick={handleForgotPassword}
                className="mt-2 text-blue-500 underline"
              >
                {!showForgotPassword ? "Forgot your password?" : "Back to Login"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}