// context/AuthContext.tsx

"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context with an undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The provider component that wraps your app and makes auth object available to any child component that calls useAuth.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Use state to hold the login status (false means not logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to log the user in
  const login = () => {
    setIsLoggedIn(true);
  };

  // Function to log the user out
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook that enables other components to easily access the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};